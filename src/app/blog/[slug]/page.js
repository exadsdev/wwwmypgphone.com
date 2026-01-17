'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import siteConfig from '@/config/site';
import { saveClick } from '@/components/VisitorTracker';

export default function BlogPostPage({ params }) {
    // Unwrap params Promise for Next.js 15+ compatibility
    const { slug } = use(params);

    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const savedPosts = localStorage.getItem('adminPosts');
            if (savedPosts) {
                const allPosts = JSON.parse(savedPosts);
                const foundPost = allPosts.find(p => p.slug === slug && p.published);

                if (foundPost) {
                    setPost(foundPost);

                    // Get related posts (same category or just other posts)
                    const related = allPosts
                        .filter(p => p.slug !== slug && p.published)
                        .slice(0, 3);
                    setRelatedPosts(related);
                }
            }
        } catch (e) {
            console.error('Error loading post:', e);
        }
        setLoading(false);
    }, [slug]);

    if (loading) {
        return (
            <div className="section" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                <p>กำลังโหลดบทความ...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="section" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
                <h1>ไม่พบบทความ</h1>
                <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
                    บทความที่คุณกำลังมองหาไม่มีอยู่หรือถูกลบไปแล้ว
                </p>
                <Link href="/blog" className="btn btn-primary">
                    ← กลับไปหน้าบทความ
                </Link>
            </div>
        );
    }

    // Schema.org JSON-LD for SEO
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription || post.excerpt,
        image: post.featuredImage ? (post.featuredImage.startsWith('http') ? post.featuredImage : `${siteConfig.baseUrl}${post.featuredImage}`) : `${siteConfig.baseUrl}${siteConfig.images.ogImage}`,
        author: {
            '@type': 'Organization',
            name: post.author || siteConfig.name,
        },
        publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.baseUrl}${siteConfig.images.logo}`,
            },
        },
        datePublished: post.createdAt,
        dateModified: post.updatedAt || post.createdAt,
        mainEntityOfPage: `${siteConfig.baseUrl}/blog/${post.slug}`,
        keywords: post.metaKeywords || (post.tags ? post.tags.join(', ') : ''),
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: siteConfig.baseUrl },
            { '@type': 'ListItem', position: 2, name: 'บทความ', item: `${siteConfig.baseUrl}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: `${siteConfig.baseUrl}/blog/${post.slug}` },
        ],
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Dynamic Meta Tags (client-side) */}
            <title>{post.title} | {siteConfig.name}</title>

            {/* Breadcrumb */}
            <nav className="container" style={{ padding: '1rem 0' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    <Link href="/">หน้าแรก</Link> {' > '}
                    <Link href="/blog">บทความ</Link> {' > '}
                    <span>{post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}</span>
                </div>
            </nav>

            {/* Article */}
            <article className="section">
                <div className="container">
                    <div className="legal-content" style={{ maxWidth: '900px' }}>
                        {/* Header */}
                        <header style={{ marginBottom: '2rem' }}>
                            {post.category && (
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    background: 'var(--primary)',
                                    color: '#fff',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    marginBottom: '1rem',
                                }}>
                                    {post.category}
                                </span>
                            )}
                            <h1 style={{ fontSize: '2rem', lineHeight: 1.4, marginBottom: '1rem' }}>
                                {post.title}
                            </h1>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
                                <span>✍️ {post.author || siteConfig.name}</span>
                                <span>📅 {new Date(post.createdAt).toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                                {post.updatedAt && post.updatedAt !== post.createdAt && (
                                    <span>🔄 อัปเดต: {new Date(post.updatedAt).toLocaleDateString('th-TH')}</span>
                                )}
                            </div>
                        </header>

                        {/* Featured Image */}
                        {post.featuredImage && (
                            <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden' }}>
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title}
                                    width={900}
                                    height={500}
                                    style={{ width: '100%', height: 'auto' }}
                                    priority
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className="article-content"
                            style={{
                                lineHeight: 1.9,
                                fontSize: '1.05rem',
                            }}
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div style={{
                                marginTop: '2rem',
                                paddingTop: '1.5rem',
                                borderTop: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <strong>🏷️ Tags:</strong>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                                    {post.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                background: 'rgba(255,255,255,0.1)',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Internal Links */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            borderLeft: '4px solid var(--primary)',
                        }}>
                            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>🔗 หน้าที่เกี่ยวข้อง</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <Link href="/" className="btn btn-outline">🏠 หน้าแรก</Link>
                                <Link href="/about" className="btn btn-outline">ℹ️ เกี่ยวกับเรา</Link>
                                <Link href="/videos" className="btn btn-outline">🎬 วิดีโอ</Link>
                                <Link href="/warranty" className="btn btn-outline">🛡️ การรับประกัน</Link>
                                <Link href="/faq" className="btn btn-outline">❓ FAQ</Link>
                                <Link href="/contact" className="btn btn-outline">📞 ติดต่อเรา</Link>
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{
                            marginTop: '2rem',
                            textAlign: 'center',
                            padding: '2rem',
                            background: 'linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)',
                            borderRadius: '12px',
                            color: '#fff',
                        }}>
                            <h3 style={{ marginTop: 0 }}>สนใจสั่งซื้อมือถือคุณภาพดี?</h3>
                            <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
                                รับประกัน 30 วัน จัดส่งฟรีทั่วประเทศ รับเงินปลายทาง
                            </p>
                            <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                                <a
                                    href={siteConfig.social.line}
                                    className="btn"
                                    style={{ background: '#fff', color: 'var(--primary)' }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => saveClick('cta-line', { from: 'blog-post', slug: post.slug })}
                                >
                                    ทัก LINE
                                </a>
                                <a
                                    href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`}
                                    className="btn"
                                    style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '2px solid rgba(255,255,255,0.5)' }}
                                    onClick={() => saveClick('cta-phone', { from: 'blog-post', slug: post.slug })}
                                >
                                    📞 โทร {siteConfig.company.phone}
                                </a>
                            </div>
                        </div>

                        {/* Back Link */}
                        <div style={{ marginTop: '2rem' }}>
                            <Link
                                href="/blog"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}
                            >
                                ← กลับไปหน้าบทความ
                            </Link>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="section section-alt">
                    <div className="container">
                        <h2 style={{ marginBottom: '1.5rem' }}>📚 บทความอื่นๆ ที่น่าสนใจ</h2>
                        <div className="gallery-grid">
                            {relatedPosts.map((relPost, index) => (
                                <Link
                                    key={relPost.id || index}
                                    href={`/blog/${relPost.slug}`}
                                    className="feature-card"
                                    style={{ padding: 0, overflow: 'hidden', textDecoration: 'none' }}
                                    onClick={() => saveClick('related-post', { slug: relPost.slug, title: relPost.title })}
                                >
                                    {relPost.featuredImage && (
                                        <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                                            <Image
                                                src={relPost.featuredImage}
                                                alt={relPost.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <div style={{ padding: '1rem' }}>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                            {relPost.title}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                                            {relPost.excerpt?.substring(0, 80)}...
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
