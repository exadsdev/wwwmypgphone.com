/**
 * Visit Tracking API Route
 * บันทึกข้อมูลผู้เยี่ยมชมเหมือนระบบ PHP (tracker.php)
 * 
 * เก็บข้อมูล:
 * - time: เวลา (ISO format)
 * - ip: IP address
 * - userAgent: Browser/device info
 * - referer: มาจาก URL ไหน
 * - url: หน้าที่เข้าชม
 * - visitorType: human/bot
 */

import { NextResponse } from 'next/server';

// Bot detection keywords (เหมือน PHP)
const BOT_KEYWORDS = [
    'bot', 'crawl', 'spider', 'slurp', 'bingpreview', 'facebookexternalhit',
    'googlebot', 'bingbot', 'yandex', 'duckduckbot', 'baiduspider', 'ahrefs',
    'semrush', 'mj12bot', 'dotbot', 'crawler', 'uptimerobot', 'headless',
    'python-requests', 'curl', 'wget', 'scrapy', 'httpclient', 'postmanruntime',
    'lighthouse', 'pagespeed', 'gtmetrix', 'telegrambot', 'discordbot', 'line'
];

function isBot(userAgent) {
    if (!userAgent) return true;
    const ua = userAgent.toLowerCase();
    return BOT_KEYWORDS.some(kw => ua.includes(kw));
}

function getClientIp(request) {
    // Check various headers for real IP (like PHP)
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    if (cfConnectingIp) return cfConnectingIp;

    const realIp = request.headers.get('x-real-ip');
    if (realIp) return realIp;

    return '0.0.0.0';
}

export async function POST(request) {
    try {
        const body = await request.json();
        const userAgent = request.headers.get('user-agent') || '';
        const acceptLanguage = request.headers.get('accept-language') || '';

        // Determine if bot (no accept-language usually means bot)
        const isBotVisitor = isBot(userAgent) || !acceptLanguage;

        const visitData = {
            time: new Date().toISOString(),
            ip: getClientIp(request),
            userAgent: userAgent,
            referer: body.referer || request.headers.get('referer') || '',
            url: body.url || '',
            path: body.path || '/',
            method: 'GET',
            visitorType: isBotVisitor ? 'bot' : 'human',
        };

        // Return the visit data for client-side storage
        // (In Next.js client app, we store in localStorage since there's no file system access)
        return NextResponse.json({
            success: true,
            visit: visitData,
            message: 'Visit tracked',
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// GET - Retrieve all visits (for admin dashboard)
export async function GET(request) {
    // This would typically read from a database
    // For demo, we return instructions for client-side storage
    return NextResponse.json({
        success: true,
        message: 'ใช้ localStorage เพื่อดูข้อมูล visits',
        storageKey: 'siteVisits',
    });
}
