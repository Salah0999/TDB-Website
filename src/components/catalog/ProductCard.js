/**
 * ProductCard Component (src/components/catalog/ProductCard.js)
 * High-converting wholesale product card with MOQ badge and quick actions
 */

function renderProductCard(product, lang = 'en') {
  const isAr = lang === 'ar';
  const name = isAr ? product.name_ar : product.name_en;
  const desc = isAr ? product.desc_ar : product.desc_en;
  const unit = isAr ? product.unit_ar : product.unit_en;
  const moqLabel = isAr ? product.moqLabel_ar : product.moqLabel_en;
  const badge = isAr ? product.badge_ar : product.badge_en;
  const distributor = isAr ? product.distributor_ar : product.distributor_en;
  const addToBasketText = isAr ? 'أضف للسلة' : 'Add to Basket';
  const quickViewText = isAr ? 'تفاصيل سريعة' : 'Quick View';

  // Savings calculation
  let savingsTag = '';
  if (product.originalPrice && product.originalPrice > product.price) {
    const percent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    savingsTag = `<span class="product-savings-badge">${isAr ? `وفر ${percent}%` : `Save ${percent}%`}</span>`;
  }

  return `
    <article class="product-card wholesale-product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-thumb-wrap">
        ${badge ? `<span class="badge-tag bestseller">${badge}</span>` : ''}
        ${savingsTag}
        <img src="${product.image}" alt="${name}" loading="lazy" />
        <button class="quick-view-trigger" onclick="window.tdbApp.openQuickView('${product.id}')" aria-label="${quickViewText}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          ${quickViewText}
        </button>
      </div>

      <div class="product-card-body">
        <!-- Wholesale Metadata: Distributor & Rating -->
        <div class="basket-card-meta">
          <span class="basket-farm-origin">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            ${distributor}
          </span>
          <span class="basket-rating">★ ${product.rating} (${product.reviewsCount})</span>
        </div>

        <h3 class="product-card-title">${name}</h3>
        
        <!-- Wholesale Minimum Order Quantity (MOQ) Badge -->
        <div class="wholesale-moq-pill">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>${moqLabel}</span>
        </div>

        <p class="product-card-desc">${desc}</p>

        <!-- Pricing & Action Footer -->
        <div class="basket-card-footer">
          <div class="basket-price-wrap">
            <div class="price-row">
              <span class="price-current">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <span class="price-unit">${unit}</span>
          </div>
          <button class="add-to-cart-btn" onclick="window.tdbApp.addToCart('${product.id}')" aria-label="${addToBasketText}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>${addToBasketText}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

if (typeof window !== 'undefined') {
  window.renderProductCard = renderProductCard;
}
