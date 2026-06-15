import fs from 'fs';
import path from 'path';

function loadContent() {
  try {
    const p = path.join(process.cwd(), 'app', 'data', 'content.json');
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return {};
  }
}

const content = loadContent();

export const brandTagline = content.brandTagline ?? '';
export const navLinks = content.navLinks ?? [];
export const hero = content.hero ?? {};
export const services = content.services ?? [];
export const whyItems = content.whyItems ?? [];
export const industries = content.industries ?? [];
export const caseStudies = content.caseStudies ?? [];
export const testimonials = content.testimonials ?? [];
export const certifications = content.certifications ?? [];
export const howWeWork = content.howWeWork ?? [];
export const labTeam = content.labTeam ?? [];
export const blogPosts = content.blogPosts ?? [];
export const trainings = content.trainings ?? [];
export const community = content.community ?? [];
export const contactInfo = content.contactInfo ?? {};
export const newsletter = content.newsletter ?? {};

export function getTraining(slug: string) {
  return trainings.find((t: { slug: string }) => t.slug === slug);
}
