// Este script implementa carga progresiva para mejorar el rendimiento
document.addEventListener('DOMContentLoaded', function() {
  // Función para determinar si un elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Función para cargar imágenes cuando entran en el viewport
  function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyPictures = document.querySelectorAll('picture source[data-srcset]');
    
    lazyImages.forEach(img => {
      if (isInViewport(img)) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
    
    lazyPictures.forEach(source => {
      if (isInViewport(source.parentElement)) {
        source.srcset = source.dataset.srcset;
        source.removeAttribute('data-srcset');
      }
    });
  }
  
  // Configuración del Intersection Observer para carga perezosa
  const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Si es una imagen con data-src
        if (target.tagName === 'IMG' && target.dataset.src) {
          target.src = target.dataset.src;
          target.removeAttribute('data-src');
        }
        
        // Si es un source con data-srcset
        if (target.tagName === 'SOURCE' && target.dataset.srcset) {
          target.srcset = target.dataset.srcset;
          target.removeAttribute('data-srcset');
        }
        
        // Dejar de observar una vez cargado
        observer.unobserve(target);
      }
    });
  }, {
    rootMargin: '200px 0px', // Precarga cuando se está a 200px de distancia
    threshold: 0.01
  });
  
  // Observar elementos lazy load
  document.querySelectorAll('img[data-src], source[data-srcset]').forEach(el => {
    lazyLoadObserver.observe(el);
  });
  
  // Fallback para navegadores que no soportan Intersection Observer
  if (!('IntersectionObserver' in window)) {
    // Cargar imágenes en el viewport inicial
    lazyLoadImages();
    
    // Cargar más imágenes al hacer scroll
    window.addEventListener('scroll', lazyLoadImages, { passive: true });
    window.addEventListener('resize', lazyLoadImages, { passive: true });
  }
});
