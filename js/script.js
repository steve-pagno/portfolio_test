document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA PARA O SLIDER COM LOOP INFINITO E CONTÍNUO ---
  function initializeInfiniteSliders() {
    const sliders = document.querySelectorAll('[data-slider]');

    sliders.forEach(slider => {
      const container = slider.querySelector('.cards-container, .tech-list');
      const prevBtn = slider.querySelector('.prev-btn');
      const nextBtn = slider.querySelector('.next-btn');

      if (!container || !prevBtn || !nextBtn) return;

      const originalItems = Array.from(container.children);
      if (originalItems.length === 0) return;

      // 1. Clonar os itens para criar o efeito
      originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
      });

      let isScrolling = false;

      const scrollStep = () => {
        // Usa o primeiro item como referência para o tamanho do passo
        const firstItem = container.querySelector('.card, .tech-item');
        const gap = parseInt(window.getComputedStyle(container).gap) || 20;
        return firstItem.offsetWidth + gap;
      };

      const handleInfiniteScroll = () => {
        isScrolling = false;
        // Se o scroll chegou ao início da seção clonada (metade do container)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          // Silenciosamente, volta ao início sem animação
          container.style.scrollBehavior = 'auto';
          container.scrollLeft -= container.scrollWidth / 2;
          container.style.scrollBehavior = 'smooth';
        }
      };

      nextBtn.addEventListener('click', () => {
        if (isScrolling) return;
        isScrolling = true;
        container.scrollBy({ left: scrollStep(), behavior: 'smooth' });
      });

      prevBtn.addEventListener('click', () => {
        // Se estiver no início, salta para o final para dar a volta
        if (container.scrollLeft === 0) {
            container.style.scrollBehavior = 'auto';
            container.scrollLeft = container.scrollWidth / 2;
            container.style.scrollBehavior = 'smooth';
        }
        container.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
      });
      
      // Quando a animação de scroll termina, verificamos se é preciso "resetar" a posição
      container.addEventListener('scroll', () => {
        // Usamos um timeout para garantir que a função só execute após o fim do scroll
        clearTimeout(container.scrollTimeout);
        container.scrollTimeout = setTimeout(handleInfiniteScroll, 50);
      });
    });
  }

  // --- LÓGICA PARA O MENU HAMBÚRGUER (sem alterações) ---
  function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Inicializa as funções
  initializeInfiniteSliders();
  initializeHamburgerMenu();
});