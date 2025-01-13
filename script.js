// Esto es solo para agregar algún tipo de animación simple (si se desea añadir más interactividad)
// En este caso, cambiamos el fondo de la página cuando se hace scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.body.style.backgroundPositionY = `${scrollY * 0.1}px`;
  });
  