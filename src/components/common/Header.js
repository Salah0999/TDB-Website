/**
 * Header Component (src/components/common/Header.js)
 * Clean, single-responsibility header module for Lean MVP
 */

export function renderHeader(lang = 'en') {
  const isAr = lang === 'ar';
  return `
    <header class="site-header">
      <div class="container header-inner">
        <!-- 1. Left / Right Mobile & Account Actions -->
        <div class="header-action-group">
          <!-- Account Icon Button -->
          <a href="#account" class="header-icon-btn account-btn" title="${isAr ? 'الحساب' : 'Account'}" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
        </div>

        <!-- 2. Brand Logo Lockup -->
        <a href="#home" class="tdb-logo-lockup tdb-logo--main" aria-label="The Daily Basket Home">
          <div class="tdb-monogram">TDB</div>
          <div class="tdb-text tdb-text-group">
            <span class="tdb-name tdb-brand-name">THE DAILY BASKET</span>
            <span class="tdb-tag tdb-arabic-tagline">${isAr ? 'كل ما تحتاجه كل يوم' : 'ما تحتاجه كل يوم'}</span>
          </div>
        </a>

        <!-- 3. Navigation Links -->
        <nav class="main-nav">
          <a href="#home" class="nav-link">${isAr ? 'الرئيسية' : 'Home'}</a>
          <a href="#beverages" class="nav-link">${isAr ? 'المشروبات' : 'Beverages'}</a>
          <a href="#chocolates" class="nav-link">${isAr ? 'الشوكولاتة' : 'Chocolates'}</a>
        </nav>

        <!-- 4. Cart Action -->
        <div class="header-cart-wrapper">
          <a href="#cart" class="header-icon-btn cart-btn" title="${isAr ? 'السلة' : 'Cart'}" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="cart-count">0</span>
          </a>
        </div>
      </div>
    </header>
  `;
}