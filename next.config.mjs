/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable static export if needed
    // output: 'export',

    // Image optimization
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                pathname: '/vi/**',
            },
        ],
    },

    // Headers for security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
        ];
    },

    // Redirects if needed
    async redirects() {
        return [
            // Redirect old PHP URLs to new Next.js routes
            {
                source: '/index.php',
                destination: '/',
                permanent: true,
            },
            {
                source: '/about.php',
                destination: '/about',
                permanent: true,
            },
            {
                source: '/contact.php',
                destination: '/contact',
                permanent: true,
            },
            {
                source: '/warranty.php',
                destination: '/warranty',
                permanent: true,
            },
            {
                source: '/faq.php',
                destination: '/faq',
                permanent: true,
            },
            {
                source: '/blog.php',
                destination: '/blog',
                permanent: true,
            },
            {
                source: '/videos.php',
                destination: '/videos',
                permanent: true,
            },
            {
                source: '/video.php',
                destination: '/videos',
                permanent: true,
            },
            {
                source: '/privacy.php',
                destination: '/privacy',
                permanent: true,
            },
            {
                source: '/terms.php',
                destination: '/terms',
                permanent: true,
            },
            {
                source: '/refund-policy.php',
                destination: '/refund-policy',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
