/**
 * CatalogGrid Component (src/components/catalog/CatalogGrid.js)
 * Clean filter toolbar with 3 tabs ("All Deals", "Beverages", "Chocolates") and product grid
 */

import { renderProductCard } from './ProductCard.js';

export function renderCatalogGrid(products, activeCategory = 'all', sortBy = 'featured', lang = 'en') {
  const isAr = lang === 'ar';
  const renderCardFn = typeof renderProductCard === 'function' ? renderProductCard : window.renderProductCard;

  // Filter items
  let filtered = products.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  // Sort items
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const productsHtml = filtered.length > 0 
    ? filtered.map(product => renderCardFn(product, lang)).join('')
    : `<div class="empty-catalog-msg">${isAr ? 'لا توجد منتجات في هذه الفئة' : 'No items found in this category'}</div>`;

  return `
    <div class="catalog-wrapper">
      <!-- Streamlined 3-Tab Filter Toolbar -->
      <div class="catalog-toolbar">
        <ul class="filter-pills-list" role="tablist">
          <li>
            <button class="filter-pill-btn ${activeCategory === 'all' ? 'active' : ''}" data-category="all" role="tab">
              ${isAr ? 'جميع العروض' : 'All Deals'}
            </button>
          </li>
          <li>
            <button class="filter-pill-btn ${activeCategory === 'beverages' ? 'active' : ''}" data-category="beverages" role="tab">
              ${isAr ? 'المشروبات' : 'Beverages'}
            </button>
          </li>
          <li>
            <button class="filter-pill-btn ${activeCategory === 'chocolates' ? 'active' : ''}" data-category="chocolates" role="tab">
              ${isAr ? 'الشوكولاتة' : 'Chocolates'}
            </button>
          </li>
        </ul>

        <div class="sort-wrap">
          <span>${isAr ? 'الترتيب:' : 'Sort by:'}</span>
          <select id="sortSelect" class="sort-select" aria-label="Sort catalog">
            <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>${isAr ? 'أفضل عروض الجملة' : 'Top Value Deals'}</option>
            <option value="price-asc" ${sortBy === 'price-asc' ? 'selected' : ''}>${isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
            <option value="price-desc" ${sortBy === 'price-desc' ? 'selected' : ''}>${isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>${isAr ? 'تقييم العملاء' : 'Customer Rating'}</option>
          </select>
        </div>
      </div>

      <!-- Catalog Grid Output -->
      <div id="catalogGrid" class="catalog-grid catalog-grid--two-category">
        ${productsHtml}
      </div>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.renderCatalogGrid = renderCatalogGrid;
}
