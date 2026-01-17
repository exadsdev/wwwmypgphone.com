'use client';

import { useState } from 'react';
import siteConfig from '@/config/site';

export default function ServicesSection({ faqItems = [] }) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="section section-alt">
            <div className="container">
                <h2 className="section-title">บริการ<span>ของเรา</span></h2>

                <div className="features-grid">
                    <div className="feature-card">
                        <h3 style={{ marginTop: 0 }}>การรับประกันสินค้า</h3>
                        <p style={{ lineHeight: 1.8, margin: '10px 0 0' }}>
                            รับประกัน 30 วัน (ตามเงื่อนไขร้าน) หากมีปัญหาการใช้งานจากการใช้งานปกติ
                            สามารถติดต่อทีมงานเพื่อช่วยตรวจสอบและแนะนำแนวทางได้ทันที
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3 style={{ marginTop: 0 }}>การจัดส่งและความปลอดภัย</h3>
                        <p style={{ lineHeight: 1.8, margin: '10px 0 0' }}>
                            แพ็คกันกระแทกอย่างดี พร้อมตรวจสภาพก่อนส่งทุกเครื่อง
                            จัดส่งทั่วประเทศ ใช้เวลาประมาณ 1-3 วัน (ขึ้นอยู่กับพื้นที่)
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3 style={{ marginTop: 0 }}>การชำระเงิน</h3>
                        <p style={{ lineHeight: 1.8, margin: '10px 0 0' }}>
                            รองรับการชำระเงินหลากหลาย: โอนเงิน / เก็บเงินปลายทาง (แล้วแต่เงื่อนไข)
                            ต้องการผ่อนชำระสามารถทักสอบถามรุ่นที่ร่วมรายการได้
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3 style={{ marginTop: 0 }}>บริการหลังการขาย</h3>
                        <p style={{ lineHeight: 1.8, margin: '10px 0 0' }}>
                            ทีมงานช่วยแนะนำการใช้งาน ตั้งค่าเครื่อง โอนย้ายข้อมูลเบื้องต้น
                            และแนะนำอุปกรณ์เสริมให้เหมาะกับรุ่นของลูกค้า
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '18px' }}>
                    <div className="feature-card">
                        <h3 className="mb-3">คำถามที่พบบ่อย (FAQ)</h3>

                        <div className="accordion">
                            {faqItems.map((item, index) => (
                                <div key={index} className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                        >
                                            {item.question}
                                            <span>{openIndex === index ? '−' : '+'}</span>
                                        </button>
                                    </h2>
                                    {openIndex === index && (
                                        <div className="accordion-body">{item.answer}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '12px', fontSize: '0.9rem', opacity: 0.8 }}>
                            หากยังไม่เจอคำตอบที่ต้องการ สามารถติดต่อเราได้ทาง{' '}
                            <a href={siteConfig.social.line} target="_blank" rel="noopener noreferrer">
                                LINE
                            </a>{' '}
                            หรือ{' '}
                            <a href={siteConfig.social.facebookPage} target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                        </div>
                    </div>

                    <div className="feature-card" style={{ marginTop: '18px' }}>
                        <h3 style={{ marginTop: 0 }}>รับซื้อ / เทิร์นเครื่อง (สอบถามได้)</h3>
                        <p style={{ lineHeight: 1.8, margin: '10px 0 0' }}>
                            ต้องการขายเครื่องเก่า หรืออยากเทิร์นเป็นรุ่นใหม่
                            ส่งรายละเอียดรุ่น/ความจุ/สภาพเครื่อง + รูปถ่ายมาที่ LINE หรือ Facebook
                            ทีมงานประเมินราคาให้เบื้องต้นได้
                        </p>

                        <div className="cta-buttons" style={{ marginTop: '12px' }}>
                            <a
                                href={siteConfig.social.line}
                                className="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ส่งรูปประเมินทาง LINE
                            </a>
                            <a
                                href={siteConfig.social.facebookPage}
                                className="btn btn-outline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ส่งรูปทาง Facebook
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
