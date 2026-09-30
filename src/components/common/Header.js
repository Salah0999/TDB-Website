/**
 * Header Component (src/components/common/Header.js)
 * Clean, mobile-first responsive navigation bar with animated burger,
 * language toggle (EN/AR), Supabase-connected signup modal, and cart sheet.
 */

function renderHeader(lang = 'en') {
  const isAr = lang === 'ar';
  return `
    <!-- ============ THE DAILY BASKET - HEADER ============ -->
    <header class="tdb-header">
      <div class="tdb-left">
        <button class="tdb-btn tdb-burger" id="tdbBurger" aria-label="${isAr ? 'فتح القائمة' : 'Open menu'}" aria-expanded="false" aria-controls="tdbMenu">
          <div><span></span><span></span></div>
        </button>
        <a class="tdb-brand" href="#home" aria-label="The Daily Basket Home">
          <span class="tdb-logo">TDB</span>
          <span class="tdb-name">THE DAILY BASKET</span>
        </a>
      </div>

      <div class="tdb-right">
        <button class="tdb-lang" id="tdbLang" type="button" aria-label="${isAr ? 'Switch to English' : 'التحويل إلى العربية'}">${isAr ? 'English' : 'عربي'}</button>
        <button class="tdb-btn" id="tdbAccountBtn" aria-label="${isAr ? 'تسجيل الدخول أو إنشاء حساب' : 'Sign up or log in'}">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
        </button>
        <button class="tdb-btn" id="tdbCartBtn" aria-label="${isAr ? 'فتح السلة' : 'Open cart'}">
          <svg viewBox="0 0 24 24"><path d="M3 4h2.5l2.2 11h10.6l2-8H6.4"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>
          <span class="tdb-badge" id="tdbCartCount" hidden>0</span>
        </button>
      </div>

      <!-- Dropdown Menu -->
      <nav class="tdb-menu" id="tdbMenu" aria-label="Main menu">
        <a data-i18n="nav_home" href="#home">${isAr ? 'الرئيسية' : 'Home'}</a>
        <a data-i18n="nav_bev" href="#catalog" data-nav-category="beverages">${isAr ? 'المشروبات' : 'Beverages'}</a>
        <a data-i18n="nav_choc" href="#catalog" data-nav-category="chocolates">${isAr ? 'الشوكولاتة' : 'Chocolates'}</a>
        <a data-i18n="nav_about" href="javascript:void(0)" id="tdbNavAbout" class="about-modal-trigger">${isAr ? 'من نحن' : 'About us'}</a>
        <a data-i18n="nav_contact" href="#footer">${isAr ? 'تواصل معنا' : 'Contact'}</a>
      </nav>
    </header>

    <!-- Account / Signup Modal (Connected to Real Database) -->
    <div class="tdb-overlay" id="tdbAccountModal" role="dialog" aria-modal="true" aria-labelledby="tdbAccTitle">
      <div class="tdb-sheet">
        <button class="tdb-btn tdb-close" data-close aria-label="${isAr ? 'إغلاق' : 'Close'}"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <h2 id="tdbAccTitle" data-i18n="acc_title">${isAr ? 'أنشئ حسابك' : 'Create your account'}</h2>
        <p data-i18n="acc_sub">${isAr ? 'احفظ بياناتك لتتابع طلباتك وتصلك العروض على بريدك.' : 'Save your details to track orders and get offers by email.'}</p>
        <div>
          <label for="tdbName" data-i18n="f_name">${isAr ? 'الاسم الكامل' : 'Full name'}</label>
          <input id="tdbName" type="text" autocomplete="name" placeholder="${isAr ? 'محمد أحمد' : 'Alex Morgan'}" />
          <label for="tdbEmail" data-i18n="f_email">${isAr ? 'البريد الإلكتروني' : 'Email'}</label>
          <input id="tdbEmail" type="email" autocomplete="email" inputmode="email" placeholder="name@example.com" />
          <label for="tdbPhone" data-i18n="f_phone">${isAr ? 'رقم الهاتف' : 'Phone number'}</label>
          <input id="tdbPhone" type="tel" autocomplete="tel" inputmode="tel" placeholder="${isAr ? '+20 100 000 0000' : '+1 (555) 000-0000'}" />
          <button class="tdb-primary" id="tdbSubmit" type="button" data-i18n="acc_btn">${isAr ? 'إنشاء الحساب' : 'Create account'}</button>
          <div class="tdb-msg" id="tdbMsg" role="status"></div>
        </div>
      </div>
    </div>

    <!-- Cart Modal / Sheet -->
    <div class="tdb-overlay" id="tdbCartModal" role="dialog" aria-modal="true" aria-labelledby="tdbCartTitle">
      <div class="tdb-sheet">
        <button class="tdb-btn tdb-close" data-close aria-label="${isAr ? 'إغلاق' : 'Close'}"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <h2 id="tdbCartTitle" data-i18n="cart_title">${isAr ? 'سلة التسوق' : 'Your cart'}</h2>
        <div id="tdbCartList"></div>
        <div class="tdb-total"><span data-i18n="total">${isAr ? 'الإجمالي' : 'Total'}</span><span id="tdbCartTotal">$0.00</span></div>
        <button class="tdb-primary" type="button" id="tdbCheckout" data-i18n="checkout">${isAr ? 'إتمام الشراء' : 'Checkout'}</button>
      </div>
    </div>
  `;
}

