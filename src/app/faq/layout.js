import siteConfig from '@/config/site';

export const metadata = {
    title: `คำถามที่พบบ่อย (FAQ) - ${siteConfig.name}`,
    description: 'รวมคำตอบสำหรับคำถามยอดนิยมเกี่ยวกับการซื้อมือถือมือสองจาก PG Mobile รับประกัน การส่ง การชำระเงิน และอื่นๆ',
    keywords: 'FAQ, คำถามที่พบบ่อย, มือถือมือสอง, รับประกัน, PG Mobile',
    alternates: {
        canonical: `${siteConfig.baseUrl}/faq`,
    },
};

export default function FAQLayout({ children }) {
    return children;
}
