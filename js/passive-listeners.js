// Este script implementa listeners pasivos para mejorar el rendimiento de desplazamiento
document.addEventListener('DOMContentLoaded', function() {
  // Agregar pasivo a eventos de desplazamiento en el documento
  window.addEventListener('scroll', null, { passive: true });
  window.addEventListener('wheel', null, { passive: true });
  window.addEventListener('touchstart', null, { passive: true });
  window.addEventListener('touchmove', null, { passive: true });
  
  // Reemplazar los event listeners de desplazamiento con versiones pasivas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, { passive: false }); // No puede ser pasivo porque usamos preventDefault
  });
});