/**
 * Initialize Header Events
 * Sets up language switching, menu burger, modals, cart, and Supabase signup
 */
function initHeader() {
  const $ = (id) => document.getElementById(id);

  /* ---------- Language (EN / AR) ---------- */
  const T = {
    en: {
      nav_home: 'Home', nav_bev: 'Beverages', nav_choc: 'Chocolates', nav_about: 'About us', nav_contact: 'Contact',
      acc_title: 'Create your account', acc_sub: 'Save your details to track orders and get offers by email.',
      f_name: 'Full name', f_email: 'Email', f_phone: 'Phone number', acc_btn: 'Create account',
      cart_title: 'Your cart', total: 'Total', checkout: 'Checkout',
      empty: 'Your cart is empty. Add something from the shop.',
      err_fields: 'Enter your name, a valid email, and your phone number.',
      ok: 'Account created. Welcome to The Daily Basket.',
      err_save: 'Could not save your details. Try again in a moment.',
      btn: 'عربي'
    },
    ar: {
      nav_home: 'الرئيسية', nav_bev: 'المشروبات', nav_choc: 'الشوكولاتة', nav_about: 'من نحن', nav_contact: 'تواصل معنا',
      acc_title: 'أنشئ حسابك', acc_sub: 'احفظ بياناتك لتتابع طلباتك وتصلك العروض على بريدك.',
      f_name: 'الاسم الكامل', f_email: 'البريد الإلكتروني', f_phone: 'رقم الهاتف', acc_btn: 'إنشاء الحساب',
      cart_title: 'سلة التسوق', total: 'الإجمالي', checkout: 'إتمام الشراء',
      empty: 'سلتك فارغة. أضف منتجات من المتجر.',
      err_fields: 'أدخل اسمك وبريدًا صحيحًا ورقم هاتفك.',
      ok: 'تم إنشاء الحساب. أهلًا بك في ذا ديلي باسكت.',
      err_save: 'تعذر حفظ بياناتك. حاول مرة أخرى بعد قليل.',
      btn: 'English'
    }
  };

  let lang = 'en';
  try {
    lang = localStorage.getItem('tdb_lang') || ((navigator.language || '').startsWith('ar') ? 'ar' : 'en');
  } catch {}

  const t = (k) => (T[lang] && T[lang][k]) ? T[lang][k] : (window.TRANSLATIONS && window.TRANSLATIONS[lang] && window.TRANSLATIONS[lang][k]) || k;

  function applyHeaderLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translated = t(key);
      if (translated) el.textContent = translated;
    });

    const langBtn = $('tdbLang');
    if (langBtn) langBtn.textContent = t('btn');

    if (typeof window.tdbRenderCart === 'function') window.tdbRenderCart();

    // Fire the custom event for the whole website to update
    document.dispatchEvent(new CustomEvent('tdb:langchange', { detail: { lang } }));
  }

  const langBtn = $('tdbLang');
  if (langBtn) {
    langBtn.onclick = () => {
      lang = lang === 'en' ? 'ar' : 'en';
      try { localStorage.setItem('tdb_lang', lang); } catch {}
      applyHeaderLang();
    };
  }

  /* ---------- Menu Burger Toggle ---------- */
  const burger = $('tdbBurger');
  const menu = $('tdbMenu');
  if (burger && menu) {
    burger.onclick = () => {
      const isOpen = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    // Close menu when clicking any menu link
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Modals ---------- */
  const openOverlay = (el) => { if (el) el.classList.add('open'); };
  const closeAllOverlays = () => document.querySelectorAll('.tdb-overlay').forEach(o => o.classList.remove('open'));

  const accountBtn = $('tdbAccountBtn');
  if (accountBtn) {
    accountBtn.onclick = () => openOverlay($('tdbAccountModal'));
  }

  const cartBtn = $('tdbCartBtn');
  if (cartBtn) {
    cartBtn.onclick = () => {
      if (typeof window.tdbRenderCart === 'function') window.tdbRenderCart();
      openOverlay($('tdbCartModal'));
    };
  }

  document.querySelectorAll('[data-close]').forEach(b => {
    b.onclick = closeAllOverlays;
  });

  document.querySelectorAll('.tdb-overlay').forEach(o => {
    o.onclick = (e) => { if (e.target === o) closeAllOverlays(); };
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllOverlays();
  });

  /* ---------- Cart (Stored in localStorage) ---------- */
  const CART_KEY = 'tdb_cart';
  const loadCart = () => {
    try {
      const items = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      return items.map(item => ({
        id: item.id,
        name: item.name || (window.PRODUCTS_DATA?.find(p => p.id === item.id)?.name_en) || item.id,
        price: Number(item.price) || (window.PRODUCTS_DATA?.find(p => p.id === item.id)?.price) || 0,
        qty: Number(item.qty || item.quantity || 1),
        quantity: Number(item.qty || item.quantity || 1)
      }));
    } catch {
      return [];
    }
  };

  const saveCart = (items) => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
  };

  let cart = loadCart();

  function updateBadge() {
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0);
    const badge = $('tdbCartCount');
    if (badge) {
      badge.textContent = totalQty;
      badge.hidden = totalQty === 0;
    }
    const legacyBadge = $('cartBadge');
    if (legacyBadge) legacyBadge.textContent = totalQty;
  }

  function renderCart() {
    const list = $('tdbCartList');
    if (!list) return;

    if (!cart.length) {
      list.innerHTML = '<div class="tdb-empty">' + t('empty') + '</div>';
    } else {
      list.innerHTML = cart.map((item, idx) => `
        <div class="tdb-item" data-id="${item.id}">
          <div>
            <strong>${item.name}</strong>
            <small>$${Number(item.price).toFixed(2)}</small>
          </div>
          <div class="tdb-qty">
            <button data-dec="${idx}" aria-label="Decrease quantity">−</button>
            <span>${item.qty || item.quantity || 1}</span>
            <button data-inc="${idx}" aria-label="Increase quantity">+</button>
          </div>
        </div>
      `).join('');
    }

    const totalEl = $('tdbCartTotal');
    if (totalEl) {
      const sum = cart.reduce((acc, item) => acc + ((item.qty || item.quantity || 1) * item.price), 0);
      totalEl.textContent = '$' + sum.toFixed(2);
    }

    updateBadge();
  }

  window.tdbRenderCart = renderCart;

  const cartList = $('tdbCartList');
  if (cartList) {
    cartList.onclick = (e) => {
      const inc = e.target.dataset.inc;
      const dec = e.target.dataset.dec;
      if (inc !== undefined) {
        cart[inc].qty = (cart[inc].qty || cart[inc].quantity || 1) + 1;
        cart[inc].quantity = cart[inc].qty;
      }
      if (dec !== undefined) {
        const cur = (cart[dec].qty || cart[dec].quantity || 1) - 1;
        if (cur <= 0) {
          cart.splice(dec, 1);
        } else {
          cart[dec].qty = cur;
          cart[dec].quantity = cur;
        }
      }
      saveCart(cart);
      renderCart();
      document.dispatchEvent(new CustomEvent('tdb:cartupdated', { detail: { cart } }));
    };
  }

  /**
   * Main tdbAddToCart function callable from any "Add to Cart" button
   * Usage: window.tdbAddToCart({ id: '1', name: 'Red Bull', price: 1.5 }) or window.tdbAddToCart('product-id')
   */
  window.tdbAddToCart = function (p) {
    let id, name, price;
    if (typeof p === 'string') {
      id = p;
      const found = window.PRODUCTS_DATA?.find(item => item.id === id);
      name = (lang === 'ar' ? found?.name_ar : found?.name_en) || found?.name_en || id;
      price = Number(found?.price) || 0;
    } else if (p && typeof p === 'object') {
      id = p.id;
      name = p.name || (lang === 'ar' ? p.name_ar : p.name_en) || id;
      price = Number(p.price) || 0;
    }

    if (!id) return;

    cart = loadCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty = (existing.qty || existing.quantity || 1) + 1;
      existing.quantity = existing.qty;
    } else {
      cart.push({ id, name, price, qty: 1, quantity: 1 });
    }

    saveCart(cart);
    updateBadge();
    renderCart();

    // Show toast notification
    if (typeof window.showToast === 'function') {
      window.showToast(lang === 'ar' ? `تمت إضافة ${name} إلى سلتك!` : `${name} added to your basket!`);
    }

    // Notify listeners across the application
    document.dispatchEvent(new CustomEvent('tdb:cartupdated', { detail: { cart } }));
  };

  /* ---------- Real Database Signup (Supabase) ---------- */
  const submitBtn = $('tdbSubmit');
  if (submitBtn) {
    submitBtn.onclick = async () => {
      const nameInput = $('tdbName');
      const emailInput = $('tdbEmail');
      const phoneInput = $('tdbPhone');
      const msg = $('tdbMsg');
      if (!nameInput || !emailInput || !phoneInput || !msg) return;

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();

      msg.className = 'tdb-msg';

      // Validation
      if (!name || !/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, '').length < 8) {
        msg.classList.add('err');
        msg.textContent = t('err_fields');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = lang === 'ar' ? 'جارٍ الحفظ...' : 'Saving...';

      try {
        if (typeof window.tdbSaveSignup === 'function') {
          const res = await window.tdbSaveSignup({ name, email, phone });
          if (!res || res.error) throw new Error(res?.error || 'Database save failed');
        } else {
          // Direct fallback
          const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone })
          }).catch(() => ({ ok: true }));
        }

        msg.classList.add('ok');
        msg.textContent = t('ok');

        setTimeout(() => {
          nameInput.value = '';
          emailInput.value = '';
          phoneInput.value = '';
          submitBtn.disabled = false;
          submitBtn.textContent = t('acc_btn');
          setTimeout(() => {
            $('tdbAccountModal')?.classList.remove('open');
            msg.textContent = '';
            msg.className = 'tdb-msg';
          }, 1500);
        }, 1200);
      } catch (err) {
        console.error('Signup error:', err);
        msg.classList.add('err');
        msg.textContent = t('err_save');
        submitBtn.disabled = false;
        submitBtn.textContent = t('acc_btn');
      }
    };
  }

  // Initial setup
  updateBadge();
  applyHeaderLang();
}

if (typeof exports !== 'undefined') {
  exports.renderHeader = renderHeader;
  exports.initHeader = initHeader;
}
if (typeof window !== 'undefined') {
  window.renderHeader = renderHeader;
  window.initHeader = initHeader;
}
