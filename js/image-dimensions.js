function setImageDimensions() {
  // Detectar si estamos en un dispositivo móvil
  const isMobile = window.innerWidth <= 768;
  
  // Conjunto de clases de imágenes y sus dimensiones
  const imageDimensions = {
    'logo__image': { width: 180, height: 180 },
    // Tamaños diferentes según el dispositivo
    'project__image': isMobile 
      ? { width: 320, height: 220 }  // Tamaño más pequeño en móviles
      : { width: 550, height: 370 }, // Tamaño grande en escritorio
    'social__icon': { width: 24, height: 24 },
    'button__download': { width: 20, height: 20 }
  };

  // Añadir dimensiones a todas las imágenes basadas en su clase
  document.querySelectorAll('img').forEach(img => {
    // Comprobar si la imagen ya tiene dimensiones explícitas
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      // Buscar las clases de la imagen
      const classList = img.classList;
      
      // Aplicar dimensiones basadas en la clase
      for (const className in imageDimensions) {
        if (classList.contains(className)) {
          img.width = imageDimensions[className].width;
          img.height = imageDimensions[className].height;
          break;
        }
      }
      
      // Para imágenes sin clase específica pero con src que contiene cierto patrón
      const src = img.getAttribute('src') || '';
      if (src.includes('projects/') && !img.hasAttribute('width')) {
        const isMobile = window.innerWidth <= 768;
        
        // Si es una imagen de proyecto estándar
        if (src.includes('_')) {
          // Imagen móvil (versión vertical) - Siempre más pequeña que la de escritorio
          if (isMobile) {
            img.width = 150;  // Aún más pequeño en dispositivos móviles
            img.height = 270;
          } else {
            img.width = 180;  // Claramente más pequeño que la versión de escritorio
            img.height = 320;
          }
        } else {
          // Imagen de escritorio (versión horizontal) - Más grande
          if (isMobile) {
            img.width = 320;  // Tamaño adecuado para móviles
            img.height = 220;
          } else {
            img.width = 650;  // Tamaño aún más grande para escritorio
            img.height = 430;
          }
        }
      }
    }
  });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setImageDimensions);

// Redimensionar imágenes si cambia el tamaño de la ventana
window.addEventListener('resize', function() {
  // Usar un temporizador para evitar múltiples llamadas durante el redimensionamiento
  if (this.resizeTimer) clearTimeout(this.resizeTimer);
  this.resizeTimer = setTimeout(function() {
    setImageDimensions();
  }, 300);
});