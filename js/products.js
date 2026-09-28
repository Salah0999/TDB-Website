/**
 * The Daily Basket (TDB) — Lean 2-Category MVP Product Data
 * Browser-compatible vanilla JS data store.
 * Categories: Beverages (Red Bull), Chocolates (Premium Pack)
 */

// ============================================================
// CATEGORIES
// ============================================================
const CATEGORIES_DATA = [
  {
    id: 'beverages',
    name_en: 'Beverages & Energy Drinks',
    name_ar: 'المشروبات ومشروبات الطاقة',
    tagline_en: 'Wholesale Energy Drink Cartons',
    tagline_ar: 'كراتين مشروبات الطاقة بالجملة',
    desc_en: 'Direct distributor supply of Red Bull energy drink cartons at genuine wholesale rates. Factory-sealed, 100% authentic.',
    desc_ar: 'كراتين مشروب الطاقة ريد بُل بأسعار الجملة المباشرة من الموزع المعتمد. مغلقة من المصنع وأصلية ١٠٠٪.',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80',
    itemCount: 1,
    featuredProductId: 'red-bull-pack'
  },
  {
    id: 'chocolates',
    name_en: 'Chocolates & Confectionery',
    name_ar: 'الشوكولاتة والحلويات الفاخرة',
    tagline_en: 'Imported Chocolate Display Cartons',
    tagline_ar: 'كراتين شوكولاتة مستوردة للعرض والجملة',
    desc_en: 'Premium European chocolate display cartons for wholesale. Guaranteed freshness, temperature-controlled delivery.',
    desc_ar: 'كراتين عرض شوكولاتة أوروبية فاخرة للجملة. مضمونة الصلاحية مع توصيل مبرد للحفاظ على الجودة.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    itemCount: 1,
    featuredProductId: 'chocolate-pack'
  }
];

// ============================================================
// PRODUCTS — 2-Item MVP Catalog
// ============================================================
const PRODUCTS_DATA = [
  {
    id: 'red-bull-pack',
    category: 'beverages',
    name_en: 'Red Bull Energy Drink — Wholesale Carton',
    name_ar: 'ريد بُل مشروب طاقة — كرتونة جملة أصلية',
    desc_en: 'Original Red Bull Energy Drink wholesale carton direct from the authorized distributor. Factory shrink-wrapped, batch-traceable with QR code. Vitalizes body and mind — guaranteed 18+ month shelf life.',
    desc_ar: 'كرتونة مشروب الطاقة الأصلي ريد بُل من الموزع المعتمد مباشرةً. مغلفة حرارياً من المصنع مع باركود دُفعة قابل للتتبع. تنشط الجسم والذهن — صلاحية مضمونة أكثر من ١٨ شهراً.',
    price: 34.00,
    originalPrice: 42.00,
    unit_en: 'Wholesale Carton (24 Cans × 250ml)',
    unit_ar: 'كرتونة جملة (٢٤ كانز × ٢٥٠ مل)',
    moq: 1,
    moqLabel_en: 'MOQ: 1 Carton (24 Cans)',
    moqLabel_ar: 'الحد الأدنى: كرتونة واحدة (٢٤ كانز)',
    badge_en: 'Wholesale Best Seller',
    badge_ar: 'الأكثر طلباً بالجملة',
    rating: 4.9,
    reviewsCount: 428,
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80',
    distributor_en: 'Authorized Red Bull Beverage Distributor',
    distributor_ar: 'موزع معتمد — وكيل رسمي لريد بُل',
    inStock: true,
    packageDetails_en: [
      '24 Slim Cans × 250ml each',
      'Factory shrink-wrapped distributor carton',
      'Long shelf life guaranteed (18+ months)',
      '100% Genuine batch with traceable tax QR code'
    ],
    packageDetails_ar: [
      '٢٤ كانز سليم × ٢٥٠ مل للواحدة',
      'كرتونة مغلفة حرارياً من المصنع الأصلي',
      'صلاحية طويلة مضمونة (أكثر من ١٨ شهراً)',
      'دُفعة أصلية ١٠٠٪ مع باركود وفاتورة معتمدة'
    ]
  },
  {
    id: 'chocolate-pack',
    category: 'chocolates',
    name_en: 'Premium Chocolate — Wholesale Display Carton',
    name_ar: 'شوكولاتة فاخرة — كرتونة عرض جملة أصلية',
    desc_en: 'Wholesale display carton of rich, velvety European premium chocolate bars. Crafted from sustainably sourced cocoa with a balanced sweetness and melt-in-mouth finish. Temperature-controlled delivery guaranteed.',
    desc_ar: 'كرتونة عرض جملة من ألواح الشوكولاتة الأوروبية الفاخرة. مصنوعة من أجود حبوب الكاكاو، بمذاق غني يذوب في الفم، مع توصيل مبرد للحفاظ على الجودة.',
    price: 28.50,
    originalPrice: 36.00,
    unit_en: 'Display Carton (12 Bars × 100g)',
    unit_ar: 'كرتونة عرض (١٢ باكو × ١٠٠ جم)',
    moq: 1,
    moqLabel_en: 'MOQ: 1 Display Pack (12 Bars)',
    moqLabel_ar: 'الحد الأدنى: كرتونة عرض (١٢ باكو)',
    badge_en: 'Premium Confectionery',
    badge_ar: 'حلويات فاخرة أصلية',
    rating: 4.8,
    reviewsCount: 316,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    distributor_en: 'Direct Confectionery Brand Importer',
    distributor_ar: 'مستورد شوكولاتة وحلويات مباشر',
    inStock: true,
    packageDetails_en: [
      '12 Individual sealed bars × 100g each',
      'Commercial wholesale counter display box',
      'Stored in 18°C climate-controlled facility',
      'Direct from official confectionery importer'
    ],
    packageDetails_ar: [
      '١٢ لوح مغلف فردياً × ١٠٠ جم',
      'كرتونة عرض مخصصة للبيع الفوري والجملة',
      'محفوظة في درجات حرارة مثالية ١٨ مئوية',
      'استيراد رسمي ومباشر من المصنع'
    ]
  }
];

// Expose globally for browser consumption
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.CATEGORIES_DATA = CATEGORIES_DATA;
}
