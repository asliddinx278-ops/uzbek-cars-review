// Faqat kichik interfeys yaxshilanishlari uchun

document.addEventListener('DOMContentLoaded', function () {
  console.log('🚗 O‘zbek mashinalari — Yomon taraflari sayti ishga tushdi!');

  // Orqaga qaytish tugmasi effekti
  const backLinks = document.querySelectorAll('nav a');
  backLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = this.getAttribute('href');
    });
  });

  // Agar Disqus ishlamasa, oddiy forma bilan almashtirish (ixtiyoriy)
  if (typeof DISQUS === 'undefined' && document.getElementById('disqus_thread')) {
    const disqusContainer = document.getElementById('disqus_thread');
    disqusContainer.innerHTML = `
      <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border: 1px solid #f59e0b; margin: 2rem 0;">
        <h3 style="color: #d97706; margin-bottom: 1rem;">⚠️ Disqus yuklanmadi</h3>
        <p style="margin-bottom: 1rem;">Fikringizni quyidagi formaga yozing:</p>
        <textarea id="comment" rows="4" placeholder="Fikringizni yozing..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 1rem;"></textarea>
        <button onclick="submitComment()" style="background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer;">Yuborish</button>
      </div>
      <div id="comments-list" style="margin-top: 2rem;">
        <h3>Foydalanuvchilar fikrlari</h3>
        <div id="comments-container" style="margin-top: 1rem;"></div>
      </div>
    `;
  }
});

// Oddiy fikr qoldirish funksiyasi (agar Disqus ishlamasa)
function submitComment() {
  const comment = document.getElementById('comment')?.value.trim();
  if (!comment) return alert('Iltimos, fikringizni yozing!');

  const commentsContainer = document.getElementById('comments-container');
  if (!commentsContainer) return;

  const commentDiv = document.createElement('div');
  commentDiv.innerHTML = `
    <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #2563eb; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <p>${escapeHtml(comment)}</p>
      <small style="color: #64748b;">Anonim foydalanuvchi • ${new Date().toLocaleDateString('uz-UZ')}</small>
    </div>
  `;
  commentsContainer.prepend(commentDiv);
  document.getElementById('comment').value = '';
  alert('✅ Fikringiz qo‘shildi!');
}

// Xavfsizlik uchun HTML escape
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}