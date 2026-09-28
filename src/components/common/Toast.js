/**
 * Toast Component (src/components/common/Toast.js)
 * Clean, single-responsibility toast notification module
 */

function showToast(message, containerId = 'toastContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F1E9DB" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

if (typeof exports !== 'undefined') {
  exports.showToast = showToast;
}
if (typeof window !== 'undefined') {
  window.showToast = showToast;
}
