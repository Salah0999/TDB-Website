/**
 * Hero Component (src/components/home/Hero.js)
 * Clean, single-responsibility Hero module for The Daily Basket (TDB) Lean MVP
 */

function renderHero(lang = 'en') {
  const isAr = lang === 'ar';

  const content = {
    ar: {
      badge: "موزع معتمد • متجر الجملة المباشر",
      headline: "كبار العلامات التجارية والسلع الغذائية.. بسعر الجملة المباشر.",
      subheadline: "تأمين احتياجاتك من أجود المنتجات الغذائية والمشروبات بأسعار المصنع، مباشرةً من الوكلاء والموزعين المعتمدين.",
      ctaBeverages: "تسوق المشروبات",
      ctaChocolates: "تسوق الشوكولاتة"
    },
    en: {
      badge: "DIRECT DISTRIBUTOR • WHOLESALE MVP",
      headline: "Top Grocery Brands & Premium Packaged Goods at Direct Wholesale Prices.",
      subheadline: "Direct-from-distributor pricing on premium food brands, beverages, and packaged goods, sourced directly from official brand channels.",
      ctaBeverages: "Shop Beverages",
      ctaChocolates: "Shop Chocolates"
    }
  };

  const data = isAr ? content.ar : content.en;

  return `
    <section id="home" class="hero-section">
      <div class="hero-bg-accent hero-bg-accent-1"></div>
      <div class="hero-bg-accent hero-bg-accent-2"></div>

      <div class="container hero-grid">
        <div class="hero-content-col">
          <div class="hero-badge-pill">
            <span class="pulse-dot"></span>
            <span data-i18n="heroBadge">${data.badge}</span>
          </div>

          <h1 class="hero-headline" data-i18n="heroHeadline">
            ${data.headline}
          </h1>

          <p class="hero-subheadline" data-i18n="heroSubheadline">
            ${data.subheadline}
          </p>

          <div class="hero-cta-group">
            <a href="#catalog" class="btn-primary-cream" data-nav-category="beverages">
              <span data-i18n="heroShopBeverages">${data.ctaBeverages}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </a>
            <a href="#catalog" class="btn-secondary-outline" data-nav-category="chocolates">
              <span data-i18n="heroShopChocolates">${data.ctaChocolates}</span>
            </a>
          </div>

          <div class="hero-trust-metrics">
            <div class="trust-metric-item">
              <span class="trust-metric-number">4.9 ★</span>
              <span class="trust-metric-label" data-i18n="ratingHomes">${isAr ? 'من أكثر من ٨,٥٠٠ عائلة ومقهى' : 'from 8,500+ happy households & cafes'}</span>
            </div>
            <div class="trust-metric-item">
              <span class="trust-metric-number" data-i18n="savingsStat">${isAr ? 'وفر حتى ٣٠٪' : 'Save up to 30%'}</span>
              <span class="trust-metric-label" data-i18n="savingsSub">${isAr ? 'مقارنة بأسعار التجزئة في السوبرماركت' : 'vs supermarket retail prices'}</span>
            </div>
            <div class="trust-metric-item">
              <span class="trust-metric-number">100%</span>
              <span class="trust-metric-label" data-i18n="boxFreshness">${isAr ? 'منتجات أصلية ١٠٠٪ مضمونة' : 'Guaranteed Original Brands'}</span>
            </div>
          </div>
        </div>

        <div class="hero-card-showcase">
          <div class="hero-featured-card">
            <div class="hero-image-wrap">
              <span class="hero-card-badge" data-i18n="boxPreviewTitle">${isAr ? 'كرتونة المشروبات المميزة' : 'Featured Beverage Carton'}</span>
              <img src="https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80" alt="Red Bull Energy Drink Carton" />
              <div class="floating-freshness-pill">
                <span class="pulse-dot"></span>
                <span data-i18n="boxFreshness">${isAr ? 'منتجات أصلية ١٠٠٪ مضمونة' : 'Guaranteed 100% Original'}</span>
              </div>
            </div>

            <div class="hero-card-header">
              <div>
                <h2 class="hero-card-title">${isAr ? 'كرتونة مشروب الطاقة ريد بُل (٢٤ كانز)' : 'Red Bull Energy Drink (Pack/Carton)'}</h2>
                <div style="font-size: 0.78rem; color: var(--tdb-border); margin-top: 0.2rem;">${isAr ? 'الموزع المعتمد المباشر' : 'Authorized Red Bull Beverage Distributor'}</div>
              </div>
              <div class="hero-card-price">$34.00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

if (typeof exports !== 'undefined') {
  exports.renderHero = renderHero;
}
if (typeof window !== 'undefined') {
  window.renderHero = renderHero;
}
