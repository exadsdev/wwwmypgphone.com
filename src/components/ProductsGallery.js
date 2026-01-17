import Image from 'next/image';

const galleryImages = [
    { src: '/images/pg3.jpg', alt: 'มือถือมือสอง รุ่น 1' },
    { src: '/images/pg4.jpg', alt: 'มือถือมือสอง รุ่น 2' },
    { src: '/images/pg5.jpg', alt: 'มือถือมือสอง รุ่น 3' },
    { src: '/images/pg6.jpg', alt: 'มือถือมือสอง รุ่น 4' },
    { src: '/images/pg7.jpg', alt: 'มือถือมือสอง รุ่น 5' },
    { src: '/images/pg8.jpg', alt: 'มือถือมือสอง รุ่น 6' },
    { src: '/images/pg9.jpg', alt: 'มือถือมือสอง รุ่น 7' },
    { src: '/images/pg10.jpg', alt: 'มือถือมือสอง รุ่น 8' },
];

export default function ProductsGallery() {
    return (
        <section id="products" className="section">
            <div className="container">
                <h2 className="section-title">สินค้า<span>แนะนำ</span></h2>
                <div className="gallery-grid">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="gallery-item">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={300}
                                height={300}
                                loading="lazy"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '18px', opacity: 0.9, lineHeight: 1.8 }}>
                    <strong>หมายเหตุ:</strong> ภาพสินค้าเป็นตัวอย่าง/อัปเดตตามสต็อคจริง
                    สนใจรุ่นไหนทักแชทเพื่อเช็คราคาและสภาพเครื่องได้ทันที
                </div>
            </div>
        </section>
    );
}
