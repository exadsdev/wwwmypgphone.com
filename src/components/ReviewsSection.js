import Image from 'next/image';
import siteConfig from '@/config/site';

export default function ReviewsSection({ reviews = [] }) {
    const renderStars = (rating) => {
        return Array.from({ length: rating }, (_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        ));
    };

    return (
        <section className="section" id="reviews">
            <div className="container">
                <h2 className="section-title">รีวิวจาก<span>ลูกค้าจริง</span></h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', opacity: 0.85 }}>
                    ความคิดเห็นจากลูกค้าที่ซื้อ PG V9 กับเรา
                </p>

                <div className="features-grid">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-img-wrapper">
                                <Image
                                    src={review.image}
                                    alt="รีวิวจากลูกค้า"
                                    width={400}
                                    height={220}
                                    loading="lazy"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="review-content">
                                <div className="review-stars">{renderStars(review.rating)}</div>
                                <span className="review-product">{review.product}</span>
                                <p className="review-text">&quot;{review.text}&quot;</p>
                                <div className="review-meta">
                                    📍 {review.province} | {review.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(255,255,255,0.2)' }}>
                    <p style={{ opacity: 0.8, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                        ⚠️ ผลลัพธ์ขึ้นอยู่กับรุ่นสินค้าและเงื่อนไขการรับประกันของร้าน
                    </p>
                    <p style={{ opacity: 0.85 }}>
                        อยากดูรีวิวเพิ่ม?{' '}
                        <a
                            href={siteConfig.social.facebookPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontWeight: 600 }}
                        >
                            ไปที่ Facebook Page
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
