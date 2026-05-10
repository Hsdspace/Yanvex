import React from 'react';
import { Helmet } from 'react-helmet-async';
import StructuredData from './StructuredData.jsx';
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
  normalizeUrl,
  siteConfig,
} from '../../lib/seo.js';

const SEO = ({
  title,
  description = siteConfig.defaultDescription,
  keywords = siteConfig.defaultKeywords,
  path = '/',
  image = '/og-cover.jpg',
  canonical,
  noindex = false,
  type = 'website',
  structuredData,
  breadcrumbs,
}) => {
  const resolvedTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.defaultTitle;
  const resolvedCanonical = canonical || normalizeUrl(path);
  const resolvedImage = image.startsWith('http') ? image : normalizeUrl(image);
  const robots = noindex ? 'noindex,nofollow' : 'index,follow';
  const schemas = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    breadcrumbs?.length ? buildBreadcrumbSchema(breadcrumbs) : null,
    structuredData || null,
  ].filter(Boolean);

  return (
    <>
      <Helmet>
        <html lang={siteConfig.language} />
        <title>{resolvedTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta name="author" content={siteConfig.author} />
        <meta name="robots" content={robots} />
        <meta name="theme-color" content={siteConfig.themeColor} />
        <link rel="canonical" href={resolvedCanonical} />

        <meta property="og:type" content={type} />
        <meta property="og:site_name" content={siteConfig.siteName} />
        <meta property="og:title" content={resolvedTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={resolvedCanonical} />
        <meta property="og:image" content={resolvedImage} />
        <meta property="og:locale" content={siteConfig.locale} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
        <meta name="twitter:title" content={resolvedTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={resolvedImage} />
      </Helmet>

      {schemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
    </>
  );
};

export default SEO;
