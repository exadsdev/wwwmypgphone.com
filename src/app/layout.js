import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingLineButton from '@/components/FloatingLineButton';
import VisitorTracker from '@/components/VisitorTracker';
import siteConfig from '@/config/site';

export const metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: 'มือถือมือสอง, โทรศัพท์มือสอง, มือถือหลุดจำนำ, iPhone มือสอง, มือถือราคาถูก, ผ่อนมือถือ, ร้านมือถือสกลนคร, PG Mobile, ส่งฟรี',
  authors: [{ name: siteConfig.company.name }],
  creator: siteConfig.company.name,
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.baseUrl}${siteConfig.images.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [`${siteConfig.baseUrl}${siteConfig.images.ogImage}`],
  },
  icons: {
    icon: siteConfig.images.favicon,
    apple: siteConfig.images.logo,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" />
      </head>
      <body>
        <VisitorTracker />
        <a href="#main-content" className="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <FloatingLineButton />
      </body>
    </html>
  );
}
