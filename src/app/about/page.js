import Image from 'next/image';
import Link from 'next/link';
import siteConfig from '@/config/site';

export const metadata = {
    title: `เกี่ยวกับเรา - ${siteConfig.name}`,
    description: 'รู้จัก PG Mobile ร้านขายมือถือมือสอง คุณภาพดี จดทะเบียนถูกต้อง ให้บริการมากว่า 5 ปี ด้วยความซื่อสัตย์และความใส่ใจในทุกรายละเอียด',
    keywords: 'เกี่ยวกับ PG Mobile, ประวัติร้าน, ร้านมือถือสกลนคร',
    alternates: {
        canonical: `${siteConfig.baseUrl}/about`,
    },
};

export default function AboutPage() {
    const stats = [
        { number: '5+', label: 'ปีประสบการณ์' },
        { number: '5,000+', label: 'ลูกค้าที่ไว้วางใจ' },
        { number: '98%', label: 'อัตราความพึงพอใจ' },
        { number: '100%', label: 'ตรวจสอบก่อนส่ง' },
    ];

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>เกี่ยวกับเรา</h1>
                    <p>รู้จักกับ PG Mobile ร้านขายมือถือมือสองคุณภาพดี</p>
                </div>
            </section>

            {/* About Content */}
            <section className="section">
                <div className="container">
                    <div className="about-content">
                        <h2>เรื่องราวของ PG Mobile</h2>

                        <p>
                            <strong>PG Mobile</strong> ก่อตั้งขึ้นด้วยความมุ่งมั่นที่จะมอบมือถือมือสองคุณภาพดี
                            ในราคาที่ทุกคนเข้าถึงได้ เราเชื่อว่าทุกคนควรได้ใช้สมาร์ทโฟนที่มีคุณภาพ
                            โดยไม่ต้องจ่ายแพงเกินไป
                        </p>

                        <p>
                            เราเริ่มต้นจากร้านเล็กๆ ในจังหวัดสกลนคร ด้วยความรักและความหลงใหลในเทคโนโลยี
                            ปัจจุบันเราให้บริการลูกค้ามาแล้วกว่า 5,000 ราย จากทั่วประเทศไทย
                            และยังคงเติบโตอย่างต่อเนื่องด้วยความไว้วางใจของลูกค้า
                        </p>

                        <div className="about-image">
                            <Image
                                src="/images/Commercial-registration.jpg"
                                alt="ใบทะเบียนการค้า PG Mobile"
                                width={800}
                                height={600}
                                loading="lazy"
                            />
                        </div>

                        <h2>ทำไมต้องเลือกเรา</h2>

                        <p>
                            ทุกเครื่องที่เราขายต้องผ่านการตรวจสอบอย่างละเอียดจากช่างผู้ชำนาญ
                            เราตรวจเช็คทั้งสภาพภายนอก การทำงานของระบบ แบตเตอรี่ และลำโพง
                            เพื่อให้มั่นใจว่าลูกค้าจะได้รับสินค้าที่พร้อมใช้งานทันที
                        </p>

                        <p>
                            นอกจากนี้ เรายังจดทะเบียนการค้าถูกต้องตามกฎหมาย ภายใต้ชื่อ
                            <strong> {siteConfig.company.name}</strong> เลขทะเบียน {siteConfig.company.registration}
                            ลูกค้าสามารถมั่นใจได้ว่าซื้อสินค้าจากร้านที่เชื่อถือได้
                        </p>

                        <h2>พันธกิจของเรา</h2>

                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                            <li>มอบมือถือมือสองคุณภาพดี ในราคาที่เป็นธรรม</li>
                            <li>ตรวจสอบสินค้าทุกชิ้นก่อนจัดส่งอย่างละเอียด</li>
                            <li>ให้บริการด้วยความซื่อสัตย์และโปร่งใส</li>
                            <li>รับประกันสินค้าเพื่อความมั่นใจของลูกค้า</li>
                            <li>พัฒนาบริการอย่างต่อเนื่องเพื่อความพึงพอใจสูงสุด</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section section-alt">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <h2>พร้อมสั่งซื้อมือถือคุณภาพดีแล้วหรือยัง?</h2>
                    <p>ติดต่อเราวันนี้ รับคำแนะนำฟรี!</p>
                    <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                        <a
                            href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`}
                            className="btn btn-primary"
                        >
                            โทรหาเรา {siteConfig.company.phone}
                        </a>
                        <Link href="/contact" className="btn btn-outline">
                            ติดต่อเรา
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
