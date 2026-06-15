import { brandTagline, contactInfo, hero } from '../app/data/siteContent';

export default function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rvlabs.ai';

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RVAI Labs',
    url: siteUrl,
    slogan: brandTagline,
    description: hero.copy,
    email: contactInfo.email,
    sameAs: [contactInfo.linkedin].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}
