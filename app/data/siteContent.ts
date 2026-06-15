import fs from 'fs';
import path from 'path';

function loadContent() {
  try {
    const p = path.join(process.cwd(), 'app', 'data', 'content.json');
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {
      navLinks: [
        { label: 'Services', href: '#services' },
        { label: 'Why RVAI', href: '#why' },
        { label: 'Blogs', href: '#blogs' },
        { label: 'Trainings', href: '#trainings' },
        { label: 'Community', href: '#community' },
        { label: 'Contact', href: '#contact' },
      ],
      hero: {
        badge: 'Neural intelligence. Enterprise scale.',
        title: 'Where AI meets production-ready engineering.',
        copy: 'RVAI Labs combines generative AI, cloud-native infrastructure, and LLMOps expertise to help organizations build, deploy, and scale intelligent systems.',
        primaryCta: { label: 'Start a Project', href: '#contact' },
        secondaryCta: { label: 'Explore Services', href: '#services' },
      },
      services: [],
      whyItems: [],
      blogPosts: [],
      trainings: [],
      community: [],
      contactInfo: { email: 'rvgpatil@gmail.com', linkedin: 'linkedin.com/in/rvlabs', whatsapp: '+91 8698599367' },
    };
  }
}

const content = loadContent();

export const navLinks = content.navLinks;
export const hero = content.hero;
export const services = content.services;
export const whyItems = content.whyItems;
export const blogPosts = content.blogPosts;
export const trainings = content.trainings;
export const community = content.community;
export const contactInfo = content.contactInfo;
