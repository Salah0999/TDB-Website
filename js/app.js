/**
 * The Daily Basket (TDB) - Main Application Logic
 * Modern, High-Converting Web Application
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

  // DOM Cache
  const DOM = {
    // Header & Navigation
    siteHeader: document.querySelector('.site-header'),
    langToggleBtn: document.getElementById('langToggleBtn'),
    cartTriggerBtn: document.getElementById('cartTriggerBtn'),
    cartBadge: document.getElementById('cartBadge'),
    searchInput: document.getElementById('searchInput'),
    searchResultsDropdown: document.getElementById('searchResultsDropdown'),
    mobileNavToggle: document.getElementById('mobileNavToggle'),
    mobileDrawerNav: document.getElementById('mobileDrawerNav'),
    mobileDrawerClose: document.getElementById('mobileDrawerClose'),

    // Cart Drawer
    cartDrawerOverlay: document.getElementById('cartDrawerOverlay'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartFooter: document.getElementById('cartFooter'),
    shippingBarText: document.getElementById('shippingBarText'),
    shippingProgressFill: document.getElementById('shippingProgressFill'),
    subtotalAmount: document.getElementById('subtotalAmount'),
    deliveryFeeAmount: document.getElementById('deliveryFeeAmount'),
    discountLine: document.getElementById('discountLine'),
    discountAmount: document.getElementById('discountAmount'),
    totalAmount: document.getElementById('totalAmount'),
    promoForm: document.getElementById('promoForm'),
    promoInput: document.getElementById('promoInput'),
    promoMessage: document.getElementById('promoMessage'),
    checkoutBtn: document.getElementById('checkoutBtn'),

    // Catalog & Baskets Grids
    featuredBasketsGrid: document.getElementById('featuredBasketsGrid'),
    catalogGrid: document.getElementById('catalogGrid'),
    filterPills: document.querySelectorAll('.filter-pill-btn'),
    sortSelect: document.getElementById('sortSelect'),

    // Modals
    quickViewModal: document.getElementById('quickViewModal'),
    quickViewContent: document.getElementById('quickViewContent'),
    quickViewClose: document.getElementById('quickViewClose'),
    checkoutModal: document.getElementById('checkoutModal'),
    checkoutClose: document.getElementById('checkoutClose'),
    checkoutForm: document.getElementById('checkoutForm'),
    checkoutStepsTabs: document.querySelectorAll('.checkout-step-tab'),
    checkoutStep1: document.getElementById('checkoutStep1'),
    checkoutStep2: document.getElementById('checkoutStep2'),
    checkoutStep3: document.getElementById('checkoutStep3'),
    toPaymentBtn: document.getElementById('toPaymentBtn'),
    backToDetailsBtn: document.getElementById('backToDetailsBtn'),
    confirmOrderBtn: document.getElementById('confirmOrderBtn'),
    backHomeBtn: document.getElementById('backHomeBtn'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer'),

    // Newsletter
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterInput: document.getElementById('newsletterInput'),
    newsletterMsg: document.getElementById('newsletterMsg')
  };

  /* ==========================================================================
     INIT APPLICATION
     ========================================================================== */
  function init() {
    applyLanguage(state.lang);
    renderBaskets();
    renderCatalog();
    updateCartUI();
    bindEvents();
  }

  /* ==========================================================================
     EVENT BINDINGS
     ========================================================================== */
  function bindEvents() {
    // Header Scroll Shadow
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        DOM.siteHeader.classList.add('scrolled');
      } else {
        DOM.siteHeader.classList.remove('scrolled');
      }
    });

    // Language Toggle
    DOM.langToggleBtn.addEventListener('click', () => {
      const nextLang = state.lang === 'en' ? 'ar' : 'en';
      setLanguage(nextLang);
    });

    // Cart Drawer Open/Close
    DOM.cartTriggerBtn.addEventListener('click', openCartDrawer);
    DOM.cartCloseBtn.addEventListener('click', closeCartDrawer);
    DOM.cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.cartDrawerOverlay) {
        closeCartDrawer();
      }
    });

    // Mobile Menu
    DOM.mobileNavToggle.addEventListener('click', () => {
      DOM.mobileDrawerNav.classList.add('active');
    });
    DOM.mobileDrawerClose.addEventListener('click', () => {
      DOM.mobileDrawerNav.classList.remove('active');
    });

    // Search Input & Autocomplete
    DOM.searchInput.addEventListener('input', handleSearchInput);
    document.addEventListener('click', (e) => {
      if (!DOM.searchInput.contains(e.target) && !DOM.searchResultsDropdown.contains(e.target)) {
        DOM.searchResultsDropdown.classList.remove('active');
      }
    });

    // Catalog Filter Pills
    DOM.filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeCategory = pill.dataset.category;
        renderCatalog();
      });
    });

    // Catalog Sort Select
    DOM.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });

    // Promo Form Submit
    DOM.promoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyPromoCode();
    });

    // Checkout Flow Modal
    DOM.checkoutBtn.addEventListener('click', () => {
      closeCartDrawer();
      openCheckoutModal();
    });
    DOM.checkoutClose.addEventListener('click', closeCheckoutModal);

    DOM.toPaymentBtn.addEventListener('click', () => {
      // Validate Step 1
      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const address = document.getElementById('custAddress').value.trim();

      if (!name || !phone || !address) {
        showToast(state.lang === 'ar' ? 'يرجى إكمال بيانات التوصيل' : 'Please fill all delivery details');
        return;
      }

      setCheckoutStep(2);
    });

    DOM.backToDetailsBtn.addEventListener('click', () => {
      setCheckoutStep(1);
    });

    DOM.confirmOrderBtn.addEventListener('click', () => {
      processOrderSuccess();
    });

    DOM.backHomeBtn.addEventListener('click', () => {
      closeCheckoutModal();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Quick View Modal Close
    DOM.quickViewClose.addEventListener('click', closeQuickViewModal);
    DOM.quickViewModal.addEventListener('click', (e) => {
      if (e.target === DOM.quickViewModal) {
        closeQuickViewModal();
      }
    });

    // Newsletter
    DOM.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = DOM.newsletterInput.value.trim();
      if (email) {
        DOM.newsletterInput.value = '';
        DOM.newsletterMsg.style.display = 'block';
        DOM.newsletterMsg.textContent = TRANSLATIONS[state.lang].subscribedSuccess;
        setTimeout(() => {
          DOM.newsletterMsg.style.display = 'none';
        }, 4500);
      }
    });

    // Payment Radio Selector Tabs
    const paymentCards = document.querySelectorAll('.payment-radio-card');
    paymentCards.forEach(card => {
      card.addEventListener('click', () => {
        paymentCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const cardInputs = document.getElementById('creditCardInputs');
        if (card.dataset.method === 'card') {
          cardInputs.style.display = 'block';
        } else {
          cardInputs.style.display = 'none';
        }
      });
    });
  }

  /* ==========================================================================
     LANGUAGE & INTERNATIONALIZATION
     ========================================================================== */
  function setLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('tdb_lang', lang);
    applyLanguage(lang);
    renderBaskets();
    renderCatalog();
    updateCartUI();
  }

  function applyLanguage(lang) {
    const t = TRANSLATIONS[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update Language Toggle Button Label
    DOM.langToggleBtn.innerHTML = lang === 'en' 
      ? '<span>العربية</span>' 
      : '<span>English</span>';

    // Translate DOM elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // Search input placeholder
    DOM.searchInput.placeholder = t.searchPlaceholder;
    DOM.promoInput.placeholder = t.promoPlaceholder;
    DOM.newsletterInput.placeholder = t.emailPlaceholder;
  }

  /* ==========================================================================
     RENDERING: CURATED BASKETS
     ========================================================================== */
  function renderBaskets() {
    const baskets = PRODUCTS_DATA.filter(p => p.category === 'baskets');
    const isAr = state.lang === 'ar';
    const t = TRANSLATIONS[state.lang];

    DOM.featuredBasketsGrid.innerHTML = baskets.map(item => {
      const name = isAr ? item.name_ar : item.name_en;
      const desc = isAr ? item.desc_ar : item.desc_en;
      const unit = isAr ? item.unit_ar : item.unit_en;
      const badge = isAr ? item.badge_ar : item.badge_en;
      const farm = isAr ? item.farmOrigin_ar : item.farmOrigin_en;
      const contents = isAr ? item.contents_ar : item.contents_en;

      const badgeClass = item.badge_en.toLowerCase().includes('best') ? 'bestseller'
                       : item.badge_en.toLowerCase().includes('fresh') ? 'fresh'
                       : item.badge_en.toLowerCase().includes('chef') ? 'chef' : 'organic';

      return `
        <article class="basket-card" data-id="${item.id}">
          <div class="basket-card-image-wrap">
            <span class="badge-tag ${badgeClass}">${badge}</span>
            <img src="${item.image}" alt="${name}" loading="lazy" />
            <button class="quick-view-trigger" onclick="window.tdbApp.openQuickView('${item.id}')" aria-label="${t.quickView}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ${t.quickView}
            </button>
          </div>
          <div class="basket-card-body">
            <div class="basket-card-meta">
              <span class="basket-farm-origin">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${farm}
              </span>
              <span class="basket-rating">★ ${item.rating} (${item.reviewsCount})</span>
            </div>
            <h3 class="basket-card-title">${name}</h3>
            <p class="basket-card-desc">${desc}</p>
            
            <div class="basket-contents-preview">
              <strong>${t.viewContents}:</strong> ${contents.slice(0, 3).join(', ')}...
            </div>

            <div class="basket-card-footer">
              <div class="basket-price-wrap">
                <span class="price-current">$${item.price.toFixed(2)}</span>
                ${item.originalPrice ? `<span class="price-original">$${item.originalPrice.toFixed(2)}</span>` : ''}
                <span class="price-unit">${unit}</span>
              </div>
              <button class="add-to-cart-btn" onclick="window.tdbApp.addToCart('${item.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>${t.addToBasket}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ==========================================================================
     RENDERING: PRODUCT CATALOG
     ========================================================================== */
  function renderCatalog() {
    const isAr = state.lang === 'ar';
    const t = TRANSLATIONS[state.lang];

    let items = PRODUCTS_DATA.filter(p => {
      if (state.activeCategory === 'all') return true;
      return p.category === state.activeCategory;
    });

    // Sorting
    if (state.sortBy === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    DOM.catalogGrid.innerHTML = items.map(item => {
      const name = isAr ? item.name_ar : item.name_en;
      const desc = isAr ? item.desc_ar : item.desc_en;
      const unit = isAr ? item.unit_ar : item.unit_en;
      const badge = isAr ? item.badge_ar : item.badge_en;
      const farm = isAr ? item.farmOrigin_ar : item.farmOrigin_en;

      return `
        <article class="product-card" data-id="${item.id}">
          <div class="product-thumb-wrap">
            ${badge ? `<span class="badge-tag bestseller" style="font-size:0.64rem;">${badge}</span>` : ''}
            <img src="${item.image}" alt="${name}" loading="lazy" />
            <button class="quick-view-trigger" onclick="window.tdbApp.openQuickView('${item.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ${t.quickView}
            </button>
          </div>
          <div class="product-card-body">
            <div class="basket-card-meta">
              <span class="basket-farm-origin" style="font-size:0.7rem;">${farm}</span>
              <span class="basket-rating" style="font-size:0.7rem;">★ ${item.rating}</span>
            </div>
            <h3 class="product-card-title">${name}</h3>
            <p class="product-card-desc">${desc}</p>
            <div class="basket-card-footer">
              <div class="basket-price-wrap">
                <span class="price-current">$${item.price.toFixed(2)}</span>
                <span class="price-unit">${unit}</span>
              </div>
              <button class="add-to-cart-btn" onclick="window.tdbApp.addToCart('${item.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>${t.addToBasket}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ==========================================================================
     SEARCH & AUTOCOMPLETE
     ========================================================================== */
  function handleSearchInput(e) {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      DOM.searchResultsDropdown.classList.remove('active');
      return;
    }

    const isAr = state.lang === 'ar';
    const matches = PRODUCTS_DATA.filter(p => {
      const name = isAr ? p.name_ar : p.name_en;
      const desc = isAr ? p.desc_ar : p.desc_en;
      return name.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
    });

    if (matches.length === 0) {
      DOM.searchResultsDropdown.innerHTML = `
        <div style="padding: 1rem; text-align: center; color: var(--tdb-text-muted); font-size: 0.8rem;">
          ${isAr ? 'لم يتم العثور على نتائج' : 'No fresh harvest matching your search'}
        </div>
      `;
    } else {
      DOM.searchResultsDropdown.innerHTML = matches.slice(0, 5).map(item => `
        <div class="search-result-item" onclick="window.tdbApp.openQuickView('${item.id}'); document.getElementById('searchResultsDropdown').classList.remove('active');">
          <img src="${item.image}" alt="${isAr ? item.name_ar : item.name_en}" class="search-result-thumb" />
          <div class="search-result-info">
            <div class="search-result-title">${isAr ? item.name_ar : item.name_en}</div>
            <div class="search-result-price">$${item.price.toFixed(2)} · ${isAr ? item.unit_ar : item.unit_en}</div>
          </div>
        </div>
      `).join('');
    }

    DOM.searchResultsDropdown.classList.add('active');
  }

  /* ==========================================================================
     CART MANAGEMENT & DRAWER
     ========================================================================== */
  function addToCart(productId, quantity = 1) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        quantity: quantity
      });
    }

    saveCart();
    updateCartUI();

    // Visual Feedback
    const isAr = state.lang === 'ar';
    const name = isAr ? product.name_ar : product.name_en;
    showToast(`${name} ${TRANSLATIONS[state.lang].addedToBasket}`);

    // Auto open drawer for delight
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
    updateCartUI();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
  }

  function saveCart() {
    localStorage.setItem('tdb_cart', JSON.stringify(state.cart));
  }

  function openCartDrawer() {
    DOM.cartDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    DOM.cartDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateCartUI() {
    const isAr = state.lang === 'ar';
    const t = TRANSLATIONS[state.lang];

    // Total Items Count
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    DOM.cartBadge.textContent = totalCount;

    if (state.cart.length === 0) {
      DOM.cartItemsList.style.display = 'none';
      DOM.cartFooter.style.display = 'none';
      DOM.cartEmptyState.style.display = 'block';
      DOM.shippingBarText.textContent = t.freeShippingNotice.replace('$AMOUNT', '$' + state.freeShippingThreshold.toFixed(2));
      DOM.shippingProgressFill.style.width = '0%';
      return;
    }

    DOM.cartItemsList.style.display = 'block';
    DOM.cartFooter.style.display = 'block';
    DOM.cartEmptyState.style.display = 'none';

    // Subtotal Calculation
    let subtotal = 0;
    const itemsHtml = state.cart.map(cartItem => {
      const product = PRODUCTS_DATA.find(p => p.id === cartItem.id);
      if (!product) return '';

      const lineTotal = product.price * cartItem.quantity;
      subtotal += lineTotal;
      const name = isAr ? product.name_ar : product.name_en;

      return `
        <div class="cart-item-row" data-id="${product.id}">
          <img src="${product.image}" alt="${name}" class="cart-item-thumb" />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${name}</h4>
            <div class="cart-item-price">$${product.price.toFixed(2)}</div>
            <div class="cart-item-actions">
              <div class="qty-control-group">
                <button class="qty-btn" onclick="window.tdbApp.updateQuantity('${product.id}', -1)" aria-label="Decrease">−</button>
                <span class="qty-value">${cartItem.quantity}</span>
                <button class="qty-btn" onclick="window.tdbApp.updateQuantity('${product.id}', 1)" aria-label="Increase">+</button>
              </div>
              <button class="cart-item-remove-btn" onclick="window.tdbApp.removeFromCart('${product.id}')">
                ${isAr ? 'إزالة' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    DOM.cartItemsList.innerHTML = itemsHtml;

    // Free Shipping Progress
    const progressPercent = Math.min(100, (subtotal / state.freeShippingThreshold) * 100);
    DOM.shippingProgressFill.style.width = `${progressPercent}%`;

    if (subtotal >= state.freeShippingThreshold) {
      DOM.shippingBarText.innerHTML = t.freeShippingUnlocked;
      DOM.deliveryFeeAmount.textContent = t.free;
    } else {
      const diff = (state.freeShippingThreshold - subtotal).toFixed(2);
      DOM.shippingBarText.textContent = t.freeShippingNotice.replace('$AMOUNT', '$' + diff);
      DOM.deliveryFeeAmount.textContent = '$4.50';
    }

    // Calculations
    const deliveryFee = subtotal >= state.freeShippingThreshold ? 0 : 4.50;
    let discount = 0;
    if (state.appliedPromo === 'DAILYFRESH') {
      discount = subtotal * 0.15;
      DOM.discountLine.style.display = 'flex';
      DOM.discountAmount.textContent = `-$${discount.toFixed(2)}`;
    } else {
      DOM.discountLine.style.display = 'none';
    }

    const total = subtotal + deliveryFee - discount;

    DOM.subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    DOM.totalAmount.textContent = `$${total.toFixed(2)}`;
  }

  function applyPromoCode() {
    const code = DOM.promoInput.value.trim().toUpperCase();
    const t = TRANSLATIONS[state.lang];

    if (code === 'DAILYFRESH') {
      state.appliedPromo = 'DAILYFRESH';
      DOM.promoMessage.style.color = '#2e7d32';
      DOM.promoMessage.textContent = t.promoApplied;
      showToast(t.promoApplied);
      updateCartUI();
    } else {
      DOM.promoMessage.style.color = '#c62828';
      DOM.promoMessage.textContent = t.promoInvalid;
    }
  }

  /* ==========================================================================
     QUICK VIEW MODAL
     ========================================================================== */
  function openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const isAr = state.lang === 'ar';
    const t = TRANSLATIONS[state.lang];
    const name = isAr ? product.name_ar : product.name_en;
    const desc = isAr ? product.desc_ar : product.desc_en;
    const unit = isAr ? product.unit_ar : product.unit_en;
    const farm = isAr ? product.farmOrigin_ar : product.farmOrigin_en;
    const contents = isAr ? product.contents_ar : product.contents_en;

    DOM.quickViewContent.innerHTML = `
      <div class="quick-view-grid">
        <div class="qv-image-side">
          <img src="${product.image}" alt="${name}" />
        </div>
        <div class="qv-content-side">
          <span class="basket-farm-origin" style="margin-bottom:0.4rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${farm}
          </span>
          <h2 class="qv-title">${name}</h2>
          <div class="qv-price">$${product.price.toFixed(2)} <span style="font-size:0.8rem; font-weight:400; color:var(--tdb-text-muted);">/ ${unit}</span></div>
          <p class="qv-desc">${desc}</p>
          
          ${contents ? `
            <div style="font-weight:600; font-size:0.85rem; margin-bottom:0.5rem; color:var(--tdb-green-dark);">${t.viewContents}:</div>
            <ul class="qv-contents-list">
              ${contents.map(c => `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#26412C" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ${c}</li>`).join('')}
            </ul>
          ` : ''}

          <div style="margin-top:auto; display:flex; gap:0.75rem;">
            <button class="add-to-cart-btn" style="flex:1; padding:0.8rem;" onclick="window.tdbApp.addToCart('${product.id}'); window.tdbApp.closeQuickViewModal();">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>${t.addToBasket}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    DOM.quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickViewModal() {
    DOM.quickViewModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ==========================================================================
     CHECKOUT MODAL
     ========================================================================== */
  function openCheckoutModal() {
    setCheckoutStep(1);
    DOM.checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    DOM.checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function setCheckoutStep(step) {
    state.checkoutStep = step;
    DOM.checkoutStepsTabs.forEach((tab, index) => {
      if (index + 1 === step) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    DOM.checkoutStep1.style.display = step === 1 ? 'block' : 'none';
    DOM.checkoutStep2.style.display = step === 2 ? 'block' : 'none';
    DOM.checkoutStep3.style.display = step === 3 ? 'block' : 'none';
  }

  function processOrderSuccess() {
    const isAr = state.lang === 'ar';
    const orderNum = 'TDB-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('orderNumberDisplay').textContent = orderNum;

    // Reset Cart
    state.cart = [];
    state.appliedPromo = null;
    saveCart();
    updateCartUI();

    setCheckoutStep(3);
    showToast(isAr ? 'تم استلام طلبك بنجاح!' : 'Order placed successfully! Farm harvest scheduled.');
  }

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F1E9DB" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Expose global methods
  window.tdbApp = {
    addToCart,
    updateQuantity,
    removeFromCart,
    openQuickView,
    closeQuickViewModal,
    setLanguage,
    openCartDrawer,
    closeCartDrawer
  };

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', init);

})();
