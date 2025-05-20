// Enhance carousel arrow visibility
$(document).ready(function() {
  // Add pulse animation to arrows when user hovers near the carousel
  const projectSlider = $('.project__slider');
  const arrows = $('.slick-arrow');
  
  // Initially show arrows with reduced opacity
  setTimeout(() => {
    arrows.css({
      'opacity': '0.6',
      'animation': 'none'
    });
  }, 500);

  // Add pulse animation on hover
  projectSlider.hover(
    function() {
      // Mouse enter
      arrows.css({
        'opacity': '1',
        'animation': 'pulse 2s infinite'
      });
    },
    function() {
      // Mouse leave
      arrows.css({
        'opacity': '0.6',
        'animation': 'none'
      });
    }
  );
  
  // Additional hint for mobile users - show a hint message on first load
  if ($(window).width() <= 767 && !localStorage.getItem('carouselHintShown')) {
    const hint = $('<div class="carousel-hint">Desliza para ver más proyectos</div>');
    hint.css({
      'position': 'absolute',
      'bottom': '60px',
      'left': '50%',
      'transform': 'translateX(-50%)',
      'background-color': 'rgba(0,0,0,0.7)',
      'color': 'white',
      'padding': '8px 12px',
      'border-radius': '20px',
      'font-size': '14px',
      'opacity': '0',
      'transition': 'opacity 0.5s ease',
      'z-index': '100'
    });
    
    projectSlider.append(hint);
    
    setTimeout(() => {
      hint.css('opacity', '1');
      
      setTimeout(() => {
        hint.css('opacity', '0');
        
        setTimeout(() => {
          hint.remove();
          localStorage.setItem('carouselHintShown', 'true');
        }, 600);
      }, 3000);
    }, 1000);
  }
});
