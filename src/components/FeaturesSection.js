import siteConfig from '@/config/site';

export default function FeaturesSection() {
    const features = [
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
            ),
            title: 'รับประกันทุกเครื่อง',
            desc1: 'PGmobile ลิขสิทธิ์แท้100%',
            desc2: 'รับประกันสินค้า 30 วัน มั่นใจได้ในคุณภาพ',
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
            ),
            title: 'ส่งฟรีทั่วประเทศ',
            desc1: 'PGเว็บตรงช่วงโปรโมชั่น',
            desc2: 'จัดส่งฟรี! ทุกออเดอร์ ถึงมือภายใน 1-3 วัน',
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                </svg>
            ),
            title: 'ราคายุติธรรม',
            desc1: 'PG mobile จากสิงคโปร์100%',
            desc2: 'ราคาถูกกว่าท้องตลาด คุ้มค่าทุกการซื้อ',
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            ),
            title: 'ตรวจสอบก่อนส่ง',
            desc1: 'PG mobile เว็บตรง100%',
            desc2: 'ตรวจเช็คสภาพ 100% ก่อนจัดส่งทุกเครื่อง',
        },
    ];

    return (
        <section className="section section-alt">
            <div className="container">
                <h2 className="section-title">ทำไมต้องเลือก <span>PG Mobile</span></h2>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc1}</p>
                            <p>{feature.desc2}</p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
                    <div className="feature-card" style={{ flex: '1 1 350px' }}>
                        <h3 style={{ marginTop: 0 }}>PG Mobile ร้านขายมือถือมือสอง PG Mobile</h3>
                        <p style={{ margin: '10px 0 0', lineHeight: 1.8 }}>
                            เราคัดสรรเครื่องมือสองคุณภาพดี ตรวจสอบสภาพการใช้งานทุกจุดก่อนส่ง
                            พร้อมให้คำแนะนำรุ่นที่เหมาะกับงบและการใช้งานจริงของลูกค้า
                            เน้นซื้อสบายใจ มีประกัน และมีช่องทางติดต่อชัดเจน
                        </p>
                        <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            <span className="badge">✔ เช็คเครื่องก่อนส่ง</span>
                            <span className="badge">✔ มีรีวิวลูกค้า</span>
                            <span className="badge">✔ บริการหลังการขาย</span>
                            <span className="badge">✔ ส่งทั่วไทย</span>
                        </div>
                    </div>

                    <div className="feature-card" style={{ flex: '1 1 300px' }}>
                        <h3 style={{ marginTop: 0 }}>ช่องทางติดต่อด่วน</h3>
                        <div style={{ marginTop: '10px', lineHeight: 1.9 }}>
                            <div>
                                <strong>โทร:</strong>{' '}
                                <a href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`}>
                                    {siteConfig.company.phone}
                                </a>
                            </div>
                            <div>
                                <strong>อีเมล:</strong>{' '}
                                <a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a>
                            </div>
                            <div>
                                <strong>Facebook:</strong>{' '}
                                <a href={siteConfig.social.facebookPage} target="_blank" rel="noopener noreferrer">
                                    {siteConfig.social.facebookPage}
                                </a>
                            </div>
                            <div>
                                <strong>LINE:</strong>{' '}
                                <a href={siteConfig.social.line} target="_blank" rel="noopener noreferrer">
                                    {siteConfig.social.line}
                                </a>
                            </div>
                            <div style={{ marginTop: '10px', opacity: 0.9 }}>
                                <strong>ที่อยู่ร้าน:</strong><br />
                                183 หมู่ที่ 1 ต.คำตากล้า อ.คำตากล้า จ.สกลนคร 47250
                            </div>
                            <div style={{ marginTop: '10px', opacity: 0.9 }}>
                                <strong>เวลาเปิดทำการ:</strong> {siteConfig.businessHours}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
