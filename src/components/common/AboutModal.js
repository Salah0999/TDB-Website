/**
 * AboutModal Component (src/components/common/AboutModal.js)
 * High-trust institutional "About TDB" modal with dual-language support (AR/EN)
 */

function renderAboutModal(lang = 'en') {
  const isAr = lang === 'ar';

  const content = {
    ar: {
      badge: "التوزيع الرسمي المباشر",
      title: "عن TDB",
      subtitle: "التوريد المباشر.. بمعايير التوزيع الاحترافي.",
      description: "تأسست TDB لتوفير تجربة شراء جملة ذكية ومباشرة؛ نصلك بسلسلة الإمداد الرسمية للمصانع والوكلاء المعتمدين، لنقدم المنتجات الأصلية بأسعارها الحقيقية وبأعلى جودة تخزين وتداول.",
      pillars: [
        {
          title: "تكامل سلاسل الإمداد",
          desc: "بضاعة مضمونة 100% من الوكلاء التجاريين المعتمدين بتواريخ حديثة.",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`
        },
        {
          title: "تخزين وتداول منظم",
          desc: "بيئة تخزين وحفظ مضبوطة تضمن سلامة المنتجات أثناء النقل والتسليم.",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
        },
        {
          title: "كفاءة التكلفة",
          desc: "نلغي وسائط التجزئة لنمنحك سعر الجملة المباشر من أول وحدة.",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path></svg>`
        }
      ],
      visionLabel: "رؤيتنا",
      visionText: "الوصول المباشر لكبرى العلامات التجارية.. بأسعار الجملة وسهولة الشراء أونلاين.",
      exploreBtn: "تصفح المنتجات"
    },
    en: {
      badge: "AUTHORIZED DIRECT DISTRIBUTOR",
      title: "About TDB",
      subtitle: "Direct Supply.. Professional Distribution Standards.",
      description: "TDB was established to provide a smart and direct wholesale purchasing experience. We connect you directly to official factory supply chains and authorized distributors, offering 100% original products at true prices with top-tier handling and storage quality.",
      pillars: [
        {
          title: "Supply Chain Integration",
          desc: "100% guaranteed genuine inventory from authorized trade agents with fresh expiration dates.",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`
        },
        {
          title: "Regulated Storage & Handling",
          desc: "Controlled storage environments ensuring product safety and integrity during handling and transit.",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
        },
        {
          title: "Cost Efficiency",
          desc: "We bypass traditional retail markups to deliver direct wholesale pricing from the very first unit.",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path></svg>`
        }
      ],
      visionLabel: "Our Vision",
      visionText: "Direct access to top global FMCG brands at wholesale prices with effortless online shopping.",
      exploreBtn: "Explore Catalog"
    }
  };

  const data = isAr ? content.ar : content.en;

  return `
    <div id="aboutModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="aboutModalTitle">
      <div class="modal-container about-modal-container">
        <button id="aboutModalClose" class="modal-close-corner" aria-label="Close About Us Modal">✕</button>
        
        <div class="about-modal-inner">
          <!-- Institutional Header -->
          <div class="about-modal-header">
            <div class="about-trust-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>${data.badge}</span>
            </div>
            <h2 id="aboutModalTitle" class="about-modal-title">${data.title}</h2>
            <div class="about-modal-subtitle">${data.subtitle}</div>
          </div>

          <!-- Description Statement -->
          <p class="about-modal-desc">${data.description}</p>

          <!-- Core Value Pillars -->
          <div class="about-pillars-grid">
            ${data.pillars.map(pillar => `
              <div class="about-pillar-card">
                <div class="about-pillar-icon-box">
                  ${pillar.icon}
                </div>
                <div class="about-pillar-content">
                  <h4 class="about-pillar-title">${pillar.title}</h4>
                  <p class="about-pillar-desc">${pillar.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Vision Banner Card -->
          <div class="about-vision-card">
            <div class="about-vision-badge">${data.visionLabel}</div>
            <blockquote class="about-vision-quote">
              “${data.visionText}”
            </blockquote>
          </div>

          <!-- Action Footer -->
          <div class="about-modal-footer">
            <button type="button" class="btn-primary-cream about-action-btn" onclick="window.tdbApp.closeAboutModal(); window.location.hash = '#catalog';">
              <span>${data.exploreBtn}</span> →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

if (typeof exports !== 'undefined') {
  exports.renderAboutModal = renderAboutModal;
}
if (typeof window !== 'undefined') {
  window.renderAboutModal = renderAboutModal;
}
