import siteConfig from '@/config/site';
import { videos } from '@/data/videos';

export default function sitemap() {
    const baseUrl = siteConfig.baseUrl;
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages = [
        { url: baseUrl, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/warranty`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/videos`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/refund-policy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.5 },
    ];

    // Video pages
    const videoPages = videos.map((video) => ({
        url: `${baseUrl}/video/${video.slug}`,
        lastModified: video.uploadDate,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...staticPages, ...videoPages];
}
