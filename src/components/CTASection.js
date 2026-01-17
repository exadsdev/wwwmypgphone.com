import Link from 'next/link';
import siteConfig from '@/config/site';

export default function CTASection() {
    return (
        <section className="cta-section">
            <div className="container">
                <h2>พร้อมสั่งซื้อมือถือคุณภาพดีแล้วหรือยัง?</h2>
                <p>ติดต่อเราวันนี้ รับส่วนลดพิเศษสำหรับลูกค้าใหม่!</p>
                <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                    <a
                        href={`tel:${siteConfig.company.phone.replace(/-/g, '')}`}
                        className="btn btn-primary"
                    >
                        โทรสั่งซื้อ {siteConfig.company.phone}
                    </a>
                    <a
                        href={siteConfig.social.line}
                        className="btn btn-outline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ทัก LINE
                    </a>
                    <a
                        href={siteConfig.social.facebookPage}
                        className="btn btn-outline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ทัก Facebook
                    </a>
                    <Link href="/contact" className="btn btn-outline">
                        หน้าติดต่อเรา
                    </Link>
                </div>
            </div>
        </section>
    );
}
