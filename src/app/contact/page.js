import Image from 'next/image';
import siteConfig from '@/config/site';

export const metadata = {
    title: `ติดต่อเรา - ${siteConfig.name}`,
    description: 'ติดต่อ PG Mobile ร้านขายมือถือมือสอง โทร 093-564-9111 อีเมล admin@pgmobilev9.com ที่อยู่ 183 หมู่ 1 ต.คำตากล้า อ.คำตากล้า จ.สกลนคร',
    keywords: 'ติดต่อ PG Mobile, เบอร์โทร, แผนที่ร้าน, สกลนคร',
    alternates: {
        canonical: `${siteConfig.baseUrl}/contact`,
    },
};

const contactItems = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
        ),
        title: 'ที่อยู่',
        content: <p>{siteConfig.company.address}</p>,
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
        ),
        title: 'โทรศัพท์',
        content: (
            <p>
                <a href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`}>
                    {siteConfig.company.phone}
                </a>
            </p>
        ),
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
        ),
        title: 'อีเมล',
        content: (
            <p>
                <a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a>
            </p>
        ),
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.52 4.5 10.02 10 10.02s10-4.5 10-10.02C22 6.53 17.5 2.04 12 2.04zM16.5 12.06h-3.01v6h-3v-6H8.5v-3h2v-2.13c0-1.57.8-2.37 2.49-2.37h2.01v3h-1.5c-.31 0-.49.16-.49.51v1.99h2l-.25 3z" />
            </svg>
        ),
        title: 'Facebook',
        content: (
            <p>
                <a href={siteConfig.social.facebookPage} target="_blank" rel="noopener noreferrer">
                    PG Mobiles
                </a>
            </p>
        ),
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,.5C5.66.5.5,4.95.5,10.42c0,4.9,4.34,9,10.23,9.78.4.09.94.27,1.08.61.12.31.08.79.04,1.1l-.17,1c-.05.29-.22,1.16,1.01.63,1.23-.53,6.65-3.92,9.08-6.71h0C23.23,14.8,24,12.69,24,10.42,24,4.95,18.34.5,12,.5Z" />
            </svg>
        ),
        title: 'LINE',
        content: (
            <p>
                <a href={siteConfig.social.line} target="_blank" rel="noopener noreferrer">
                    {siteConfig.social.lineId}
                </a>
            </p>
        ),
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
        ),
        title: 'เวลาทำการ',
        content: <p>{siteConfig.businessHours}</p>,
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4H4V7h4v6h2V7h2v6h2V7h2v10h-2v-4z" />
            </svg>
        ),
        title: 'ข้อมูลบริษัท',
        content: (
            <>
                <p>{siteConfig.company.name}</p>
                <p>เลขทะเบียน: {siteConfig.company.registration}</p>
            </>
        ),
    },
];

export default function ContactPage() {
    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>ติดต่อเรา</h1>
                    <p>พร้อมให้บริการตอบคำถามทุกวัน 09:00 - 21:00 น.</p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            {contactItems.map((item, index) => (
                                <div key={index} className="contact-item">
                                    <div className="contact-icon">{item.icon}</div>
                                    <div className="contact-text">
                                        <h4>{item.title}</h4>
                                        {item.content}
                                    </div>
                                </div>
                            ))}

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4H4V7h4v6h2V7h2v6h2V7h2v10h-2v-4z" />
                                    </svg>
                                </div>
                                <div className="contact-text">
                                    <h4>ใบทะเบียนพาณิชย์</h4>
                                    <a href="/images/Commercial-registration.jpg" target="_blank">
                                        <Image
                                            src="/images/Commercial-registration.jpg"
                                            alt="ใบทะเบียนพาณิชย์"
                                            width={150}
                                            height={100}
                                            style={{ borderRadius: '8px', marginTop: '5px' }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="map-container">
                            <iframe
                                title="แผนที่ร้าน PG Mobile"
                                src={siteConfig.googleMaps.embedUrl}
                                width="100%"
                                height="300"
                                style={{ border: 0, borderRadius: '12px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <h2>ต้องการสอบถามเพิ่มเติม?</h2>
                    <p>โทรหาเราได้ทันที เรายินดีให้บริการ!</p>
                    <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                        <a
                            href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`}
                            className="btn btn-primary"
                        >
                            โทรเลย {siteConfig.company.phone}
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
