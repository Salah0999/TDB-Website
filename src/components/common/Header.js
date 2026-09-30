/**
 * Header Component (src/components/common/Header.js)
 * Clean, single-responsibility header module for Lean MVP
 * Navbar links: Home, Beverages, Chocolates, Cart
 */

function renderHeader(lang = 'en') {
  const isAr = lang === 'ar';
  return `
    <header class="site-header">
      <div class="container header-inner">
        <!-- Brand Logo Lockup -->
        <a href="#home" class="tdb-logo-lockup tdb-logo--main" aria-label="The Daily Basket Home">
          <div class="tdb-monogram">TDB</div>
          <div class="tdb-text tdb-text-group">
            <span class="tdb-name tdb-brand-name">THE DAILY BASKET</span>
            <span class="tdb-tag tdb-arabic-tagline">ما تحتاجه كل يوم</span>
          </div>
        </a>

        <!-- Center: Streamlined 4-Link Navigation (Requirement 1) -->
        <nav aria-label="Main Navigation">
          <ul class="nav-links">
            <li><a href="#home" class="nav-link active" data-i18n="navHome">${isAr ? 'الرئيسية' : 'Home'}</a></li>
            <li><a href="#catalog" class="nav-link" data-nav-category="beverages" data-i18n="navBeverages">${isAr ? 'المشروبات' : 'Beverages'}</a></li>
            <li><a href="#catalog" class="nav-link" data-nav-category="chocolates" data-i18n="navChocolates">${isAr ? 'الشوكولاتة' : 'Chocolates'}</a></li>
            <li><a href="javascript:void(0)" class="nav-link about-link" id="navAboutLink" data-i18n="navAbout">${isAr ? 'عن TDB' : 'About Us'}</a></li>
          </ul>
        </nav>

        <!-- Right Actions: Search, Language Switcher, Cart Trigger & Mobile Toggle -->
        <div class="header-actions">
          <!-- Interactive Search Bar -->
          <div class="search-wrapper">
            <div class="search-input-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="searchInput" class="search-input" placeholder="${isAr ? 'ابحث عن ريد بُل، شوكولاتة...' : 'Search Red Bull, chocolates...'}" autocomplete="off" />
            </div>
            <!-- Live Autocomplete Dropdown -->
            <div id="searchResultsDropdown" class="search-results-dropdown"></div>
          </div>

          <!-- Language Toggle Button (EN / AR) -->
          <button id="langToggleBtn" class="lang-toggle-btn" aria-label="Switch Language">
            <span>${isAr ? 'English' : 'العربية'}</span>
          </button>

          <!-- Cart Trigger Button -->
          <button id="cartTriggerBtn" class="cart-trigger-btn" aria-label="Open Shopping Cart">
            <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span id="cartBadge" class="cart-counter-badge">0</span>
          </button>

          <!-- Mobile Nav Hamburger -->
          <button id="mobileNavToggle" class="mobile-nav-toggle" aria-label="Open Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer Menu -->
    <aside id="mobileDrawerNav" class="mobile-drawer-nav">
      <div class="mobile-drawer-header">
        <div class="tdb-logo-lockup tdb-logo--main">
          <div class="tdb-monogram">TDB</div>
          <div class="tdb-text tdb-text-group">
            <span class="tdb-name tdb-brand-name">THE DAILY BASKET</span>
          </div>
        </div>
        <button id="mobileDrawerClose" class="cart-close-btn" aria-label="Close Menu">✕</button>
      </div>
      <ul class="mobile-drawer-links">
        <li><a href="#home" class="mobile-drawer-link" data-i18n="navHome" onclick="document.getElementById('mobileDrawerNav').classList.remove('active')">${isAr ? 'الرئيسية' : 'Home'}</a></li>
        <li><a href="#catalog" class="mobile-drawer-link" data-nav-category="beverages" data-i18n="navBeverages" onclick="document.getElementById('mobileDrawerNav').classList.remove('active')">${isAr ? 'المشروبات' : 'Beverages'}</a></li>
        <li><a href="#catalog" class="mobile-drawer-link" data-nav-category="chocolates" data-i18n="navChocolates" onclick="document.getElementById('mobileDrawerNav').classList.remove('active')">${isAr ? 'الشوكولاتة' : 'Chocolates'}</a></li>
        <li><a href="javascript:void(0)" class="mobile-drawer-link" id="mobileNavAboutLink" data-i18n="navAbout" onclick="document.getElementById('mobileDrawerNav').classList.remove('active')">${isAr ? 'عن TDB' : 'About Us'}</a></li>
      </ul>
    </aside>
  `;
}

if (typeof exports !== 'undefined') {
  exports.renderHeader = renderHeader;
}
if (typeof window !== 'undefined') {
  window.renderHeader = renderHeader;
}
