export default function StatsSection() {
    const stats = [
        { number: '5,000+', label: 'เครื่องที่ขายไปแล้ว' },
        { number: '98%', label: 'ลูกค้าพึงพอใจ' },
        { number: '5+', label: 'ปีประสบการณ์' },
        { number: '24/7', label: 'บริการตอบแชท' },
    ];

    return (
        <section className="section">
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
    );
}
