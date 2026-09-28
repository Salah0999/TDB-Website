/**
 * Footer Component (src/components/common/Footer.js)
 * Clean, single-responsibility footer module for Lean MVP
 */

function renderFooter(lang = 'en') {
  const isAr = lang === 'ar';
  return `
    <footer id="about" class="site-footer">
      <div class="container">
        <div class="footer-top-grid">
          <!-- Brand Column -->
          <div class="footer-brand-col">
            <a href="#home" class="tdb-logo-lockup tdb-logo--reversed" aria-label="The Daily Basket Home">
              <div class="tdb-monogram">TDB</div>
              <div class="tdb-text tdb-text-group">
                <span class="tdb-name tdb-brand-name">THE DAILY BASKET</span>
                <span class="tdb-tag tdb-arabic-tagline">ما تحتاجه كل يوم</span>
              </div>
            </a>
            <p class="footer-tagline-text" data-i18n="footerAbout">
              ${isAr 
                ? 'ذا ديلي باسكت (TDB) شريكك لتوريد مشروبات الطاقة والحلويات الأصلية من الوكلاء المعتمدين بأسعار الجملة المباشرة.' 
                : 'The Daily Basket (TDB) is your wholesale distributor partner delivering original beverages, energy drinks, and premium chocolates at direct-to-consumer bulk prices.'}
            </p>
            <div class="social-links-row">
              <a href="#" class="social-icon-btn" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" class="social-icon-btn" aria-label="Twitter">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" class="social-icon-btn" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <!-- Quick Store Categories -->
          <div>
            <h4 class="footer-heading" data-i18n="footerLinksHeader">${isAr ? 'فئات المتجر' : 'Store Categories'}</h4>
            <ul class="footer-nav-list">
              <li><a href="#home" class="footer-nav-link" data-i18n="navHome">${isAr ? 'الرئيسية' : 'Home'}</a></li>
              <li><a href="#catalog" class="footer-nav-link" data-nav-category="beverages" data-i18n="navBeverages">${isAr ? 'المشروبات' : 'Beverages'}</a></li>
              <li><a href="#catalog" class="footer-nav-link" data-nav-category="chocolates" data-i18n="navChocolates">${isAr ? 'الشوكولاتة' : 'Chocolates'}</a></li>
              <li><a href="javascript:void(0)" class="footer-nav-link" id="footerCartLink" data-i18n="navCart">${isAr ? 'سلة المشتريات' : 'Shopping Cart'}</a></li>
            </ul>
          </div>

          <!-- Wholesale Guarantee -->
          <div>
            <h4 class="footer-heading" data-i18n="footerGuaranteeHeader">${isAr ? 'ضمان الجملة' : 'Wholesale Guarantee'}</h4>
            <ul class="footer-nav-list">
              <li><span class="footer-nav-link">✓ ${isAr ? 'وكلاء وموزعون معتمدون' : 'Authorized Brand Distributors'}</span></li>
              <li><span class="footer-nav-link">✓ ${isAr ? 'كراتين مغلفة من المصنع' : 'Factory Sealed Wholesale Cartons'}</span></li>
              <li><span class="footer-nav-link">✓ ${isAr ? 'حد أدنى منخفض للطلب (MOQ)' : 'Low MOQ for Families & Small Shops'}</span></li>
              <li><span class="footer-nav-link">✓ ${isAr ? 'توصيل مبرد سريع ومجاني' : 'Chilled Rapid Delivery'}</span></li>
            </ul>
          </div>

          <!-- Wholesale Deal Alert -->
          <div>
            <h4 class="footer-heading" data-i18n="newsletterTitle">${isAr ? 'تنبيهات عروض الجملة' : 'Wholesale Price Alerts'}</h4>
            <p style="font-size: 0.82rem; color: var(--tdb-border); line-height: 1.5;" data-i18n="newsletterSubtitle">
              ${isAr 
                ? 'اشترك لتصلك أسعار كراتين المشروبات والشوكولاتة وتنبيهات الخصومات الحصرية أولاً بأول.' 
                : 'Subscribe for new beverage drops, chocolate carton discounts, and restock notifications.'}
            </p>
            <form id="newsletterForm" class="newsletter-form">
              <input type="email" id="newsletterInput" class="newsletter-input" placeholder="${isAr ? 'أدخل بريدك الإلكتروني...' : 'Enter your email...'}" required />
              <button type="submit" class="newsletter-submit-btn" data-i18n="subscribeBtn">${isAr ? 'اشتراك' : 'Subscribe'}</button>
            </form>
            <div id="newsletterMsg" class="newsletter-status-msg"></div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom-bar">
          <span data-i18n="rightsReserved">© 2026 The Daily Basket Co. (TDB). All rights reserved.</span>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#" class="footer-nav-link">${isAr ? 'شروط الجملة' : 'Wholesale Terms'}</a>
            <a href="#" class="footer-nav-link">${isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            <a href="#" class="footer-nav-link">${isAr ? 'ضمان الموزع' : 'Distributor Guarantee'}</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

if (typeof exports !== 'undefined') {
  exports.renderFooter = renderFooter;
}
if (typeof window !== 'undefined') {
  window.renderFooter = renderFooter;
}
