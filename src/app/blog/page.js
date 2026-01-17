'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import siteConfig from '@/config/site';
import { saveClick } from '@/components/VisitorTracker';

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load posts from localStorage
        try {
            const savedPosts = localStorage.getItem('adminPosts');
            if (savedPosts) {
                const allPosts = JSON.parse(savedPosts);
                // Only show published posts, sorted by date (newest first)
                const publishedPosts = allPosts
                    .filter(post => post.published)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(publishedPosts);
            }
        } catch (e) {
            console.error('Error loading posts:', e);
        }
        setLoading(false);
    }, []);

    // Default article (static content when no posts)
    const defaultArticle = {
        title: 'PG Mobile คืออะไร? ทำไมถึงเป็นตัวเลือกร้านมือถือมือสองที่หลายคนไว้วางใจ',
        slug: 'pg-mobile-intro',
        excerpt: 'บทความอธิบายว่า PG Mobile คืออะไร ทำไมถึงเป็นร้านมือถือมือสองคุณภาพที่หลายคนไว้วางใจ',
        featuredImage: `${siteConfig.baseUrl}/images/Commercial-registration.jpg`,
        author: siteConfig.name,
        category: 'ทั่วไป',
        createdAt: '2026-01-10T10:00:00+07:00',
        isDefault: true,
    };

    const displayPosts = posts.length > 0 ? posts : [defaultArticle];

    // Schema for SEO
    const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `บทความ - ${siteConfig.name}`,
        description: 'บทความและข่าวสารเกี่ยวกับมือถือมือสองคุณภาพดี จากร้าน PG Mobile',
        url: `${siteConfig.baseUrl}/blog`,
        publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.baseUrl}${siteConfig.images.logo}`,
            },
        },
        blogPost: displayPosts.slice(0, 10).map(post => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: post.isDefault ? `${siteConfig.baseUrl}/blog` : `${siteConfig.baseUrl}/blog/${post.slug}`,
            datePublished: post.createdAt,
            author: {
                '@type': 'Organization',
                name: post.author || siteConfig.name,
            },
        })),
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: siteConfig.baseUrl },
            { '@type': 'ListItem', position: 2, name: 'บทความ', item: `${siteConfig.baseUrl}/blog` },
        ],
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>📝 บทความและข่าวสาร</h1>
                    <p>อ่านบทความ รีวิว เทคนิค และข่าวสารล่าสุดเกี่ยวกับมือถือมือสองจาก {siteConfig.name}</p>
                </div>
            </section>

            {/* Breadcrumb */}
            <nav className="container" style={{ padding: '1rem 0' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    <Link href="/">หน้าแรก</Link> {' > '} <span>บทความ</span>
                </div>
            </nav>

            {/* Blog Posts Grid */}
            <section className="section">
                <div className="container">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                            <p>กำลังโหลดบทความ...</p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Post (First Post) */}
                            {displayPosts.length > 0 && (
                                <div style={{ marginBottom: '3rem' }}>
                                    {displayPosts[0].isDefault ? (
                                        <DefaultArticleContent />
                                    ) : (
                                        <Link
                                            href={`/blog/${displayPosts[0].slug}`}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                            onClick={() => saveClick('blog-post', { slug: displayPosts[0].slug, title: displayPosts[0].title })}
                                        >
                                            <article
                                                className="feature-card"
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                                    gap: '2rem',
                                                    padding: '0',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {displayPosts[0].featuredImage && (
                                                    <div style={{ position: 'relative', minHeight: '300px' }}>
                                                        <Image
                                                            src={displayPosts[0].featuredImage}
                                                            alt={displayPosts[0].title}
                                                            fill
                                                            style={{ objectFit: 'cover' }}
                                                            priority
                                                        />
                                                    </div>
                                                )}
                                                <div style={{ padding: '2rem' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.75rem',
                                                        background: 'var(--primary)',
                                                        color: '#fff',
                                                        borderRadius: '20px',
                                                        fontSize: '0.8rem',
                                                        marginBottom: '1rem',
                                                    }}>
                                                        {displayPosts[0].category || 'บทความ'}
                                                    </span>
                                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                                                        {displayPosts[0].title}
                                                    </h2>
                                                    <p style={{ opacity: 0.8, marginBottom: '1rem', lineHeight: 1.7 }}>
                                                        {displayPosts[0].excerpt}
                                                    </p>
                                                    <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                                                        <span>✍️ {displayPosts[0].author}</span>
                                                        <span style={{ marginLeft: '1rem' }}>
                                                            📅 {new Date(displayPosts[0].createdAt).toLocaleDateString('th-TH', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Other Posts Grid */}
                            {displayPosts.length > 1 && (
                                <div className="gallery-grid">
                                    {displayPosts.slice(1).map((post, index) => (
                                        <Link
                                            key={post.id || index}
                                            href={`/blog/${post.slug}`}
                                            className="feature-card"
                                            style={{ padding: 0, overflow: 'hidden', textDecoration: 'none' }}
                                            onClick={() => saveClick('blog-post', { slug: post.slug, title: post.title })}
                                        >
                                            {post.featuredImage && (
                                                <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                                                    <Image
                                                        src={post.featuredImage}
                                                        alt={post.title}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                            <div style={{ padding: '1.25rem' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    padding: '0.2rem 0.5rem',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    borderRadius: '12px',
                                                    fontSize: '0.75rem',
                                                    marginBottom: '0.75rem',
                                                }}>
                                                    {post.category || 'ทั่วไป'}
                                                </span>
                                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                                                    {post.title}
                                                </h3>
                                                <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.75rem', lineHeight: 1.6 }}>
                                                    {post.excerpt?.substring(0, 100)}...
                                                </p>
                                                <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                                                    📅 {new Date(post.createdAt).toLocaleDateString('th-TH')}
                                                </div>
                                                {post.tags && post.tags.length > 0 && (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                                                        {post.tags.slice(0, 3).map((tag, i) => (
                                                            <span
                                                                key={i}
                                                                style={{
                                                                    background: 'rgba(255,255,255,0.05)',
                                                                    padding: '2px 8px',
                                                                    borderRadius: '12px',
                                                                    fontSize: '0.7rem',
                                                                }}
                                                            >
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* No Posts Message */}
                            {posts.length === 0 && !displayPosts[0].isDefault && (
                                <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.7 }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                                    <p>ยังไม่มีบทความในขณะนี้</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Internal Links Section */}
            <section className="section section-alt">
                <div className="container">
                    <h2 style={{ marginBottom: '1.5rem' }}>🔗 หน้าที่เกี่ยวข้อง</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <Link href="/" className="btn btn-outline">🏠 หน้าแรก</Link>
                        <Link href="/about" className="btn btn-outline">ℹ️ เกี่ยวกับเรา</Link>
                        <Link href="/videos" className="btn btn-outline">🎬 วิดีโอรีวิว</Link>
                        <Link href="/warranty" className="btn btn-outline">🛡️ การรับประกัน</Link>
                        <Link href="/faq" className="btn btn-outline">❓ คำถามที่พบบ่อย</Link>
                        <Link href="/contact" className="btn btn-outline">📞 ติดต่อเรา</Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container">
                    <div className="cta-section" style={{ textAlign: 'center' }}>
                        <h2>สนใจสั่งซื้อมือถือคุณภาพดี?</h2>
                        <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                            ติดต่อเราได้เลย พร้อมให้คำปรึกษา รับประกัน 30 วัน
                        </p>
                        <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                            <a
                                href={siteConfig.social.line}
                                className="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ทัก LINE
                            </a>
                            <a
                                href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`}
                                className="btn btn-outline"
                            >
                                📞 โทร {siteConfig.company.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

// Default Article Component (Static content for SEO)
function DefaultArticleContent() {
    return (
        <article className="legal-content" style={{ maxWidth: '900px' }}>
            {/* Header */}
            <header style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', lineHeight: 1.4 }}>
                    PG Mobile คืออะไร? ทำไมถึงเป็นตัวเลือกร้านมือถือมือสองที่หลายคนไว้วางใจ
                </h2>
                <div style={{ marginTop: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
                    <span>📅 เผยแพร่: 10 มกราคม 2569</span>
                    <span style={{ marginLeft: '1rem' }}>✍️ โดย {siteConfig.name}</span>
                </div>
            </header>

            {/* Hero Image */}
            <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden' }}>
                <Image
                    src="/images/Commercial-registration.jpg"
                    alt="ใบทะเบียนการค้า PG Mobile"
                    width={900}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                />
            </div>

            {/* Content */}
            <section>
                <h3>บทนำ: ทำความรู้จักกับ PG Mobile</h3>
                <p>
                    ในยุคที่สมาร์ทโฟนกลายเป็นส่วนหนึ่งของชีวิตประจำวัน การมีมือถือคุณภาพดีในราคาที่จับต้องได้
                    จึงเป็นสิ่งที่หลายคนต้องการ <strong>PG Mobile</strong> คือคำตอบสำหรับผู้ที่มองหา
                    มือถือมือสองคุณภาพเกรด A ในราคาที่เป็นมิตร พร้อมการรับประกันที่มั่นใจได้
                </p>

                <h3>PG Mobile คืออะไร?</h3>
                <p>
                    <strong>PG Mobile</strong> เป็นร้านขายมือถือมือสองที่จดทะเบียนการค้าถูกต้องตามกฎหมาย
                    ตั้งอยู่ที่จังหวัดสกลนคร ภายใต้ชื่อ {siteConfig.company.name} เลขทะเบียน {siteConfig.company.registration}
                    เราให้บริการลูกค้ามาแล้วกว่า 5 ปี ด้วยความซื่อสัตย์และความใส่ใจในทุกรายละเอียด
                </p>

                <h3>จุดเด่นของ PG Mobile</h3>
                <ul>
                    <li>✓ <Link href="/warranty">รับประกันสินค้า 30 วัน</Link></li>
                    <li>✓ จัดส่งฟรีทั่วประเทศ</li>
                    <li>✓ รับเงินปลายทาง ไม่ต้องโอนก่อน</li>
                    <li>✓ ส่งรูป/วิดีโอเครื่องจริงก่อนซื้อ</li>
                    <li>✓ บริการหลังการขายที่ดี ตอบแชทเร็ว</li>
                    <li>✓ <Link href="/about">มีหน้าร้านจริง</Link> เข้ามาดูเครื่องได้</li>
                </ul>

                <p>
                    อ่านเพิ่มเติม: <Link href="/about">เกี่ยวกับ PG Mobile</Link> |
                    <Link href="/faq"> คำถามที่พบบ่อย</Link> |
                    <Link href="/contact"> ติดต่อเรา</Link>
                </p>
            </section>

            {/* CTA */}
            <div style={{ marginTop: '2rem', textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <h3>สนใจสั่งซื้อมือถือคุณภาพดี?</h3>
                <p style={{ opacity: 0.9, marginBottom: '1rem' }}>ติดต่อเราได้เลย พร้อมให้คำปรึกษา</p>
                <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                    <a href={siteConfig.social.line} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        ทัก LINE
                    </a>
                    <a href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`} className="btn btn-outline">
                        โทร {siteConfig.company.phone}
                    </a>
                </div>
            </div>
        </article>
    );
}
