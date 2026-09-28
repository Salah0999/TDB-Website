/**
 * The Daily Basket (TDB) - Main Application Logic
 * Lean 2-Category Store MVP Architecture
 * Driven by modular components in src/components/
 */

(function () {
  'use strict';

  // Application State
  const state = {
    lang: localStorage.getItem('tdb_lang') || 'en',
    cart: JSON.parse(localStorage.getItem('tdb_cart') || '[]'),
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    appliedPromo: null,
    freeShippingThreshold: 45.00,
    checkoutStep: 1
  };

  /* ==========================================================================
     INIT APPLICATION & COMPONENT MOUNTING
     ========================================================================== */
  function init() {
    mountComponents();
    applyLanguage(state.lang);
    bindEvents();
    updateCartUI();
  }

  function mountComponents() {
    // 1. Mount Header
    const headerMount = document.getElementById('headerMount');
    if (headerMount && typeof window.renderHeader === 'function') {
      headerMount.innerHTML = window.renderHeader(state.lang);
    }

    // 2. Mount Category Spotlight
    renderCategorySpotlight();

    // 3. Mount Catalog Grid
    renderCatalog();

    // 4. Mount Cart Drawer
    renderCartDrawerMount();

    // 5. Mount Checkout Modal
    const checkoutMount = document.getElementById('checkoutModalMount');
    if (checkoutMount && typeof window.renderCheckoutModal === 'function') {
      checkoutMount.innerHTML = window.renderCheckoutModal(state.lang);
    }

    // 6. Mount Footer
    const footerMount = document.getElementById('footerMount');
    if (footerMount && typeof window.renderFooter === 'function') {
      footerMount.innerHTML = window.renderFooter(state.lang);
    }
  }

  /* ==========================================================================
     RENDERERS USING SRC/COMPONENTS
     ========================================================================== */
  function renderCategorySpotlight() {
    const container = document.getElementById('categorySpotlightGrid');
    if (!container || !window.CATEGORIES_DATA) return;

    container.innerHTML = window.CATEGORIES_DATA.map(category => {
      if (typeof window.renderCategoryCard === 'function') {
        return window.renderCategoryCard(category, state.lang);
      }
      return '';
    }).join('');
  }

  function renderCatalog() {
    const container = document.getElementById('catalogGrid');
    if (!container || !window.PRODUCTS_DATA) return;

    if (typeof window.renderCatalogGrid === 'function') {
      container.innerHTML = window.renderCatalogGrid(
        window.PRODUCTS_DATA,
        state.activeCategory,
        state.sortBy,
        state.lang
      );
      bindCatalogEvents();
    }
  }

  function renderCartDrawerMount() {
    const container = document.getElementById('cartDrawerMount');
    if (!container || !window.PRODUCTS_DATA) return;

    if (typeof window.renderCartDrawer === 'function') {
      container.innerHTML = window.renderCartDrawer(
        state.cart,
        window.PRODUCTS_DATA,
        state.appliedPromo,
        state.lang,
        state.freeShippingThreshold
      );
      bindCartDrawerEvents();
    }
  }

  /* ==========================================================================
     EVENT BINDINGS
     ========================================================================== */
  function bindEvents() {
    // Header Scroll Shadow
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

    // Language Toggle
    document.addEventListener('click', (e) => {
      const langBtn = e.target.closest('#langToggleBtn');
      if (langBtn) {
        const nextLang = state.lang === 'en' ? 'ar' : 'en';
        setLanguage(nextLang);
      }
    });

    // Cart Drawer Open Triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('#cartTriggerBtn, #navCartLink, #footerCartLink, #mobileNavCartLink');
      if (trigger) {
        e.preventDefault();
        const mobileDrawer = document.getElementById('mobileDrawerNav');
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        openCartDrawer();
      }
    });

    // Mobile Menu Toggle
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('#mobileNavToggle');
      if (toggle) {
        document.getElementById('mobileDrawerNav')?.classList.add('active');
      }
      const close = e.target.closest('#mobileDrawerClose');
      if (close) {
        document.getElementById('mobileDrawerNav')?.classList.remove('active');
      }
    });

    // Navigation Category Links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-nav-category]');
      if (link) {
        const cat = link.getAttribute('data-nav-category');
        selectCategory(cat);
      }
    });

    // Search Input & Autocomplete
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', handleSearchInput);
    }
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('searchResultsDropdown');
      if (dropdown && !e.target.closest('.search-wrapper')) {
        dropdown.classList.remove('active');
      }
    });

    // Checkout Flow Buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('#checkoutClose')) {
        closeCheckoutModal();
      }
      if (e.target.closest('#toPaymentBtn')) {
        const name = document.getElementById('custName')?.value.trim();
        const phone = document.getElementById('custPhone')?.value.trim();
        const address = document.getElementById('custAddress')?.value.trim();

        if (!name || !phone || !address) {
          showToast(state.lang === 'ar' ? 'يرجى إكمال بيانات التوصيل' : 'Please fill all delivery details');
          return;
        }
        setCheckoutStep(2);
      }
      if (e.target.closest('#backToDetailsBtn')) {
        setCheckoutStep(1);
      }
      if (e.target.closest('#confirmOrderBtn')) {
        processOrderSuccess();
      }
      if (e.target.closest('#backHomeBtn')) {
        closeCheckoutModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Quick View Modal Close
    document.addEventListener('click', (e) => {
      if (e.target.closest('#quickViewClose')) {
        closeQuickViewModal();
      }
      const modal = document.getElementById('quickViewModal');
      if (modal && e.target === modal) {
        closeQuickViewModal();
      }
    });

    // Newsletter Form
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'newsletterForm') {
        e.preventDefault();
        const input = document.getElementById('newsletterInput');
        const msg = document.getElementById('newsletterMsg');
        if (input && input.value.trim() && msg) {
          input.value = '';
          msg.style.display = 'block';
          msg.textContent = window.TRANSLATIONS[state.lang]?.subscribedSuccess || 'Subscribed!';
          setTimeout(() => {
            msg.style.display = 'none';
          }, 4500);
        }
      }
    });

    // Payment method selector
    document.addEventListener('click', (e) => {
      const radioCard = e.target.closest('.payment-radio-card');
      if (radioCard) {
        document.querySelectorAll('.payment-radio-card').forEach(c => c.classList.remove('active'));
        radioCard.classList.add('active');
        const cardInputs = document.getElementById('creditCardInputs');
        if (cardInputs) {
          cardInputs.style.display = radioCard.dataset.method === 'card' ? 'block' : 'none';
        }
      }
    });
  }

  function bindCatalogEvents() {
    // Filter Pills
    document.querySelectorAll('.filter-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-category');
        selectCategory(cat);
      });
    });

    // Sort Select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderCatalog();
      });
    }
  }

  function bindCartDrawerEvents() {
    const closeBtn = document.getElementById('cartCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

    const overlay = document.getElementById('cartDrawerOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeCartDrawer();
      });
    }

    const promoForm = document.getElementById('promoForm');
    if (promoForm) {
      promoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        applyPromoCode();
      });
    }

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        closeCartDrawer();
        openCheckoutModal();
      });
    }
  }

  /* ==========================================================================
     CATEGORY SELECTION & FILTERING (Requirement 3)
     ========================================================================== */
  function selectCategory(category) {
    state.activeCategory = category;
    renderCatalog();

    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     LANGUAGE & INTERNATIONALIZATION
     ========================================================================== */
  function setLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('tdb_lang', lang);
    applyLanguage(lang);
    mountComponents();
    updateCartUI();
  }

  function applyLanguage(lang) {
    const t = window.TRANSLATIONS ? window.TRANSLATIONS[lang] : null;
    if (!t) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;
  }

  /* ==========================================================================
     SEARCH & AUTOCOMPLETE
     ========================================================================== */
  function handleSearchInput(e) {
    const dropdown = document.getElementById('searchResultsDropdown');
    if (!dropdown) return;
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      dropdown.classList.remove('active');
      return;
    }

    const isAr = state.lang === 'ar';
    const matches = window.PRODUCTS_DATA.filter(p => {
      const name = isAr ? p.name_ar : p.name_en;
      const desc = isAr ? p.desc_ar : p.desc_en;
      return name.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
    });

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: 1rem; text-align: center; color: var(--tdb-text-muted); font-size: 0.8rem;">
          ${isAr ? 'لم يتم العثور على منتجات مطابقة' : 'No wholesale items matching your search'}
        </div>
      `;
    } else {
      dropdown.innerHTML = matches.slice(0, 5).map(item => `
        <div class="search-result-item" onclick="window.tdbApp.openQuickView('${item.id}'); document.getElementById('searchResultsDropdown').classList.remove('active');">
          <img src="${item.image}" alt="${isAr ? item.name_ar : item.name_en}" class="search-result-thumb" />
          <div class="search-result-info">
            <div class="search-result-title">${isAr ? item.name_ar : item.name_en}</div>
            <div class="search-result-price">$${item.price.toFixed(2)} · ${isAr ? item.unit_ar : item.unit_en}</div>
          </div>
        </div>
      `).join('');
    }

    dropdown.classList.add('active');
  }

  /* ==========================================================================
     CART MANAGEMENT & DRAWER (Requirement 5)
     ========================================================================== */
  function addToCart(productId, quantity = 1) {
    const product = window.PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({ id: product.id, quantity });
    }

    saveCart();
    renderCartDrawerMount();
    updateCartUI();

    const isAr = state.lang === 'ar';
    const name = isAr ? product.name_ar : product.name_en;
    const msg = isAr ? `تمت إضافة ${name} إلى سلتك!` : `${name} added to your basket!`;
    showToast(msg);

    openCartDrawer();
  }

  function updateQuantity(productId, delta) {
    const index = state.cart.findIndex(i => i.id === productId);
    if (index === -1) return;

    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }

    saveCart();
    renderCartDrawerMount();
    updateCartUI();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.id !== productId);
    saveCart();
    renderCartDrawerMount();
    updateCartUI();
  }

  function saveCart() {
    localStorage.setItem('tdb_cart', JSON.stringify(state.cart));
  }

  function openCartDrawer() {
    const overlay = document.getElementById('cartDrawerOverlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    const overlay = document.getElementById('cartDrawerOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = totalCount;
  }

  function applyPromoCode() {
    const promoInput = document.getElementById('promoInput');
    if (!promoInput) return;
    const code = promoInput.value.trim().toUpperCase();
    const t = window.TRANSLATIONS ? window.TRANSLATIONS[state.lang] : null;

    if (code === 'DAILYFRESH') {
      state.appliedPromo = 'DAILYFRESH';
      showToast(t ? t.promoApplied : 'Promo applied!');
      renderCartDrawerMount();
    } else {
      const msg = document.getElementById('promoMessage');
      if (msg) {
        msg.style.color = '#c62828';
        msg.textContent = t ? t.promoInvalid : 'Invalid code';
      }
    }
  }

  /* ==========================================================================
     QUICK VIEW MODAL
     ========================================================================== */
  function openQuickView(productId) {
    const product = window.PRODUCTS_DATA.find(p => p.id === productId);
    const content = document.getElementById('quickViewContent');
    const modal = document.getElementById('quickViewModal');
    if (!product || !content || !modal) return;

    const isAr = state.lang === 'ar';
    const t = window.TRANSLATIONS ? window.TRANSLATIONS[state.lang] : {};
    const name = isAr ? product.name_ar : product.name_en;
    const desc = isAr ? product.desc_ar : product.desc_en;
    const unit = isAr ? product.unit_ar : product.unit_en;
    const moqLabel = isAr ? product.moqLabel_ar : product.moqLabel_en;
    const distributor = isAr ? product.distributor_ar : product.distributor_en;
    const details = isAr ? product.packageDetails_ar : product.packageDetails_en;

    content.innerHTML = `
      <div class="quick-view-grid">
        <div class="qv-image-side">
          <img src="${product.image}" alt="${name}" />
        </div>
        <div class="qv-content-side">
          <span class="basket-farm-origin" style="margin-bottom:0.4rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            ${distributor}
          </span>
          <h2 class="qv-title">${name}</h2>
          <div class="wholesale-moq-pill" style="margin-top:0.4rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>${moqLabel}</span>
          </div>
          <div class="qv-price" style="margin-top:0.5rem;">$${product.price.toFixed(2)} <span style="font-size:0.8rem; font-weight:400; color:var(--tdb-text-muted);">/ ${unit}</span></div>
          <p class="qv-desc">${desc}</p>
          
          ${details ? `
            <div style="font-weight:600; font-size:0.85rem; margin-bottom:0.5rem; color:var(--tdb-green-dark);">${t.viewContents || 'Specs'}:</div>
            <ul class="qv-contents-list">
              ${details.map(c => `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#26412C" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ${c}</li>`).join('')}
            </ul>
          ` : ''}

          <div style="margin-top:auto; display:flex; gap:0.75rem;">
            <button class="add-to-cart-btn" style="flex:1; padding:0.8rem;" onclick="window.tdbApp.addToCart('${product.id}'); window.tdbApp.closeQuickViewModal();">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>${t.addToBasket || 'Add to Basket'}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickViewModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* ==========================================================================
     CHECKOUT MODAL (Requirement 5)
     ========================================================================== */
  function openCheckoutModal() {
    setCheckoutStep(1);
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function setCheckoutStep(step) {
    state.checkoutStep = step;
    document.querySelectorAll('.checkout-step-tab').forEach((tab, index) => {
      if (index + 1 === step) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    const step1 = document.getElementById('checkoutStep1');
    const step2 = document.getElementById('checkoutStep2');
    const step3 = document.getElementById('checkoutStep3');

    if (step1) step1.style.display = step === 1 ? 'block' : 'none';
    if (step2) step2.style.display = step === 2 ? 'block' : 'none';
    if (step3) step3.style.display = step === 3 ? 'block' : 'none';
  }

  function processOrderSuccess() {
    const isAr = state.lang === 'ar';
    const orderNum = 'TDB-' + Math.floor(100000 + Math.random() * 900000);
    const orderNumEl = document.getElementById('orderNumberDisplay');
    if (orderNumEl) orderNumEl.textContent = orderNum;

    // Reset Cart
    state.cart = [];
    state.appliedPromo = null;
    saveCart();
    renderCartDrawerMount();
    updateCartUI();

    setCheckoutStep(3);
    showToast(isAr ? 'تم استلام طلبك بنجاح!' : 'Wholesale order placed successfully!');
  }

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */
  function showToast(message) {
    if (typeof window.showToast === 'function') {
      window.showToast(message);
    }
  }

  // Global methods
  window.tdbApp = {
    addToCart,
    updateQuantity,
    removeFromCart,
    openQuickView,
    closeQuickViewModal,
    setLanguage,
    openCartDrawer,
    closeCartDrawer,
    selectCategory
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
