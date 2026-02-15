// Animaciones continuas para iconos
// Eliminamos eventos de hover y dejamos las animaciones activas

document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('[class*="icon-"]');
  
  // Efecto aleatorio de highlight cada 4 segundos
  setInterval(() => {
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    if(randomIcon) {
      randomIcon.classList.add('icon-highlight');
      setTimeout(() => {
        randomIcon.classList.remove('icon-highlight');
      }, 800);
    }
  }, 4000);
  
  // Click para efecto especial
  icons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      // Crear partícula
      createParticle(this);
    });
  });
});

// Crear partículas al hacer click en iconos
function createParticle(element) {
  const rect = element.getBoundingClientRect();
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.left = (rect.left + rect.width/2) + 'px';
  particle.style.top = (rect.top + rect.height/2) + 'px';
  particle.style.width = '10px';
  particle.style.height = '10px';
  particle.style.borderRadius = '50%';
  particle.style.backgroundColor = getComputedStyle(element).stroke || '#0f3460';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '1000';
  particle.style.animation = 'particleFloat 0.8s ease-out forwards';
  document.body.appendChild(particle);
  
  setTimeout(() => particle.remove(), 800);
}

// Agregar keyframe de partícula dinamicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% { 
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% { 
      transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
