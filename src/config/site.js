/**
 * PG Mobile - Site Configuration
 * ไฟล์กำหนดค่าสำหรับทั้งเว็บไซต์
 * 
 * ค่าที่สามารถแก้ไขผ่าน .env:
 * - NEXT_PUBLIC_BASE_URL
 * - NEXT_PUBLIC_SITE_NAME
 * - NEXT_PUBLIC_PHONE
 * - NEXT_PUBLIC_EMAIL
 * - NEXT_PUBLIC_LINE_URL
 * - NEXT_PUBLIC_LINE_ID
 * - NEXT_PUBLIC_FACEBOOK_URL
 * - NEXT_PUBLIC_GOOGLE_TAG_ID
 */

const siteConfig = {
  // Base URL - อ่านจาก .env หรือใช้ค่า default
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://pgmobilev9.com',

  // Site Info
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'PG Mobile',
  tagline: 'ร้านขายมือถือมือสอง คุณภาพดี ราคาถูก',
  description: 'PG Mobile ร้านขายมือถือมือสอง คุณภาพดี ราคาถูก รับประกันสินค้าทุกเครื่อง ส่งฟรีทั่วประเทศ',

  // Company Info
  company: {
    name: 'PG MOBILE LIMITED PARTNERSHIP',
    nameTh: 'ห้างหุ้นส่วนจำกัด พีจี โมบาย',
    address: '183 หมู่ที่ 1 ตำบลคำตากล้า อำเภอคำตากล้า จ.สกลนคร 47250',
    registration: '0473560000846',
    phone: process.env.NEXT_PUBLIC_PHONE || '093-564-9111',
    email: process.env.NEXT_PUBLIC_EMAIL || 'admin@pgmobilev9.com',
  },

  // Social Media
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/pgmobilev9',
    facebookPage: 'https://www.facebook.com/pgmobiles',
    line: process.env.NEXT_PUBLIC_LINE_URL || 'https://lin.ee/EAtjlIe',
    lineId: process.env.NEXT_PUBLIC_LINE_ID || '@pgmobile',
  },

  // Image Paths
  images: {
    basePath: '/images/',
    favicon: '/images/favicon.ico',
    logo: '/images/logo.png',
    ogImage: '/images/og-main.png',
  },

  // Google Maps
  googleMaps: {
    latitude: 17.851683889262585,
    longitude: 103.761095975818,
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.7215419938907!2d103.761095975818!3d17.851683889262585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313b470030665087%3A0x8119614a066b6a61!2spg%20mobile!5e0!3m2!1sth!2sth!4v1767750733748!5m2!1sth!2sth',
  },

  // Business Hours
  businessHours: 'ทุกวัน 09:00 - 21:00',

  // Admin Credentials
  admin: {
    username: 'admin',
    password: '1122',
  },

  // Google Analytics / Ads
  googleTagId: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || '',
};

export default siteConfig;
