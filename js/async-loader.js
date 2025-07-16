// Este script mejora la carga de JavaScript en la página
document.addEventListener('DOMContentLoaded', function() {
  // Función para cargar scripts de forma asíncrona
  function loadScriptAsync(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    if (callback) {
      script.onload = callback;
    }
    
    document.head.appendChild(script);
  }
  
  // Cargar recursos adicionales solo cuando el usuario está inactivo
  const resourcesLoaded = false;
  
  // Detectar cuando el navegador está inactivo para cargar recursos no críticos
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      if (!resourcesLoaded) {
        // Aquí se pueden cargar recursos adicionales en el futuro
        console.log('Cargando recursos adicionales durante tiempo inactivo');
      }
    }, { timeout: 3000 });
  } else {
    // Fallback para navegadores que no soportan requestIdleCallback
    setTimeout(() => {
      if (!resourcesLoaded) {
        // Aquí se pueden cargar recursos adicionales en el futuro
        console.log('Cargando recursos adicionales (fallback)');
      }
    }, 3000);
  }
});
