'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * VisitorTracker Component
 * เก็บข้อมูลผู้เยี่ยมชมเหมือนระบบ PHP (tracker.php)
 * 
 * ข้อมูลที่เก็บ:
 * - time: เวลา (ISO format)
 * - ip: IP address (จาก API)
 * - userAgent: Browser/device info
 * - referer: มาจาก URL ไหน
 * - url: หน้าที่เข้าชม
 * - path: path ของหน้า
 * - visitorType: human/bot
 */

const MAX_VISITS = 2000; // จำนวนสูงสุดที่เก็บ (เหมือน PHP)
const MAX_CLICKS = 2000;

export default function VisitorTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // ไม่ track หน้า admin
        if (pathname.startsWith('/admin')) return;

        const trackVisit = async () => {
            try {
                const response = await fetch('/api/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        url: window.location.href,
                        path: pathname,
                        referer: document.referrer,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.visit) {
                        // เก็บใน localStorage
                        saveVisit(data.visit);
                    }
                }
            } catch (error) {
                console.error('Track visit error:', error);
            }
        };

        // Track เมื่อ page load
        trackVisit();
    }, [pathname]);

    return null; // Component นี้ไม่ render อะไร
}

// Helper functions สำหรับ localStorage
function saveVisit(visit) {
    try {
        const visits = getVisits();
        visits.push(visit);

        // จำกัดจำนวน (เหมือน PHP MAX_STORE_ROWS)
        if (visits.length > MAX_VISITS) {
            visits.splice(0, visits.length - MAX_VISITS);
        }

        localStorage.setItem('siteVisits', JSON.stringify(visits));
    } catch (e) {
        console.error('Error saving visit:', e);
    }
}

export function getVisits() {
    try {
        const data = localStorage.getItem('siteVisits');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

export function clearVisits() {
    localStorage.removeItem('siteVisits');
}

export function getClicks() {
    try {
        const data = localStorage.getItem('siteClicks');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

export function clearClicks() {
    localStorage.removeItem('siteClicks');
}

export function saveClick(target, extra = {}) {
    try {
        const clicks = getClicks();
        clicks.push({
            time: new Date().toISOString(),
            target,
            url: window.location.href,
            path: window.location.pathname,
            referer: document.referrer,
            visitorType: 'human', // Click จาก browser = human
            ...extra,
        });

        // จำกัดจำนวน
        if (clicks.length > MAX_CLICKS) {
            clicks.splice(0, clicks.length - MAX_CLICKS);
        }

        localStorage.setItem('siteClicks', JSON.stringify(clicks));
    } catch (e) {
        console.error('Error saving click:', e);
    }
}

// นับ human/bot (เหมือน count_types ใน PHP)
export function countTypes(rows) {
    let human = 0;
    let bot = 0;

    rows.forEach(row => {
        if (row.visitorType === 'bot') {
            bot++;
        } else {
            human++;
        }
    });

    return { human, bot, total: human + bot };
}

// ดึงข้อมูลล่าสุด (เหมือน latest_rows ใน PHP)
export function getLatestRows(rows, limit = 200) {
    if (!Array.isArray(rows)) return [];
    return rows.slice(-limit).reverse();
}
