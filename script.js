document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // 0. Pré-carregamento (Preloader)
    // ===================================

    // Remove o preloader (tela de carregamento) após o DOM estar pronto
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Usa setTimeout para garantir que a transição de saída seja notada (melhor UX)
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Adiciona a classe para mostrar o conteúdo principal de forma suave
                document.body.classList.add('loaded'); 
            }, 500); // Tempo igual à transição de opacidade no CSS
        }, 500);
    }
    
    // ===================================
    // 1. Funções de Utilidade (Throttle)
    // ===================================

    // Função para 'Throttling' - limita a frequência de execução para melhorar a performance
    const throttle = (func, delay) => {
        let lastCall = 0;
        let timeout;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    lastCall = new Date().getTime();
                    func.apply(this, args);
                }, delay - (now - lastCall));
                return;
            }
            lastCall = now;
            func.apply(this, args);
        };
    };

    // ===================================
    // 2. Inicialização de Carrosséis Arrastáveis e Responsivos
    // ===================================

    const initCarousel = (selector) => {
        const carrossel = document.querySelector(selector);
        if (!carrossel) return;

        let isDown = false;
        let startX;
        let scrollLeft;
        const scrollAmount = 300; // Quantidade de rolagem para navegação por teclado

        carrossel.style.scrollBehavior = 'smooth';

        // **VERIFICAÇÃO DE RESPONSIVIDADE:** // Verifica se o conteúdo interno é maior que o espaço visível.
        // Isso evita que o mecanismo de arrastar seja ativado em telas grandes
        // onde todos os itens cabem e o comportamento de arrastar seria estranho.
        const isScrollable = () => carrossel.scrollWidth > carrossel.clientWidth;
        
        // Função para aplicar/remover listeners dependendo da rolabilidade
        const updateCarouselListeners = () => {
            // Remove todos os listeners existentes antes de re-aplicar
            carrossel.removeEventListener('mousedown', startDrag);
            carrossel.removeEventListener('touchstart', startDrag);
            carrossel.removeEventListener('mousemove', moveDrag);
            carrossel.removeEventListener('touchmove', moveDrag);
            carrossel.removeEventListener('mouseup', endDrag);
            carrossel.removeEventListener('mouseleave', endDrag);
            carrossel.removeEventListener('touchend', endDrag);
            carrossel.removeEventListener('touchcancel', endDrag);
            carrossel.removeEventListener('keydown', handleKeyScroll);

            if (isScrollable()) {
                // Aplica listeners para arrastar e teclado
                carrossel.setAttribute('tabindex', '0'); // Torna o carrossel focável
                carrossel.addEventListener('mousedown', startDrag);
                carrossel.addEventListener('mouseleave', endDrag);
                carrossel.addEventListener('mouseup', endDrag);
                carrossel.addEventListener('mousemove', moveDrag);
                carrossel.addEventListener('touchstart', (e) => startDrag(e));
                carrossel.addEventListener('touchend', endDrag);
                carrossel.addEventListener('touchcancel', endDrag);
                carrossel.addEventListener('touchmove', (e) => moveDrag(e));
                carrossel.addEventListener('keydown', handleKeyScroll);
            } else {
                carrossel.removeAttribute('tabindex'); // Remove o foco se não for rolável
            }
        };


        // Funções de Arrastar/Touch
        const startDrag = (e) => {
            isDown = true;
            carrossel.classList.add('active');
            const clientX = e.pageX || (e.touches && e.touches[0].pageX);
            startX = clientX - carrossel.offsetLeft;
            scrollLeft = carrossel.scrollLeft;
        };

        const endDrag = () => {
            isDown = false;
            carrossel.classList.remove('active');
        };

        const moveDrag = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const clientX = e.pageX || (e.touches && e.touches[0].pageX);
            const x = clientX - carrossel.offsetLeft;
            const walk = (x - startX) * 2;
            carrossel.scrollLeft = scrollLeft - walk;
        };
        
        // Função para rolagem por teclado
        const handleKeyScroll = (e) => {
             if (e.key === 'ArrowLeft') {
                e.preventDefault();
                carrossel.scrollLeft -= scrollAmount;
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                carrossel.scrollLeft += scrollAmount;
            }
        };

        // Inicializa os listeners e os re-avalia no redimensionamento da janela
        updateCarouselListeners();
        window.addEventListener('resize', throttle(updateCarouselListeners, 200));
    };

    initCarousel('.certificacoes-carrossel');
    initCarousel('.emblemas-carrossel');

    // ===================================
    // 3. Animação ao Rolar e Botão "Voltar ao Topo"
    // ===================================

    const backToTopButton = document.getElementById('back-to-top');
    const scrollTrigger = 500; // Distância (em pixels) para o botão aparecer

    const handleScroll = () => {
        const elementos = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;

        // Lógica de Fade-in (Animate-on-scroll)
        elementos.forEach(elemento => {
            const elementPosition = elemento.getBoundingClientRect().top;
            if (elementPosition < windowHeight - 150) {
                elemento.classList.add('visible');
            }
        });
        
        // Lógica do Botão Voltar ao Topo
        if (backToTopButton) {
            if (window.scrollY > scrollTrigger) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
    };

    // Usa 'throttle' para o evento de rolagem, melhorando a performance
    window.addEventListener('scroll', throttle(handleScroll, 100));
    handleScroll(); // Executa na carga inicial

    // Evento de clique para o botão Voltar ao Topo
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // 4. Fundo Animado de Partículas (particlesJS) - (Mantido)
    // ===================================

    // O código da biblioteca particlesJS é mantido exatamente como você forneceu.
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 3, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true
        });
    }

    // ===================================
    // 5. Menu Hamburguer Interativo
    // ===================================

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-open');
            menuToggle.classList.toggle('is-active'); 
        });
    
        // Fechar o menu ao clicar em um link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-open');
                menuToggle.classList.remove('is-active');
            });
        });
    }
});