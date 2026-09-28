/**
 * Hero Component (src/components/home/Hero.tsx)
 * High-converting, consumer-friendly Hero Section for The Daily Basket (TDB)
 * 2-Category Lean Store MVP Architecture
 */

import React from 'react';

export interface HeroProps {
  lang?: 'en' | 'ar';
  onSelectCategory?: (category: 'beverages' | 'chocolates') => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang = 'en',
  onSelectCategory
}) => {
  const isAr = lang === 'ar';

  const content = {
    ar: {
      badge: "موزع معتمد • متجر الجملة المباشر",
      headline: "كبار العلامات التجارية والسلع الغذائية.. بسعر الجملة المباشر.",
      subheadline: "تأمين احتياجاتك من أجود المنتجات الغذائية والمشروبات بأسعار المصنع، مباشرةً من الوكلاء والموزعين المعتمدين.",
      ctaBeverages: "تسوق المشروبات",
      ctaChocolates: "تسوق الشوكولاتة",
      ratingStat: "4.9 ★",
      ratingHomes: "من أكثر من ٨,٥٠٠ عائلة ومقهى",
      savingsStat: "وفر حتى ٣٠٪",
      savingsSub: "مقارنة بأسعار التجزئة في السوبرماركت",
      boxFreshness: "منتجات أصلية ١٠٠٪ مضمونة",
      featuredCardBadge: "كرتونة المشروبات المميزة",
      featuredCardTitle: "كرتونة مشروب الطاقة ريد بُل (٢٤ كانز)",
      featuredDistributor: "الموزع المعتمد المباشر",
      featuredPrice: "$34.00"
    },
    en: {
      badge: "DIRECT DISTRIBUTOR • WHOLESALE MVP",
      headline: "Top Grocery Brands & Premium Packaged Goods at Direct Wholesale Prices.",
      subheadline: "Direct-from-distributor pricing on premium food brands, beverages, and packaged goods, sourced directly from official brand channels.",
      ctaBeverages: "Shop Beverages",
      ctaChocolates: "Shop Chocolates",
      ratingStat: "4.9 ★",
      ratingHomes: "from 8,500+ happy households & cafes",
      savingsStat: "Save up to 30%",
      savingsSub: "vs supermarket retail prices",
      boxFreshness: "100% Guaranteed Original Brands",
      featuredCardBadge: "Featured Beverage Carton",
      featuredCardTitle: "Red Bull Energy Drink (Pack/Carton)",
      featuredDistributor: "Authorized Red Bull Beverage Distributor",
      featuredPrice: "$34.00"
    }
  };

  const data = isAr ? content.ar : content.en;

  return (
    <section id="home" className="hero-section">
      {/* Glow Gradients */}
      <div className="hero-bg-accent hero-bg-accent-1"></div>
      <div className="hero-bg-accent hero-bg-accent-2"></div>

      <div className="container hero-grid">
        {/* Hero Left Column: Headline, Badge, Subheadline, CTA Buttons & Metrics */}
        <div className="hero-content-col">
          <div className="hero-badge-pill">
            <span className="pulse-dot"></span>
            <span>{data.badge}</span>
          </div>

          <h1 className="hero-headline">
            {data.headline}
          </h1>

          <p className="hero-subheadline">
            {data.subheadline}
          </p>

          <div className="hero-cta-group">
            <a
              href="#catalog"
              className="btn-primary-cream"
              data-nav-category="beverages"
              onClick={() => onSelectCategory?.('beverages')}
            >
              <span>{data.ctaBeverages}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <a
              href="#catalog"
              className="btn-secondary-outline"
              data-nav-category="chocolates"
              onClick={() => onSelectCategory?.('chocolates')}
            >
              <span>{data.ctaChocolates}</span>
            </a>
          </div>

          {/* Trust Proof Metrics */}
          <div className="hero-trust-metrics">
            <div className="trust-metric-item">
              <span className="trust-metric-number">{data.ratingStat}</span>
              <span className="trust-metric-label">{data.ratingHomes}</span>
            </div>
            <div className="trust-metric-item">
              <span className="trust-metric-number">{data.savingsStat}</span>
              <span className="trust-metric-label">{data.savingsSub}</span>
            </div>
            <div className="trust-metric-item">
              <span className="trust-metric-number">100%</span>
              <span className="trust-metric-label">{data.boxFreshness}</span>
            </div>
          </div>
        </div>

        {/* Hero Right Column: Featured Beverage Carton Showcase */}
        <div className="hero-card-showcase">
          <div className="hero-featured-card">
            <div className="hero-image-wrap">
              <span className="hero-card-badge">{data.featuredCardBadge}</span>
              <img
                src="https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80"
                alt="Red Bull Energy Drink Carton"
              />
              <div className="floating-freshness-pill">
                <span className="pulse-dot"></span>
                <span>{data.boxFreshness}</span>
              </div>
            </div>

            <div className="hero-card-header">
              <div>
                <h2 className="hero-card-title">{data.featuredCardTitle}</h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--tdb-border)', marginTop: '0.2rem' }}>
                  {data.featuredDistributor}
                </div>
              </div>
              <div className="hero-card-price">{data.featuredPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
