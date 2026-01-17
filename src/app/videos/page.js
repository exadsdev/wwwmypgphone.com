import Image from 'next/image';
import Link from 'next/link';
import siteConfig from '@/config/site';
import { getSortedVideos, getVideoUrls } from '@/data/videos';

export const metadata = {
    title: `วิดีโอรีวิวมือถือมือสอง - ${siteConfig.name}`,
    description: 'รวมวิดีโอรีวิวมือถือมือสอง PG Mobile V9 คุณภาพดี ราคาถูก รับประกัน 30 วัน ดูรีวิวจริงก่อนตัดสินใจซื้อ',
    keywords: 'วิดีโอ PG Mobile, รีวิวมือถือมือสอง, PG V9 รีวิว, มือถือราคาถูก',
    alternates: {
        canonical: `${siteConfig.baseUrl}/videos`,
    },
};

export default function VideosPage() {
    const allVideos = getSortedVideos();

    // Generate ItemList Schema
    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'วิดีโอรีวิวมือถือมือสอง PG Mobile',
        description: 'รวมวิดีโอรีวิวมือถือมือสองคุณภาพดี ราคาถูก จาก PG Mobile',
        numberOfItems: allVideos.length,
        itemListElement: allVideos.map((video, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${siteConfig.baseUrl}/video/${video.slug}`,
            name: video.title,
        })),
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: siteConfig.baseUrl },
            { '@type': 'ListItem', position: 2, name: 'วิดีโอ', item: `${siteConfig.baseUrl}/videos` },
        ],
    };

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />

            {/* Hero */}
            <section className="page-header">
                <div className="container">
                    <h1>วิดีโอรีวิวมือถือมือสอง PG Mobile</h1>
                    <p>รวมวิดีโอรีวิวจริงจากร้าน PG Mobile ดูก่อนตัดสินใจซื้อ มือถือคุณภาพดี ราคาถูก รับประกัน 30 วัน</p>
                </div>
            </section>

            {/* Breadcrumb */}
            <nav className="container" style={{ padding: '1rem 0' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    <Link href="/">หน้าแรก</Link> {' > '} <span>วิดีโอ</span>
                </div>
            </nav>

            {/* Video List */}
            <section className="section">
                <div className="container">
                    {allVideos.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.7 }}>
                            ยังไม่มีวิดีโอในขณะนี้
                        </div>
                    ) : (
                        <div className="gallery-grid">
                            {allVideos.map((video) => {
                                const videoUrls = getVideoUrls(video, siteConfig.baseUrl);
                                return (
                                    <Link
                                        key={video.slug}
                                        href={`/video/${video.slug}`}
                                        className="feature-card"
                                        style={{ padding: 0, overflow: 'hidden', textDecoration: 'none' }}
                                    >
                                        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#1a1a2e' }}>
                                            <Image
                                                src={videoUrls.thumbnailUrl}
                                                alt={video.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                style={{ objectFit: 'cover' }}
                                                loading={video.order === 1 ? 'eager' : 'lazy'}
                                            />
                                            {/* Play Button Overlay */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '64px',
                                                    height: '64px',
                                                    background: 'rgba(255, 0, 0, 0.9)',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                            {/* Duration */}
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '8px',
                                                    right: '8px',
                                                    background: 'rgba(0,0,0,0.8)',
                                                    color: '#fff',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                {video.durationDisplay}
                                            </span>
                                        </div>
                                        <div style={{ padding: '1rem' }}>
                                            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                                {video.shortTitle || video.title}
                                            </h2>
                                            <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.75rem' }}>
                                                {video.excerpt || video.description}
                                            </p>
                                            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                                                📅 {video.publishedDateDisplay}
                                            </div>
                                            {video.tags && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                                                    {video.tags.slice(0, 3).map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            style={{
                                                                background: 'rgba(255,255,255,0.1)',
                                                                padding: '2px 8px',
                                                                borderRadius: '12px',
                                                                fontSize: '0.7rem',
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* SEO Content */}
            <section className="section section-alt">
                <div className="container">
                    <h2>เกี่ยวกับวิดีโอรีวิว PG Mobile</h2>
                    <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
                        ยินดีต้อนรับสู่หน้ารวมวิดีโอรีวิวมือถือมือสองจากร้าน PG Mobile จังหวัดสกลนคร
                        เราได้รวบรวมวิดีโอรีวิวสินค้าทั้งหมดไว้ที่นี่
                        เพื่อให้คุณได้ดูรีวิวจริงก่อนตัดสินใจซื้อ ทุกวิดีโอแสดงให้เห็นถึงคุณภาพของสินค้า กระบวนการตรวจสอบ
                        และการรับประกันที่เราให้กับลูกค้าทุกท่าน
                    </p>
                    <p style={{ lineHeight: 1.8 }}>
                        มือถือมือสองจาก PG Mobile ทุกเครื่องผ่านการตรวจสอบคุณภาพ QC 100% ก่อนจัดส่ง รับประกัน 30 วันเต็ม
                        จัดส่งฟรีทั่วประเทศ รองรับเก็บเงินปลายทาง (COD) ไม่ต้องโอนเงินก่อน
                    </p>

                    <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>หน้าที่เกี่ยวข้อง</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <Link href="/" className="btn btn-outline">หน้าแรก</Link>
                        <Link href="/about" className="btn btn-outline">เกี่ยวกับเรา</Link>
                        <Link href="/warranty" className="btn btn-outline">การรับประกัน</Link>
                        <Link href="/faq" className="btn btn-outline">FAQ</Link>
                        <Link href="/contact" className="btn btn-outline">ติดต่อเรา</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
