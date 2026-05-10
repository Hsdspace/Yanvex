export const siteConfig = {
  siteName: 'Yanvex',
  legalName: 'Yanvex AI Agency',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://yanvex.ai',
  titleTemplate: '%s | Yanvex',
  defaultTitle: 'Yanvex - Premium AI Agency for Intelligent Digital Systems',
  defaultDescription:
    'Yanvex designs cinematic AI experiences, machine learning systems, and intelligent automation platforms for ambitious brands.',
  defaultKeywords: [
    'AI agency',
    'artificial intelligence consulting',
    'machine learning development',
    'AI automation',
    'premium AI startup',
    'intelligent product design',
    'AI SaaS agency',
  ],
  author: 'Yanvex',
  language: 'en',
  locale: 'en_US',
  twitterHandle: '@yanvexai',
  themeColor: '#050505',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'hello@yanvex.ai',
  phone: import.meta.env.VITE_PHONE || '+1-234-567-890',
  socialLinks: [
    'https://twitter.com/yanvexai',
    'https://linkedin.com/company/yanvex',
    'https://github.com/yanvex',
  ],
};

export const normalizeUrl = (path = '/') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.siteUrl}${cleanPath === '/' ? '' : cleanPath}`;
};

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.legalName,
  url: siteConfig.siteUrl,
  email: siteConfig.contactEmail,
  telephone: siteConfig.phone,
  logo: normalizeUrl('/logo-mark.svg'),
  sameAs: siteConfig.socialLinks,
});

export const buildWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  inLanguage: siteConfig.language,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.siteUrl}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const buildBreadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: normalizeUrl(item.path),
  })),
});

export const buildArticleSchema = ({
  headline,
  description,
  path,
  image = normalizeUrl('/og-cover.svg'),
  publishedTime,
  modifiedTime,
  author = siteConfig.author,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  image,
  author: {
    '@type': 'Person',
    name: author,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.legalName,
    logo: {
      '@type': 'ImageObject',
      url: normalizeUrl('/logo-mark.svg'),
    },
  },
  mainEntityOfPage: normalizeUrl(path),
  datePublished: publishedTime,
  dateModified: modifiedTime || publishedTime,
});

export const calculateReadingTime = (content = '') => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
};

export const slugify = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
