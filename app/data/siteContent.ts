import fs from 'fs';
import path from 'path';

function loadContent() {
  try {
    const p = path.join(process.cwd(), 'app', 'data', 'content.json');
    const raw = fs.readFileSync(p, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    // fallback to embedded defaults if content.json is missing or invalid
    const defaults = {
      navLinks: [
        { label: 'Services', href: '#services' },
        { label: 'Why RVLabs', href: '#why' },
        { label: 'Founder', href: '#about' },
        { label: 'Insights', href: '#insights' },
        { label: 'Contact', href: '#contact' },
      ],
      hero: {
        badge: 'Enterprise AI. Built for production.',
        title: 'Helping organizations adopt AI securely, efficiently, and at scale.',
        copy:
          'RVLabs combines OpenShift, AI infrastructure, and LLMOps expertise to deliver enterprise-grade generative AI strategy, training, and implementation.',
        primaryCta: { label: 'Book Consultation', href: '#contact' },
        secondaryCta: { label: 'Explore Services', href: '#services' },
      },
      services: [
        { name: 'AI Strategy & Consulting', description: 'Align AI roadmaps with security, compliance, and enterprise operational requirements.' },
        { name: 'Enterprise AI Training', description: 'Enable developer and platform teams with practical AI skills and hands-on workshops.' },
        { name: 'GenAI Workshops', description: 'Run guided sessions that surface use cases, metrics, and MVP pathways for your business.' },
        { name: 'Agentic AI Solutions', description: 'Design intelligent workflows and automation that integrate with existing enterprise systems.' },
        { name: 'OpenShift AI & Kubernetes AI', description: 'Build scalable AI platforms on OpenShift and Kubernetes with enterprise-grade tooling.' },
        { name: 'Model Serving & LLMOps', description: 'Deploy, monitor, and manage LLMs with operational stability and cost control.' },
      ],
      whyItems: ['Enterprise-first approach', 'Open-source expertise', 'AI + Cloud Native specialization', 'Real-world implementation experience'],
      founderBadges: ['OpenShift', 'AI Infrastructure', 'LLM Serving', 'Enterprise Support', 'Community Speaker'],
      blogPosts: [],
      videos: [],
      contactInfo: { email: 'rvgpatil@gmail.com', linkedin: 'linkedin.com/in/rvlabs', whatsapp: '+91 8698599367' },
    };
    return defaults;
  }
}

const content = loadContent();

export const navLinks = content.navLinks;
export const hero = content.hero;
export const services = content.services;
export const whyItems = content.whyItems;
export const founderBadges = content.founderBadges;
export const blogPosts = content.blogPosts;
export const videos = content.videos;
export const contactInfo = content.contactInfo;
