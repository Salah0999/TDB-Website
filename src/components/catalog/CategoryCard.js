/**
 * CategoryCard Component (src/components/catalog/CategoryCard.js)
 * Visual highlight card for 2-Category MVP layout: Beverages & Chocolates
 */

function renderCategoryCard(category, lang = 'en') {
  const isAr = lang === 'ar';
  const name = isAr ? category.name_ar : category.name_en;
  const tagline = isAr ? category.tagline_ar : category.tagline_en;
  const desc = isAr ? category.desc_ar : category.desc_en;
  const btnText = isAr ? 'عرض منتجات الجملة' : 'Shop Wholesale Pack';

  return `
    <article class="category-spotlight-card" onclick="window.tdbApp.selectCategory('${category.id}')">
      <div class="category-card-media">
        <img src="${category.image}" alt="${name}" loading="lazy" />
        <div class="category-card-overlay">
          <span class="category-tagline-badge">${tagline}</span>
        </div>
      </div>
      <div class="category-card-content">
        <h3 class="category-card-title">${name}</h3>
        <p class="category-card-desc">${desc}</p>
        <div class="category-card-action-row">
          <span class="category-item-count">
            <span class="pulse-dot"></span>
            ${isAr ? 'متاح للتسليم الفوري' : 'In Stock • Low MOQ'}
          </span>
          <button class="btn-category-select" type="button" aria-label="${btnText}">
            <span>${btnText}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

if (typeof exports !== 'undefined') {
  exports.renderCategoryCard = renderCategoryCard;
}
if (typeof window !== 'undefined') {
  window.renderCategoryCard = renderCategoryCard;
}
