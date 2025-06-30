/**
 * Script de depuración para el menú hamburguesa
 * Abre la consola del navegador y ejecuta este script para verificar el funcionamiento
 */

// Verificar elementos principales
const hamburger = document.querySelector('.header__hamburger');
const navigation = document.querySelector('.header__navigation');

console.log('=== DEPURACIÓN MENÚ MÓVIL ===');
console.log('Hamburguesa encontrada:', hamburger ? 'SÍ' : 'NO');
console.log('Navegación encontrada:', navigation ? 'SÍ' : 'NO');

if (hamburger && navigation) {
    console.log('Hamburguesa clases:', hamburger.className);
    console.log('Navegación clases:', navigation.className);
    
    // Verificar estilos CSS aplicados
    const hamburgerStyles = window.getComputedStyle(hamburger);
    const navigationStyles = window.getComputedStyle(navigation);
    
    console.log('=== ESTILOS HAMBURGUESA ===');
    console.log('display:', hamburgerStyles.getPropertyValue('display'));
    console.log('z-index:', hamburgerStyles.getPropertyValue('z-index'));
    console.log('position:', hamburgerStyles.getPropertyValue('position'));
    
    console.log('=== ESTILOS NAVEGACIÓN ===');
    console.log('visibility:', navigationStyles.getPropertyValue('visibility'));
    console.log('z-index:', navigationStyles.getPropertyValue('z-index'));
    console.log('position:', navigationStyles.getPropertyValue('position'));
    
    // Probar toggle manualmente
    console.log('=== PROBANDO TOGGLE MANUALMENTE ===');
    
    function toggleMenu() {
        const isOpen = hamburger.classList.contains('active');
        console.log('Estado actual:', isOpen ? 'ABIERTO' : 'CERRADO');
        
        if (isOpen) {
            hamburger.classList.remove('active');
            navigation.classList.remove('header__navigation_active');
            console.log('Cerrando menú: clases eliminadas');
        } else {
            hamburger.classList.add('active');
            navigation.classList.add('header__navigation_active');
            console.log('Abriendo menú: clases añadidas');
        }
        
        console.log('Hamburguesa clases ahora:', hamburger.className);
        console.log('Navegación clases ahora:', navigation.className);
    }
    
    console.log('Ejecuta toggleMenu() en la consola para probar el menú manualmente');
} else {
    console.error('No se encontraron los elementos necesarios.');
}
