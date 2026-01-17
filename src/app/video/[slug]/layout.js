import siteConfig from '@/config/site';
import { getVideoBySlug, getVideoUrls, videos } from '@/data/videos';

export async function generateStaticParams() {
    return videos.map((video) => ({
        slug: video.slug,
    }));
}

export async function generateMetadata({ params }) {
    const video = getVideoBySlug(params.slug);

    if (!video) {
        return {
            title: 'ไม่พบวิดีโอ',
        };
    }

    const videoUrls = getVideoUrls(video, siteConfig.baseUrl);

    return {
        title: `${video.title} | ${siteConfig.name}`,
        description: video.description.slice(0, 160) + '...',
        keywords: video.keywords || video.tags?.join(', '),
        alternates: {
            canonical: `${siteConfig.baseUrl}/video/${video.slug}`,
        },
        openGraph: {
            title: video.title,
            description: video.description,
            images: [videoUrls.thumbnailUrl],
            type: 'video.other',
            videos: [videoUrls.embedUrl],
        },
        twitter: {
            card: 'player',
            title: video.title,
            description: video.description,
            images: [videoUrls.thumbnailUrl],
        },
    };
}

export default function VideoLayout({ children }) {
    return children;
}
