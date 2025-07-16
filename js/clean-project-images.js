/**
 * Script para asegurar que las imágenes de proyectos no tienen sombras ni bordes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Eliminar cualquier box-shadow o borde de las imágenes de proyectos
    const cleanProjectImages = () => {
        // Seleccionar todas las imágenes de proyectos
        document.querySelectorAll('.project__image, .project__img img').forEach(img => {
            // Eliminar estilos no deseados
            img.style.boxShadow = 'none';
            img.style.border = 'none';
            img.style.borderRadius = '0';
            
            // Asegurar que el contenedor no tiene sombras
            if (img.parentElement) {
                if (img.parentElement.tagName === 'PICTURE') {
                    img.parentElement.style.boxShadow = 'none';
                    img.parentElement.style.border = 'none';
                    img.parentElement.style.overflow = 'hidden';
                    img.parentElement.style.lineHeight = '0';
                }
                
                if (img.parentElement.parentElement) {
                    img.parentElement.parentElement.style.boxShadow = 'none';
                    img.parentElement.parentElement.style.border = 'none';
                }
            }
        });
        
        // Limpiar también los contenedores
        document.querySelectorAll('.project__image-wrapper, .project__img').forEach(container => {
            container.style.boxShadow = 'none';
            container.style.border = 'none';
            container.style.background = 'none';
            container.style.padding = '0';
            container.style.overflow = 'hidden';
        });
    };
    
    // Ejecutar la limpieza inicial
    cleanProjectImages();
    
    // También ejecutar después de que las imágenes hayan cargado
    window.addEventListener('load', cleanProjectImages);
    
    // Y después de cualquier cambio dinámico (como cambios de slider)
    const observer = new MutationObserver(cleanProjectImages);
    observer.observe(document.body, { childList: true, subtree: true });
});
