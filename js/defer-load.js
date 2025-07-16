// Este archivo se carga de forma diferida para mejorar el rendimiento inicial
// Contiene funcionalidades no críticas que pueden esperar a que se cargue la página principal

document.addEventListener('DOMContentLoaded', function() {
  console.log('Carga diferida activada');
  
  // Mejora el efecto de desplazamiento suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Animaciones al aparecer elementos
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
  }
  
  // Mejora el tamaño del canvas en móviles
  function adjustCanvasSize() {
    const canvas = document.querySelector('.skill-tag-cloud canvas');
    if (canvas) {
      if (window.innerWidth <= 768) {
        // Tamaño para móviles
        canvas.style.width = '300px';
        canvas.style.height = '300px';
      } else {
        // Tamaño para desktop
        canvas.style.width = '500px';
        canvas.style.height = '500px';
      }
    }
  }
  
  // Ajustar canvas inicialmente y al cambiar el tamaño de la ventana
  adjustCanvasSize();
  window.addEventListener('resize', adjustCanvasSize);
  
  // Función para ajustar el tamaño de las imágenes de proyectos en tiempo real
  function adjustProjectImageSizes() {
    const desktopImages = document.querySelectorAll('.project__img:not(.project__img_mobile) img.project__image');
    const mobileImages = document.querySelectorAll('.project__img_mobile img.project__image');
    
    // Detectar ancho de pantalla
    const screenWidth = window.innerWidth;
    
    // Ajustar tamaños basados en el ancho de pantalla
    if (screenWidth >= 1600) {
      // Pantallas extra grandes
      desktopImages.forEach(img => {
        img.style.maxWidth = '700px';
        img.style.height = 'auto';
      });
    } else if (screenWidth >= 1200) {
      // Pantallas grandes
      desktopImages.forEach(img => {
        img.style.maxWidth = '650px';
        img.style.height = 'auto';
      });
    } else if (screenWidth >= 992) {
      // Pantallas medianas
      desktopImages.forEach(img => {
        img.style.maxWidth = '600px';
        img.style.height = 'auto';
      });
    }
  }
  
  // Ejecutar inicialmente y al cambiar el tamaño de la ventana
  adjustProjectImageSizes();
  window.addEventListener('resize', adjustProjectImageSizes);
});
