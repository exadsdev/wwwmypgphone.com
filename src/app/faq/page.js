'use client';

import { useState } from 'react';
import siteConfig from '@/config/site';
import faqItems from '@/data/faq';

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState(0);

    const filteredFaq = faqItems.filter(
        (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Generate FAQ Schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>คำถามที่พบบ่อย (FAQ)</h1>
                    <p>รวมคำตอบสำหรับคำถามยอดนิยมจากลูกค้า</p>
                </div>
            </section>

            {/* Search */}
            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="🔍 พิมพ์คำค้นหา..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ textAlign: 'center', fontSize: '1.1rem' }}
                        />
                    </div>

                    {/* FAQ List */}
                    <div className="accordion" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {filteredFaq.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.7 }}>
                                ไม่พบคำถามที่ตรงกับคำค้นหา
                            </div>
                        ) : (
                            filteredFaq.map((item, index) => (
                                <div key={index} className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                            aria-expanded={openIndex === index}
                                        >
                                            {item.question}
                                            <span style={{ fontSize: '1.5rem' }}>
                                                {openIndex === index ? '−' : '+'}
                                            </span>
                                        </button>
                                    </h2>
                                    {openIndex === index && (
                                        <div className="accordion-body">{item.answer}</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Contact */}
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <p style={{ opacity: 0.8, marginBottom: '1rem' }}>
                            หากยังไม่เจอคำตอบที่ต้องการ สามารถติดต่อเราได้
                        </p>
                        <div className="cta-buttons" style={{ justifyContent: 'center' }}>
                            <a
                                href={siteConfig.social.line}
                                className="btn btn-primary"
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
