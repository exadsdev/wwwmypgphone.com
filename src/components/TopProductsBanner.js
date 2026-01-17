'use client';

import { useState, useEffect } from 'react';
import { saveClick } from '@/components/VisitorTracker';

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

export default function TopProductsBanner() {
    const [shopUrl, setShopUrl] = useState('');
    const [isBotUser, setIsBotUser] = useState(false);
    const [cacheVersion, setCacheVersion] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // ตรวจจับ Bot
        setIsBotUser(isBot());
        setCacheVersion(getCacheVersion());

        // ตรวจจับขนาดหน้าจอ
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

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

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleImageClick = (id) => {
        saveClick('topBanner-shopImage', `product-${id}`);
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

    // ไม่แสดงถ้ายังไม่มี shopUrl
    if (!shopUrl) return null;

    // === แสดงผลสำหรับมือถือ ===
    if (isMobile) {
        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                {/* รูปเต็ม 100% ต่อกันไม่มี gap */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    {productImages.map((id) => (
                        <a
                            key={id}
                            href={getCartUrl(id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleImageClick(id)}
                            style={{
                                display: 'block',
                                width: '100%',
                                cursor: 'pointer',
                                lineHeight: 0,
                            }}
                        >
                            <img
                                src={getImageUrl(id)}
                                alt={`สินค้าแนะนำ ${id}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                }}
                                loading={id <= 2 ? 'eager' : 'lazy'}
                            />
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    // === แสดงผลสำหรับ PC (แบบเดิม) ===
    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '12px 0',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 10px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {productImages.map((id) => (
                    <a
                        key={id}
                        href={getCartUrl(id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleImageClick(id)}
                        style={{
                            flex: '0 0 auto',
                            width: '140px',
                            height: '90px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer',
                            background: '#fff',
                            position: 'relative',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.08)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,255,255,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                        }}
                    >
                        <img
                            src={getImageUrl(id)}
                            alt={`สินค้าแนะนำ ${id}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                            loading="eager"
                        />
                        {/* Badge แสดง "ฟรีส่ง" หรือ "HOT" */}
                        <span
                            style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: id <= 3 ? '#ef4444' : '#22c55e',
                                color: '#fff',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                padding: '2px 6px',
                                borderRadius: '4px',
                            }}
                        >
                            {id <= 3 ? '🔥 HOT' : '✓ ส่งฟรี'}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
