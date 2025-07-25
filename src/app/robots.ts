import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/edit-product/', '/add-product'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}