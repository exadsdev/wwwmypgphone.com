import Image from 'next/image';
import Link from 'next/link';
import siteConfig from '@/config/site';
import reviews from '@/data/reviews';
import faqItems from '@/data/faq';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import PromoSection from '@/components/PromoSection';
import ProductsGallery from '@/components/ProductsGallery';
import ReviewsSection from '@/components/ReviewsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import TopProductsBanner from '@/components/TopProductsBanner';


export const metadata = {
  title: 'PG Mobile - แหล่งรวมมือถือมือสอง สภาพนางฟ้า ราคาถูก รับประกันทุกเครื่อง',
  description: 'ร้านมือถือมือสอง PG Mobile ขายโทรศัพท์มือสองคัดเกรด สภาพสวย 100% ราคาถูกกว่าช็อป รับประกันการใช้งาน ส่งฟรีทั่วไทย มีเก็บเงินปลายทาง ผ่อนสบาย',
  keywords: 'มือถือมือสอง, โทรศัพท์มือสอง, มือถือหลุดจำนำ, iPhone มือสอง, มือถือราคาถูก, ผ่อนมือถือ, ร้านมือถือสกลนคร, PG Mobile, ส่งฟรี',
  alternates: {
    canonical: siteConfig.baseUrl,
  },
};

// JSON-LD Schemas
function generateSchemas() {
  return {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.baseUrl,
      logo: `${siteConfig.baseUrl}${siteConfig.images.logo}`,
      contactPoint: [{
        '@type': 'ContactPoint',
        telephone: '+66-93-564-9111',
        contactType: 'sales',
        areaServed: 'TH',
        availableLanguage: ['Thai'],
      }],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '183 หมู่ที่ 1',
        addressLocality: 'คำตากล้า',
        addressRegion: 'สกลนคร',
        postalCode: '47250',
        addressCountry: 'TH',
      },
      sameAs: [
        siteConfig.social.facebook,
        siteConfig.social.facebookPage,
        siteConfig.social.line,
      ],
    },
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      image: `${siteConfig.baseUrl}${siteConfig.images.ogImage}`,
      url: siteConfig.baseUrl,
      telephone: '+66-93-564-9111',
      email: siteConfig.company.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '183 หมู่ที่ 1 ตำบลคำตากล้า',
        addressLocality: 'อำเภอคำตากล้า',
        addressRegion: 'สกลนคร',
        postalCode: '47250',
        addressCountry: 'TH',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.googleMaps.latitude,
        longitude: siteConfig.googleMaps.longitude,
      },
      priceRange: '฿฿',
      openingHours: 'Mo-Su 09:00-21:00',
    },
  };
}

export default function HomePage() {
  const schemas = generateSchemas();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.localBusiness) }}
      />

      <TopProductsBanner />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PromoSection />
      <ProductsGallery />
      <ReviewsSection reviews={reviews} />
      <ServicesSection faqItems={faqItems.slice(0, 5)} />
      <ContactSection />
      <CTASection />
    </>
  );
}
