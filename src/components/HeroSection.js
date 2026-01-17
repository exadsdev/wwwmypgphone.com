import Image from 'next/image';
import Link from 'next/link';
import siteConfig from '@/config/site';

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="badge">🔥 พร้อมส่งทั่วไทย</span>
                        <h1>
                            ร้านขายมือถือ PG Mobile <br />
                            <span style={{ color: '#fbbf24' }}>คุณภาพดี ราคาถูก</span>
                        </h1>
                        <p className="hero-subtitle">
                            รับประกันทุกเครื่อง ตรวจสอบก่อนส่ง ของแท้ 100%<br />
                            PG ครบทุกรุ่น
                        </p>

                        <div className="cta-buttons">
                            <a
                                href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`}
                                className="btn btn-primary"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                โทรเลย {siteConfig.company.phone}
                            </a>
                            <a href="#products" className="btn btn-outline">ดูสินค้า</a>
                        </div>

                        <div className="cta-buttons" style={{ marginTop: '12px', gap: '10px' }}>
                            <a
                                href={siteConfig.social.line}
                                className="btn btn-outline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                แอดไลน์เพื่อสั่งซื้อ
                            </a>
                            <a
                                href={siteConfig.social.facebookPage}
                                className="btn btn-outline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ดูงาน/รีวิวบน Facebook
                            </a>
                        </div>

                        <div style={{ marginTop: '14px', opacity: 0.9, fontSize: '14px', lineHeight: 1.6 }}>
                            <div>✅ ส่งฟรีทั่วประเทศ (1-3 วัน)</div>
                            <div>✅ เก็บเงินปลายทาง / โอน / ผ่อนชำระ (แล้วแต่รุ่น)</div>
                            <div>✅ มีบริการเช็คเครื่อง / เช็คแบต / เช็คอุปกรณ์ก่อนส่ง</div>
                        </div>
                    </div>

                    <div className="hero-image-wrapper">
                        <Image
                            src="/images/main.png"
                            alt="มือถือมือสอง PG Mobile"
                            className="hero-image"
                            width={400}
                            height={400}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
