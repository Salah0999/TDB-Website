/**
 * AboutModal Component (src/components/common/AboutModal.tsx)
 * High-trust institutional "About TDB" modal with dual-language support (AR/EN)
 */

import React from 'react';

export interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'ar';
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  lang = 'en'
}) => {
  if (!isOpen) return null;

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
          desc: "بضاعة مضمونة 100% من الوكلاء التجاريين المعتمدين بتواريخ حديثة."
        },
        {
          title: "تخزين وتداول منظم",
          desc: "بيئة تخزين وحفظ مضبوطة تضمن سلامة المنتجات أثناء النقل والتسليم."
        },
        {
          title: "كفاءة التكلفة",
          desc: "نلغي وسائط التجزئة لنمنحك سعر الجملة المباشر من أول وحدة."
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
          desc: "100% guaranteed genuine inventory from authorized trade agents with fresh expiration dates."
        },
        {
          title: "Regulated Storage & Handling",
          desc: "Controlled storage environments ensuring product safety and integrity during handling and transit."
        },
        {
          title: "Cost Efficiency",
          desc: "We bypass traditional retail markups to deliver direct wholesale pricing from the very first unit."
        }
      ],
      visionLabel: "Our Vision",
      visionText: "Direct access to top global FMCG brands at wholesale prices with effortless online shopping.",
      exploreBtn: "Explore Catalog"
    }
  };

  const data = isAr ? content.ar : content.en;

  return (
    <div
      id="aboutModal"
      className="modal-backdrop active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aboutModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container about-modal-container">
        <button
          id="aboutModalClose"
          className="modal-close-corner"
          aria-label="Close About Us Modal"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="about-modal-inner">
          <div className="about-modal-header">
            <div className="about-trust-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>{data.badge}</span>
            </div>
            <h2 id="aboutModalTitle" className="about-modal-title">{data.title}</h2>
            <div className="about-modal-subtitle">{data.subtitle}</div>
          </div>

          <p className="about-modal-desc">{data.description}</p>

          <div className="about-pillars-grid">
            {data.pillars.map((pillar, i) => (
              <div key={i} className="about-pillar-card">
                <div className="about-pillar-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 12 11 14 15 10"></polyline>
                  </svg>
                </div>
                <div className="about-pillar-content">
                  <h4 className="about-pillar-title">{pillar.title}</h4>
                  <p className="about-pillar-desc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="about-vision-card">
            <div className="about-vision-badge">{data.visionLabel}</div>
            <blockquote className="about-vision-quote">
              “{data.visionText}”
            </blockquote>
          </div>

          <div className="about-modal-footer">
            <button
              type="button"
              className="btn-primary-cream about-action-btn"
              onClick={() => {
                onClose();
                window.location.hash = '#catalog';
              }}
            >
              <span>{data.exploreBtn}</span> →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
