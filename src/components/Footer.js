import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/config/site';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* Trust Badges */}
            <section className="trust-badges">
                <div className="container">
                    <div className="trust-grid">
                        <span>✓ รับประกัน 30 วัน</span>
                        <span>✓ เก็บเงินปลายทาง</span>
                        <span>✓ จัดส่งทั่วไทย</span>
                        <span>✓ ตรวจสอบก่อนส่ง</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        {/* Column 1: Brand */}
                        <div className="footer-col">
                            <h5>{siteConfig.name}</h5>
                            <p>ร้านขายมือถือ PG V9 คุณภาพดี ราคาถูก รับประกันทุกเครื่อง</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <a
                                    href={siteConfig.social.facebookPage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                >
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                                    </svg>
                                </a>
                                <a
                                    href={siteConfig.social.line}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LINE"
                                >
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12,.5C5.66.5.5,4.95.5,10.42c0,4.9,4.34,9,10.23,9.78.4.09.94.27,1.08.61.12.31.08.79.04,1.1l-.17,1c-.05.29-.22,1.16,1.01.63,1.23-.53,6.65-3.92,9.08-6.71h0C23.23,14.8,24,12.69,24,10.42,24,4.95,18.34.5,12,.5Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Address */}
                        <div className="footer-col">
                            <h5>ที่อยู่ร้าน</h5>
                            <p>{siteConfig.company.address}</p>
                            <p><strong>เวลา:</strong> {siteConfig.businessHours}</p>
                        </div>

                        {/* Column 3: Contact */}
                        <div className="footer-col">
                            <h5>ติดต่อเรา</h5>
                            <a href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`}>
                                {siteConfig.company.phone}
                            </a>
                            <a href={`mailto:${siteConfig.company.email}`}>
                                {siteConfig.company.email}
                            </a>
                            <a href={siteConfig.social.line} target="_blank" rel="noopener noreferrer">
                                LINE: {siteConfig.social.lineId}
                            </a>
                        </div>

                        {/* Column 4: Links */}
                        <div className="footer-col">
                            <h5>นโยบาย</h5>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <Link href="/privacy">ความเป็นส่วนตัว</Link>
                                <span>|</span>
                                <Link href="/terms">ข้อกำหนด</Link>
                                <span>|</span>
                                <Link href="/refund-policy">คืนสินค้า</Link>
                                <span>|</span>
                                <Link href="/warranty">รับประกัน</Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="footer-bottom">
                        <div>© {currentYear} {siteConfig.company.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            เลขทะเบียน:
                            <Image
                                src="/images/pgmobile.jpg"
                                alt="ใบทะเบียนพาณิชย์"
                                width={80}
                                height={50}
                                style={{ objectFit: 'contain' }}
                            />
                            {siteConfig.company.registration}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
