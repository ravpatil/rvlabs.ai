import fs from 'fs';
import path from 'path';
import os from 'os';
import jwt from 'jsonwebtoken';

const CONTENT_PATH = path.join(process.cwd(), 'app', 'data', 'content.json');

function verifyAdmin(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/rvlabs_admin=([^;]+)/);
    const token = match ? match[1] : null;
    if (!token) return false;
    const secret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || 'devsecret';
    const decoded = jwt.verify(token, secret);
    return !!decoded;
  } catch (err) {
    return false;
  }
}

async function saveToGitHub(contentStr: string) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const pathOnRepo = 'app/data/content.json';

  if (!owner || !repo || !token) {
    throw new Error('GitHub credentials missing');
  }

  const apiBase = 'https://api.github.com';
  const getUrl = `${apiBase}/repos/${owner}/${repo}/contents/${encodeURIComponent(pathOnRepo)}`;

  const getRes = await fetch(getUrl, { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' } });
  const getData = await getRes.json();
  const sha = getData.sha;

  const putRes = await fetch(getUrl, {
    method: 'PUT',
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Update content via admin', content: Buffer.from(contentStr).toString('base64'), sha }),
  });

  if (!putRes.ok) {
    const text = await putRes.text();
    throw new Error(`GitHub update failed: ${text}`);
  }

  return true;
}

export async function GET() {
  try {
    const raw = fs.readFileSync(CONTENT_PATH, 'utf8');
    return new Response(raw, { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('Failed to read content.json', err);
    return new Response(JSON.stringify({ error: 'Failed to read content' }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!verifyAdmin(req)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const body = await req.json();
    const content = body.content;
    if (!content) return new Response(JSON.stringify({ error: 'Missing content' }), { status: 400 });

    const contentStr = typeof content === 'string' ? content : JSON.stringify(content, null, 2);

    // If GitHub credentials provided, commit to repo, else write to local file (dev)
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
      await saveToGitHub(contentStr);
      return new Response(JSON.stringify({ ok: true, saved: 'github' }), { status: 200 });
    }

    // Local write: write to app/data/content.json
    try {
      fs.writeFileSync(CONTENT_PATH, contentStr, 'utf8');
      return new Response(JSON.stringify({ ok: true, saved: 'local', path: CONTENT_PATH }), { status: 200 });
    } catch (fsErr: any) {
      // fallback to tmp dir
      const tmpPath = path.join(os.tmpdir(), 'rvlabs-content.json');
      fs.writeFileSync(tmpPath, contentStr, 'utf8');
      return new Response(JSON.stringify({ ok: true, saved: 'tmp', path: tmpPath }), { status: 200 });
    }
  } catch (err: any) {
    console.error('Admin content save error', err);
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), { status: 500 });
  }
}
