import Link from 'next/link';
import siteConfig from '@/config/site';

export const metadata = {
    title: `นโยบายคืนสินค้า - ${siteConfig.name}`,
    description: 'นโยบายการคืนสินค้า เปลี่ยนสินค้า และการรับประกันของ PG Mobile อ่านเงื่อนไขและขั้นตอนการดำเนินการ',
    keywords: 'นโยบายคืนสินค้า, refund policy, เปลี่ยนสินค้า, คืนเงิน, PG Mobile',
    alternates: {
        canonical: `${siteConfig.baseUrl}/refund-policy`,
    },
};

export default function RefundPolicyPage() {
    const warrantyConditions = [
        {
            title: 'ระยะเวลารับประกัน',
            items: [
                'รับประกัน 30 วัน นับจากวันที่ลูกค้าได้รับสินค้า',
                'ระยะเวลานับตามเลขพัสดุจากระบบขนส่ง',
            ],
        },
        {
            title: 'สิ่งที่รับประกัน',
            items: [
                'อาการเสียจากการใช้งานปกติ เช่น หน้าจอค้าง, ลำโพงไม่ดัง, ชาร์จไม่เข้า',
                'ปัญหาฮาร์ดแวร์ที่ไม่ได้เกิดจากการใช้งานผิดวิธี',
                'ปัญหาซอฟต์แวร์เบื้องต้น',
            ],
        },
        {
            title: 'สิ่งที่ไม่รับประกัน',
            items: [
                'ความเสียหายจากการตก กระแทก หรือน้ำเข้า',
                'ถอดประกอบ แกะซ่อมเอง หรือให้ร้านอื่นซ่อม',
                'ติดไวรัส หรือความเสียหายจากการใช้งานผิดวิธี',
                'รอยขีดข่วน บุบ งอ หรือความเสียหายภายนอก',
            ],
        },
    ];

    const exchangeConditions = [
        'ต้องแจ้งภายใน 7 วัน หลังได้รับสินค้า',
        'สินค้าต้องอยู่ในสภาพเดิม ไม่มีรอยเพิ่มเติม',
        'ต้องมีอุปกรณ์ครบตามที่ได้รับ',
        'มีหลักฐานการสั่งซื้อ (ใบเสร็จ, แชท, เลขพัสดุ)',
    ];

    const claimProcess = [
        { step: 1, title: 'แจ้งปัญหา', desc: 'ติดต่อทาง LINE หรือ Facebook แจ้งอาการพร้อมรูป/วิดีโอ' },
        { step: 2, title: 'รอยืนยัน', desc: 'ทีมงานตรวจสอบและแจ้งผลการพิจารณาภายใน 24 ชม.' },
        { step: 3, title: 'ส่งสินค้า', desc: 'แพ็คสินค้าอย่างมิดชิด ส่งมาตามที่อยู่ที่แจ้ง' },
        { step: 4, title: 'ตรวจสอบ', desc: 'ทางร้านตรวจสอบสินค้า ใช้เวลา 3-5 วันทำการ' },
        { step: 5, title: 'ดำเนินการ', desc: 'ซ่อม/เปลี่ยน/คืนเงิน ตามผลการพิจารณา' },
    ];

    const shippingCosts = [
        { condition: 'สินค้ามีปัญหาจริง (ตรงตามเงื่อนไข)', send: 'ร้านออกให้', return: 'ร้านออกให้' },
        { condition: 'ลูกค้าเปลี่ยนใจ / ไม่พอใจสภาพ', send: 'ลูกค้าออกเอง', return: 'ลูกค้าออกเอง' },
        { condition: 'สินค้าไม่ตรงตามที่สั่ง', send: 'ร้านออกให้', return: 'ร้านออกให้' },
    ];

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>นโยบายคืนสินค้า</h1>
                    <p>เงื่อนไขการคืนสินค้า เปลี่ยนสินค้า และการรับประกัน</p>
                </div>
            </section>

            {/* Warranty Conditions */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">เงื่อนไข<span>การรับประกัน</span></h2>
                    <div className="warranty-grid">
                        {warrantyConditions.map((condition, index) => (
                            <div key={index} className="warranty-card">
                                <h3>{condition.title}</h3>
                                <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                                    {condition.items.map((item, i) => (
                                        <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exchange Conditions */}
            <section className="section section-alt">
                <div className="container">
                    <h2 className="section-title">เงื่อนไข<span>การเปลี่ยน/คืนสินค้า</span></h2>
                    <div className="legal-content" style={{ maxWidth: '100%' }}>
                        <div className="feature-card">
                            <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                                {exchangeConditions.map((item, index) => (
                                    <li key={index} style={{ marginBottom: '0.75rem', lineHeight: 1.8 }}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Claim Process */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">ขั้นตอน<span>การเคลม</span></h2>
                    <div className="features-grid">
                        {claimProcess.map((item) => (
                            <div key={item.step} className="feature-card" style={{ textAlign: 'center' }}>
                                <div
                                    className="feature-icon"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        margin: '0 auto 1rem',
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                    }}
                                >
                                    {item.step}
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shipping Costs Table */}
            <section className="section section-alt">
                <div className="container">
                    <h2 className="section-title">ค่าส่ง<span>การเคลม</span></h2>
                    <div className="feature-card" style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>กรณี</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>ค่าส่งขาไป</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>ค่าส่งขากลับ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shippingCosts.map((row, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <td style={{ padding: '1rem' }}>{row.condition}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>{row.send}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>{row.return}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="section">
                <div className="container">
                    <div className="legal-content">
                        <h2>ติดต่อเคลม</h2>
                        <ul>
                            <li>โทร: {siteConfig.company.phone}</li>
                            <li>อีเมล: {siteConfig.company.email}</li>
                            <li>LINE: <a href={siteConfig.social.line} target="_blank" rel="noopener noreferrer">{siteConfig.social.lineId}</a></li>
                            <li>Facebook: <a href={siteConfig.social.facebookPage} target="_blank" rel="noopener noreferrer">PG Mobiles</a></li>
                        </ul>
                        <p>เวลาทำการ: {siteConfig.businessHours}</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <h2>มีคำถามเพิ่มเติม?</h2>
                    <p>ติดต่อเราได้เลย ทีมงานพร้อมช่วยเหลือ</p>
                    <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                        <a href={siteConfig.social.line} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            ทัก LINE
                        </a>
                        <Link href="/warranty" className="btn btn-outline">
                            ดูเงื่อนไขรับประกัน
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
