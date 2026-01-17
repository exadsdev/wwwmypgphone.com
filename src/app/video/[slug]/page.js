'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import siteConfig from '@/config/site';
import { getVideoBySlug, getVideoUrls } from '@/data/videos';

export default function VideoDetailPage({ params }) {
    // Unwrap params Promise for Next.js 15+ compatibility
    const { slug } = use(params);
    const video = getVideoBySlug(slug);
    const [isPlaying, setIsPlaying] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(-1);

    if (!video) {
        notFound();
    }

    const videoUrls = getVideoUrls(video, siteConfig.baseUrl);

    const handlePlayVideo = () => {
        setIsPlaying(true);
    };

    return (
        <>
            {/* Breadcrumb */}
            <nav className="container" style={{ padding: '1rem 0' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    <Link href="/">หน้าแรก</Link> {' > '}
                    <Link href="/videos">วิดีโอ</Link> {' > '}
                    <span>{video.shortTitle || video.title}</span>
                </div>
            </nav>

            {/* Video Content */}
            <article className="container section">
                {/* Video Player */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16/9',
                        background: '#000',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: isPlaying ? 'default' : 'pointer',
                    }}
                    onClick={!isPlaying ? handlePlayVideo : undefined}
                >
                    {!isPlaying ? (
                        <>
                            <Image
                                src={videoUrls.thumbnailUrl}
                                alt={video.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                            <button
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80px',
                                    height: '80px',
                                    background: 'rgba(255, 0, 0, 0.9)',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                aria-label="เล่นวิดีโอ"
                            >
                                <svg width="32" height="32" fill="#fff" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <iframe
                            src={`${videoUrls.embedUrl}?autoplay=1&rel=0`}
                            title={video.title}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                </div>

                {/* Video Header */}
                <header style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{video.title}</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                        <span>⏱ ความยาว: {video.durationDisplay}</span>
                        <span>📅 เผยแพร่: {video.publishedDateDisplay}</span>
                        <span>🏷️ {video.tags?.slice(0, 3).join(', ')}</span>
                    </div>
                </header>

                {/* Introduction */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>เกี่ยวกับวิดีโอนี้</h2>
                    <div style={{ lineHeight: 1.9, opacity: 0.9 }}>
                        <p style={{ marginBottom: '1rem' }}>
                            ยินดีต้อนรับสู่วิดีโอรีวิว <strong>PG Mobile V9</strong> มือถือมือสองคุณภาพดีจากร้าน PG Mobile
                            ในวิดีโอนี้เราจะพาคุณไปดูรายละเอียดของสินค้า ตั้งแต่สภาพภายนอก คุณภาพหน้าจอ ประสิทธิภาพการใช้งาน
                            กล้องถ่ายรูป แบตเตอรี่ และทุกฟีเจอร์ที่สำคัญ เพื่อให้คุณมั่นใจก่อนตัดสินใจซื้อ
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            ร้าน PG Mobile เป็นร้านขายมือถือมือสองที่ได้รับความไว้วางใจจากลูกค้าทั่วประเทศไทย
                            เราตั้งอยู่ที่จังหวัดสกลนคร และให้บริการจัดส่งสินค้าถึงบ้านทั่วประเทศ
                        </p>
                    </div>
                </section>

                {/* Key Takeaways */}
                {video.keyTakeaways && (
                    <section
                        style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '3rem',
                        }}
                    >
                        <h2 style={{ color: '#22c55e', marginBottom: '1rem' }}>ไฮไลต์สำคัญ</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {video.keyTakeaways.map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        padding: '0.75rem 0 0.75rem 2rem',
                                        position: 'relative',
                                        borderBottom: '1px solid rgba(34, 197, 94, 0.1)',
                                        color: '#22c55e',
                                        fontWeight: 500,
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: 0 }}>✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Transcript */}
                {video.transcript && (
                    <section
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '3rem',
                        }}
                    >
                        <h2 style={{ marginBottom: '1rem' }}>บทถอดความวิดีโอ (Transcript)</h2>
                        <p style={{ marginBottom: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
                            อ่านเนื้อหาทั้งหมดในวิดีโอ พร้อม Timecode สำหรับการอ้างอิง
                        </p>
                        {video.transcript.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1rem 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                <span
                                    style={{
                                        flexShrink: 0,
                                        background: '#1a1a2e',
                                        color: '#fff',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        fontFamily: 'monospace',
                                    }}
                                >
                                    {item.time}
                                </span>
                                <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.7 }}>{item.text}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* FAQ */}
                {video.faq && (
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ marginBottom: '1rem' }}>คำถามที่พบบ่อย (FAQ)</h2>
                        <div className="accordion">
                            {video.faq.map((item, index) => (
                                <div key={index} className="accordion-item">
                                    <h3 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                                        >
                                            {item.question}
                                            <span style={{ fontSize: '1.5rem' }}>
                                                {openFaqIndex === index ? '−' : '+'}
                                            </span>
                                        </button>
                                    </h3>
                                    {openFaqIndex === index && (
                                        <div className="accordion-body">{item.answer}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section
                    style={{
                        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                        borderRadius: '12px',
                        padding: '2.5rem',
                        textAlign: 'center',
                        marginBottom: '2rem',
                    }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>สนใจมือถือคุณภาพดี ราคาถูก?</h3>
                    <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>รับประกัน 30 วันเต็ม จัดส่งฟรีทั่วประเทศ รับเงินปลายทาง</p>
                    <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                        <a
                            href={siteConfig.social.line}
                            className="btn btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ติดต่อผ่าน LINE
                        </a>
                        <a href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`} className="btn btn-outline">
                            📞 โทร {siteConfig.company.phone}
                        </a>
                    </div>
                </section>

                {/* Related Links */}
                {video.relatedLinks && (
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: '1rem' }}>หน้าที่เกี่ยวข้อง</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {video.relatedLinks.map((link, index) => (
                                <Link key={index} href={link.url} className="btn btn-outline">
                                    → {link.title}
                                </Link>
                            ))}
                            <Link href="/videos" className="btn btn-outline">
                                → ดูวิดีโอทั้งหมด
                            </Link>
                        </div>
                    </section>
                )}

                {/* Back Link */}
                <Link href="/videos" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb' }}>
                    ← กลับไปหน้ารายการวิดีโอ
                </Link>
            </article>
        </>
    );
}
