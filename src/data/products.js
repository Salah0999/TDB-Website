/**
 * The Daily Basket (TDB) - Lean 2-Category MVP Product Data (JavaScript ES Module)
 * Categories: Beverages & Canned Products, Chocolates & Confectionery
 */

export const CATEGORIES = [
  {
    id: 'beverages',
    name_en: 'Beverages & Canned Products',
    name_ar: 'المشروبات والمنتجات المعلبة',
    tagline_en: 'Wholesale Energy Drinks & Sodas',
    tagline_ar: 'مشروبات طاقة وعصائر بالجملة',
    desc_en: 'Direct distributor supply of energy drinks, soft beverages, and canned packs at wholesale rates.',
    desc_ar: 'توريد مباشر من الوكلاء المعتمدين لمشروبات الطاقة والمعلبات بأسعار الجملة الرسمية.',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80',
    itemCount: 1,
    featuredProductId: 'red-bull-pack'
  },
  {
    id: 'chocolates',
    name_en: 'Chocolates & Confectionery',
    name_ar: 'الشوكولاتة والحلويات الفاخرة',
    tagline_en: 'Imported Chocolate Cartons & Packs',
    tagline_ar: 'كراتين شوكولاتة مستوردة وحلويات',
    desc_en: 'Premium confectionery bars and chocolate display cartons with guaranteed freshness and authentic provenance.',
    desc_ar: 'ألواح شوكولاتة فاخرة وكراتين عرض جملة مع ضمان الصلاحية والمصدر الأصلي المعتمد.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    itemCount: 1,
    featuredProductId: 'chocolate-pack'
  }
];

export const PRODUCTS_DATA = [
  {
    id: 'red-bull-pack',
    category: 'beverages',
    name_en: 'Red Bull Energy Drink (Pack/Carton)',
    name_ar: 'ريد بُل مشروب طاقة (كرتونة / باكت جملة)',
    desc_en: 'Original Red Bull Energy Drink wholesale carton. Vitalizes body and mind with premium alpine spring water and formula. Sealed factory carton directly from the authorized beverage distributor.',
    desc_ar: 'كرتونة مشروب الطاقة الأصلي ريد بُل بأسعار الجملة المباشرة. يعطيك أجنحة وينشط الجسم والذهن، مياه ينابيع الألب ومكونات أصلية ١٠٠٪ في كرتونة المصنع المغلقة من الموزع المعتمد.',
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
    distributor_ar: 'موزع مشروبات معتمد - وكيل رسمي',
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
      'دفعة أصلية ١٠٠٪ مع باركود وفاتورة معتمدة'
    ]
  },
  {
    id: 'chocolate-pack',
    category: 'chocolates',
    name_en: 'Premium Chocolate (Pack/Carton)',
    name_ar: 'شوكولاتة فاخرة (كرتونة عرض / باكت جملة)',
    desc_en: 'Wholesale display pack of rich, velvety European premium chocolate bars. Handcrafted from sustainably sourced cocoa beans with a balanced sweetness and melt-in-mouth finish. Temperature-controlled delivery.',
    desc_ar: 'كرتونة عرض جملة من ألواح الشوكولاتة الفاخرة المجهزة من حبوب الكاكاو الغنية. مذاق غني وفاخر بقوام ناعم يذوب في الفم، مع توصيل مبرد يحافظ على جودة الشوكولاتة.',
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
