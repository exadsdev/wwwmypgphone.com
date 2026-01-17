import Link from 'next/link';
import siteConfig from '@/config/site';

export const metadata = {
    title: `404 - ไม่พบหน้าที่ต้องการ | ${siteConfig.name}`,
    description: 'ขออภัย ไม่พบหน้าที่คุณต้องการ กรุณากลับไปหน้าหลัก หรือติดต่อเราหากต้องการความช่วยเหลือ',
};

export default function NotFound() {
    return (
        <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container">
                <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🔍</div>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
                <h2 style={{ marginBottom: '1rem', opacity: 0.9 }}>ไม่พบหน้าที่ต้องการ</h2>
                <p style={{ opacity: 0.7, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                    ขออภัย หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่
                    กรุณากลับไปหน้าหลัก หรือติดต่อเราหากต้องการความช่วยเหลือ
                </p>
                <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                    <Link href="/" className="btn btn-primary">
                        กลับหน้าแรก
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                        ติดต่อเรา
                    </Link>
                </div>
            </div>
        </section>
    );
}
