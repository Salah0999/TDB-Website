/**
 * CartDrawer Component (src/components/cart/CartDrawer.js)
 * High-converting slide-out cart drawer with subtotal, shipping bar, and checkout CTA
 */

export function renderCartDrawer(cartItems, products, appliedPromo, lang = 'en', freeShippingThreshold = 45.0) {
  const isAr = lang === 'ar';
  
  // Calculate Subtotal
  let subtotal = 0;
  const itemsHtml = cartItems.map(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    if (!product) return '';

    const lineTotal = product.price * cartItem.quantity;
    subtotal += lineTotal;
    const name = isAr ? product.name_ar : product.name_en;

    return `
      <div class="cart-item-row" data-id="${product.id}">
        <img src="${product.image}" alt="${name}" class="cart-item-thumb" />
        <div class="cart-item-details">
          <h4 class="cart-item-title">${name}</h4>
          <div class="cart-item-price">$${product.price.toFixed(2)} <span style="font-size:0.75rem; color:var(--tdb-text-muted);">/ ${isAr ? product.unit_ar : product.unit_en}</span></div>
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

  // Shipping progress
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingDiff = (freeShippingThreshold - subtotal).toFixed(2);
  const deliveryFee = isFreeShipping ? 0 : 4.50;

  // Promo discount
  let discount = 0;
  if (appliedPromo === 'DAILYFRESH') {
    discount = subtotal * 0.15;
  }
  const total = subtotal + deliveryFee - discount;

  return `
    <div id="cartDrawerOverlay" class="cart-drawer-overlay">
      <aside class="cart-drawer" aria-label="Shopping Cart">
        <!-- Cart Header -->
        <div class="cart-header">
          <h2 class="cart-header-title">${isAr ? 'سلة المشتريات' : 'Your Shopping Basket'}</h2>
          <button id="cartCloseBtn" class="cart-close-btn" aria-label="Close Cart">✕</button>
        </div>

        <!-- Free Shipping Progress -->
        <div class="cart-shipping-bar">
          <div id="shippingBarText">
            ${isFreeShipping 
              ? (isAr ? '🎉 مبروك! حصلت على شحن مجاني لطلبك' : '🎉 You unlocked FREE Wholesale Delivery!') 
              : (isAr ? `أضف $${shippingDiff} إضافية للحصول على شحن مجاني!` : `Add $${shippingDiff} more for FREE Delivery!`)}
          </div>
          <div class="shipping-progress-track">
            <div id="shippingProgressFill" class="shipping-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div id="cartEmptyState" class="cart-empty-state" style="display: ${cartItems.length === 0 ? 'block' : 'none'};">
          <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h3 class="cart-empty-title">${isAr ? 'سلة المشتريات فارغة' : 'Your basket is empty'}</h3>
          <p class="cart-empty-desc">${isAr ? 'استكشف عروض المشروبات والشوكولاتة بالجملة وأضف كراتين لطلبك.' : 'Explore our wholesale beverages and chocolates to start saving.'}</p>
          <button class="btn-primary-cream" onclick="window.tdbApp.closeCartDrawer();">
            ${isAr ? 'تصفح عروض الجملة' : 'Shop Wholesale Deals'}
          </button>
        </div>

        <!-- Cart Items List -->
        <div id="cartItemsList" class="cart-items-list" style="display: ${cartItems.length > 0 ? 'block' : 'none'};">
          ${itemsHtml}
        </div>

        <!-- Cart Footer -->
        <div id="cartFooter" class="cart-footer" style="display: ${cartItems.length > 0 ? 'block' : 'none'};">
          <!-- Promo Code Input -->
          <form id="promoForm" class="promo-form">
            <input type="text" id="promoInput" class="promo-input" placeholder="${isAr ? 'كود الخصم (مثل DAILYFRESH)' : 'Enter promo code (e.g. DAILYFRESH)'}" />
            <button type="submit" class="promo-btn">${isAr ? 'تطبيق' : 'Apply'}</button>
          </form>
          <div id="promoMessage" style="font-size: 0.75rem; margin-bottom: 0.75rem; color: ${appliedPromo ? '#2e7d32' : 'inherit'};">
            ${appliedPromo ? (isAr ? '✓ تم تطبيق خصم ١٥٪' : '✓ 15% wholesale promo discount applied!') : ''}
          </div>

          <!-- Summary Calculations -->
          <div class="cart-summary-line">
            <span>${isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
            <span id="subtotalAmount">$${subtotal.toFixed(2)}</span>
          </div>
          <div class="cart-summary-line">
            <span>${isAr ? 'رسوم التوصيل' : 'Delivery Fee'}</span>
            <span id="deliveryFeeAmount">${isFreeShipping ? (isAr ? 'مجاني' : 'FREE') : '$4.50'}</span>
          </div>
          <div id="discountLine" class="cart-summary-line" style="display: ${discount > 0 ? 'flex' : 'none'}; color: #2e7d32;">
            <span>${isAr ? 'خصم الكود (-15%)' : 'Promo Discount (-15%)'}</span>
            <span id="discountAmount">-$${discount.toFixed(2)}</span>
          </div>
          <div class="cart-summary-line total">
            <span>${isAr ? 'الإجمالي الكلي' : 'Total'}</span>
            <span id="totalAmount">$${total.toFixed(2)}</span>
          </div>

          <!-- Checkout CTA -->
          <button id="checkoutBtn" class="checkout-action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>${isAr ? 'متابعة الدفع وإنهاء الطلب' : 'Proceed to Checkout'}</span>
          </button>

          <div style="font-size: 0.72rem; color: var(--tdb-text-muted); text-align: center; margin-top: 0.75rem;">
            ${isAr ? 'دفع آمن ومشفر ٢٥٦ بت' : 'Encrypted & Secure 256-bit Checkout'}
          </div>
        </div>
      </aside>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.renderCartDrawer = renderCartDrawer;
}
