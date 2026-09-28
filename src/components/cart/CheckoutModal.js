/**
 * CheckoutModal Component (src/components/cart/CheckoutModal.js)
 * Clean multi-step checkout modal for 2-Category MVP
 */

export function renderCheckoutModal(lang = 'en') {
  const isAr = lang === 'ar';

  return `
    <div id="checkoutModal" class="modal-backdrop">
      <div class="modal-container">
        <button id="checkoutClose" class="modal-close-corner" aria-label="Close checkout">✕</button>
        <div class="checkout-modal-inner">
          <!-- Steps Indicator -->
          <div class="checkout-steps-indicator">
            <span class="checkout-step-tab active" data-step="1">${isAr ? '١. بيانات التوصيل' : '1. Delivery'}</span>
            <span class="checkout-step-tab" data-step="2">${isAr ? '٢. طريقة الدفع' : '2. Payment'}</span>
            <span class="checkout-step-tab" data-step="3">${isAr ? '٣. تأكيد الطلب' : '3. Confirmation'}</span>
          </div>

          <form id="checkoutForm" onsubmit="event.preventDefault();">
            <!-- Step 1: Delivery Details -->
            <div id="checkoutStep1">
              <h3 style="font-family: var(--font-serif-logo); font-size: 1.3rem; margin-bottom: 1.25rem; color: var(--tdb-green-dark);">
                ${isAr ? 'عنوان التوصيل وموعد الاستلام' : 'Delivery Address & Schedule'}
              </h3>
              <div class="form-row-2">
                <div class="form-group">
                  <label class="form-label">${isAr ? 'الاسم بالكامل' : 'Full Name'}</label>
                  <input type="text" id="custName" class="form-input" placeholder="${isAr ? 'مثال: أحمد مصطفى' : 'e.g. Layla Hassan'}" required />
                </div>
                <div class="form-group">
                  <label class="form-label">${isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
                  <input type="tel" id="custPhone" class="form-input" placeholder="+20 10 1234 5678" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">${isAr ? 'العنوان بالتفصيل' : 'Delivery Street Address'}</label>
                <input type="text" id="custAddress" class="form-input" placeholder="${isAr ? 'اسم الشارع، رقم العمارة، رقم الشقة' : 'Building name, Street, Apartment No.'}" required />
              </div>

              <div class="form-group">
                <label class="form-label">${isAr ? 'فترة التوصيل المفضلة' : 'Preferred Delivery Window'}</label>
                <select id="custSlot" class="form-select">
                  <option value="morning">${isAr ? 'توصيل صباحي (٩:٠٠ ص - ١:٠٠ م)' : 'Morning Delivery (9:00 AM - 1:00 PM)'}</option>
                  <option value="afternoon">${isAr ? 'توصيل بعد الظهر (٢:٠٠ م - ٦:٠٠ م)' : 'Afternoon Delivery (2:00 PM - 6:00 PM)'}</option>
                  <option value="evening">${isAr ? 'توصيل مسائي (٧:٠٠ م - ١٠:٠٠ م)' : 'Evening Delivery (7:00 PM - 10:00 PM)'}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">${isAr ? 'ملاحظات التوصيل (اختياري)' : 'Delivery Instructions (Optional)'}</label>
                <input type="text" id="custNotes" class="form-input" placeholder="${isAr ? 'مثال: الدور الثالث، يوجد مصعد، الاتصال عند الوصول' : 'e.g. Floor 3, elevator available, call upon arrival'}" />
              </div>

              <button type="button" id="toPaymentBtn" class="checkout-action-btn">
                <span>${isAr ? 'المتابعة لاختيار طريقة الدفع' : 'Proceed to Payment'}</span> →
              </button>
            </div>

            <!-- Step 2: Payment Method -->
            <div id="checkoutStep2" style="display: none;">
              <h3 style="font-family: var(--font-serif-logo); font-size: 1.3rem; margin-bottom: 1.25rem; color: var(--tdb-green-dark);">
                ${isAr ? 'اختر طريقة الدفع' : 'Payment Method'}
              </h3>

              <div class="payment-radio-group">
                <div class="payment-radio-card active" data-method="card">
                  <input type="radio" name="paymethod" checked />
                  <span>${isAr ? 'بطاقة بنكية / فيزا / ماستركارد' : 'Credit / Debit Card'}</span>
                </div>
                <div class="payment-radio-card" data-method="applepay">
                  <input type="radio" name="paymethod" />
                  <span>${isAr ? 'أبل باي / المحافظ الإلكترونية' : 'Apple Pay / Digital Wallet'}</span>
                </div>
                <div class="payment-radio-card" data-method="cod">
                  <input type="radio" name="paymethod" />
                  <span>${isAr ? 'الدفع نقداً عند الاستلام' : 'Cash on Delivery'}</span>
                </div>
              </div>

              <div id="creditCardInputs">
                <div class="form-group">
                  <label class="form-label">${isAr ? 'رقم البطاقة' : 'Card Number'}</label>
                  <input type="text" class="form-input" placeholder="4242 •••• •••• 4242" value="4532 8901 2345 6789" />
                </div>
                <div class="form-row-2">
                  <div class="form-group">
                    <label class="form-label">${isAr ? 'تاريخ الانتهاء (شهر / سنة)' : 'MM / YY'}</label>
                    <input type="text" class="form-input" placeholder="08/28" value="11/27" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">${isAr ? 'رمز الأمان (CVC)' : 'CVC'}</label>
                    <input type="text" class="form-input" placeholder="123" value="892" />
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
                <button type="button" id="backToDetailsBtn" class="btn-secondary-outline" style="color: var(--tdb-green); border-color: var(--tdb-border);">
                  ← ${isAr ? 'رجوع' : 'Back'}
                </button>
                <button type="button" id="confirmOrderBtn" class="checkout-action-btn" style="flex: 1; margin-top: 0;">
                  <span>${isAr ? 'تأكيد طلب الجملة' : 'Confirm Wholesale Order'}</span>
                </button>
              </div>
            </div>

            <!-- Step 3: Order Confirmed -->
            <div id="checkoutStep3" style="display: none;">
              <div class="order-success-box">
                <div class="success-check-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 style="font-family: var(--font-serif-logo); font-size: 1.6rem; color: var(--tdb-green-dark); margin-bottom: 0.5rem;">
                  ${isAr ? 'تم استلام طلبك بنجاح!' : 'Wholesale Order Confirmed!'}
                </h3>
                <p style="font-size: 0.88rem; color: var(--tdb-text-muted); margin-bottom: 1.5rem;">
                  ${isAr ? 'تم إرسال طلبك لمركز التوزيع المعتمد لتجهيز الكراتين المغلفة وشحنها فوراً.' : 'Your wholesale order has been dispatched to our distribution center. Our team is preparing your sealed cartons.'}
                </p>
                <div style="background: var(--tdb-cream-light); border: 1px dashed var(--tdb-border); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.75rem;">
                  <div style="font-size: 0.82rem; color: var(--tdb-text-muted);">
                    ${isAr ? 'رقم الطلب المرجعي:' : 'Order Reference:'} <strong id="orderNumberDisplay" style="color: var(--tdb-green);">TDB-748291</strong>
                  </div>
                  <div style="font-size: 0.82rem; color: var(--tdb-text-muted); margin-top: 0.35rem;">
                    ${isAr ? 'الموعد المتوقع للتوصيل:' : 'Estimated Delivery:'} <strong>${isAr ? 'اليوم خلال ٣ ساعات' : 'Today within 3 Hours'}</strong>
                  </div>
                </div>
                <button type="button" id="backHomeBtn" class="btn-primary-cream">
                  ${isAr ? 'العودة للمتجر' : 'Return to Shop'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.renderCheckoutModal = renderCheckoutModal;
}
