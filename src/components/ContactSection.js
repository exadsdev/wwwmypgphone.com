import siteConfig from '@/config/site';

export default function ContactSection() {
    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className="section-title">ติดต่อ<span>เรา</span></h2>

                <div className="contact-grid">
                    <div className="feature-card">
                        <h3 style={{ marginTop: 0 }}>ส่งข้อความหาเรา</h3>

                        <form style={{ marginTop: '12px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div>
                                    <label className="form-label">ชื่อ</label>
                                    <input type="text" className="form-input" placeholder="ชื่อของคุณ" />
                                </div>
                                <div>
                                    <label className="form-label">เบอร์โทร</label>
                                    <input type="text" className="form-input" placeholder="เบอร์โทรศัพท์" />
                                </div>
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <label className="form-label">ข้อความ</label>
                                <textarea className="form-input" rows={4} placeholder="ข้อความของคุณ" />
                            </div>

                            <div className="cta-buttons" style={{ marginTop: '12px' }}>
                                <button type="submit" className="btn btn-primary">ส่งข้อความ</button>
                                <a
                                    href={siteConfig.social.line}
                                    className="btn btn-outline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ทัก LINE เร็วที่สุด
                                </a>
                            </div>

                            <div style={{ marginTop: '10px', opacity: 0.75, lineHeight: 1.7 }}>
                                * ฟอร์มนี้จะพาไปหน้าติดต่อเรา เพื่อส่งข้อมูล/รายละเอียดเพิ่มเติม
                            </div>
                        </form>
                    </div>

                    <div className="feature-card">
                        <h3 style={{ marginTop: 0 }}>ข้อมูลติดต่อ</h3>
                        <div style={{ marginTop: '10px', lineHeight: 2 }}>
                            <div><strong>ชื่อร้าน:</strong> {siteConfig.name}</div>
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

                        <div
                            style={{
                                marginTop: '14px',
                                borderRadius: '14px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.12)',
                            }}
                        >
                            <iframe
                                title="แผนที่ร้าน PG Mobile"
                                width="100%"
                                height="260"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps?q=${siteConfig.googleMaps.latitude},${siteConfig.googleMaps.longitude}&z=16&output=embed`}
                                style={{ border: 0 }}
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
