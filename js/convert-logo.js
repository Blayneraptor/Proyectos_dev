/**
 * Script para convertir automáticamente el logo a formato WebP y optimizar su carga
 * Este script se ejecutará cuando el sitio esté en desarrollo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar soporte de WebP
    const supportsWebp = () => {
        const elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            // Se podría usar 'image/webp' para verificar soporte de WebP
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    };

    // Precarga de imágenes críticas
    const preloadCriticalImages = () => {
        const criticalImages = [
            'assets/img/logocouso.webp',
            'assets/img/logocouso.png'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };

    // Establecer dimensiones explícitas para las imágenes del logo
    const optimizeLogos = () => {
        document.querySelectorAll('.header__logo-img').forEach(logo => {
            // Asegurar que el logo tiene dimensiones explícitas
            if (!logo.getAttribute('width')) logo.setAttribute('width', '30');
            if (!logo.getAttribute('height')) logo.setAttribute('height', '30');
            
            // Añadir fetchpriority si no está presente
            if (!logo.getAttribute('fetchpriority')) {
                logo.setAttribute('fetchpriority', 'high');
            }
            
            // Asegurar que el fondo es transparente
            logo.style.backgroundColor = 'transparent';
            
            // Añadir clase para optimización específica
            logo.classList.add('optimized-logo');
        });
    };

    // Optimizar la carga de la imagen del logo
    const optimizeLogoLoading = () => {
        // Aplicar optimizaciones a los logos en el header
        optimizeLogos();
        
        // Precarga de imágenes críticas
        preloadCriticalImages();
        
        // Aplicar clase que muestra que las optimizaciones están listas
        document.documentElement.classList.add('logo-optimized');
    };

    // Ejecutar optimizaciones
    optimizeLogoLoading();
});
