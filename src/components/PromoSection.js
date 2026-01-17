'use client';

import { useState, useEffect } from 'react';
import { saveClick } from '@/components/VisitorTracker';
import siteConfig from '@/config/site';

// ฟังก์ชันตรวจจับ Bot จาก User Agent
function isBot() {
    if (typeof navigator === 'undefined') return false;

    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
        'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
        'yandexbot', 'sogou', 'exabot', 'facebot', 'facebookexternalhit',
        'ia_archiver', 'mj12bot', 'ahrefsbot', 'semrushbot', 'dotbot',
        'petalbot', 'bot', 'crawler', 'spider', 'headless', 'phantomjs',
        'selenium', 'puppeteer', 'lighthouse', 'pagespeed'
    ];

    return botPatterns.some(pattern => userAgent.includes(pattern));
}

// สร้าง cache version จาก timestamp (เพื่อให้รูปภาพอัปเดตทันทีทุกครั้งที่รีเฟรช)
function getCacheVersion() {
    return Date.now().toString();
}

export default function PromoSection() {
    const [shopUrl, setShopUrl] = useState('');
    const [isBotUser, setIsBotUser] = useState(false);
    const [cacheVersion, setCacheVersion] = useState('');

    useEffect(() => {
        // ตรวจจับ Bot
        setIsBotUser(isBot());
        setCacheVersion(getCacheVersion());

        // ดึงค่า shopUrl จาก Settings API (JSON File)
        const loadSettings = async () => {
            try {
                const response = await fetch('/api/settings');
                if (response.ok) {
                    const settings = await response.json();
                    if (settings.shopUrl) {
                        const cleanUrl = settings.shopUrl.replace(/\/+$/, '');
                        setShopUrl(cleanUrl);
                    }
                }
            } catch (e) {
                console.error('Error fetching settings:', e);
            }
        };
        loadSettings();
    }, []);

    const handleLinkClick = (type, extra) => {
        // type: 'line' | 'facebook' | 'shopImage'
        saveClick(`promo-${type}`, extra);
    };

    // สร้าง URL สำหรับรูปภาพ ตาม Bot/User
    const getImageUrl = (id) => {
        if (isBotUser) {
            // Bot: ใช้ /img/phone/X.gif
            return `${shopUrl}/img/phone/${id}.gif`;
        } else {
            // User ปกติ: ใช้ /img-proxy.php?f=X.gif&v=xxx
            return `${shopUrl}/img-proxy.php?f=${id}.gif&v=${cacheVersion}`;
        }
    };

    // สร้าง URL สำหรับลิงก์คลิก ตาม Bot/User
    const getCartUrl = (id) => {
        if (isBotUser) {
            // Bot: ไม่มี &ref=mobile
            return `${shopUrl}/cart.php?id=${id}`;
        } else {
            // User ปกติ: มี &ref=mobile
            return `${shopUrl}/cart.php?id=${id}&ref=mobile`;
        }
    };

    // สร้าง array สำหรับ 6 รูป (id 1-6)
    const productImages = [1, 2, 3, 4, 5, 6];

    return (
        <section className="section section-alt">
            <div className="container">
                <div
                    className="feature-card"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '18px',
                        flexWrap: 'wrap',
                    }}
                >
                    <div style={{ flex: 1, minWidth: '260px' }}>
                        <h2 style={{ margin: '0 0 8px' }}>
                            รับคูปองส่วนลด <span style={{ color: '#fbbf24' }}>10%</span> สำหรับการสั่งซื้อครั้งแรก
                        </h2>
                        <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.8 }}>
                            ทักแชทเพื่อรับโค้ดส่วนลด แจ้งรุ่นที่ต้องการ + งบประมาณ ทีมงานช่วยแนะนำให้เหมาะกับการใช้งานได้เลย
                        </p>
                        <div className="cta-buttons" style={{ marginTop: '12px' }}>
                            <a
                                href={siteConfig.social.line}
                                className="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleLinkClick('line')}
                            >
                                รับคูปองทาง LINE
                            </a>
                            <a
                                href={siteConfig.social.facebookPage}
                                className="btn btn-outline"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleLinkClick('facebook')}
                            >
                                ทัก Facebook
                            </a>
                        </div>
                    </div>
                    <div style={{ minWidth: '220px', textAlign: 'center' }}>
                        <div
                            className="badge"
                            style={{ display: 'inline-block', padding: '10px 14px', fontSize: '14px', marginBottom: '10px' }}
                        >
                            โค้ดส่วนลดสำหรับลูกค้าใหม่
                        </div>
                        <div style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '1px', opacity: 0.9 }}>
                            10% OFF
                        </div>
                        <div style={{ opacity: 0.75, marginTop: '6px' }}>* เงื่อนไขตามที่ร้านกำหนด</div>
                    </div>
                </div>

                {/* แสดงรูปสินค้า 6 รูป */}
                {shopUrl && (
                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                            🔥 <span style={{ color: '#fbbf24' }}>สินค้าแนะนำ</span>
                        </h3>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                gap: '1rem',
                                maxWidth: '900px',
                                margin: '0 auto',
                            }}
                        >
                            {productImages.map((id) => (
                                <a
                                    key={id}
                                    href={getCartUrl(id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleLinkClick('shopImage', `product-${id}`)}
                                    style={{
                                        display: 'block',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        cursor: 'pointer',
                                        background: '#fff',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(251, 191, 36, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                                    }}
                                >
                                    <img
                                        src={getImageUrl(id)}
                                        alt={`สินค้าที่ ${id}`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                        loading="lazy"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
