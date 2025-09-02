document.addEventListener('DOMContentLoaded', () => {
    // Código para o Carrossel de Certificados
    const carrossel = document.querySelector('.certificacoes-carrossel');
    if (carrossel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carrossel.addEventListener('mousedown', (e) => {
            isDown = true;
            carrossel.classList.add('active');
            startX = e.pageX - carrossel.offsetLeft;
            scrollLeft = carrossel.scrollLeft;
        });

        carrossel.addEventListener('mouseleave', () => {
            isDown = false;
            carrossel.classList.remove('active');
        });

        carrossel.addEventListener('mouseup', () => {
            isDown = false;
            carrossel.classList.remove('active');
        });

        carrossel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carrossel.offsetLeft;
            const walk = (x - startX) * 2;
            carrossel.scrollLeft = scrollLeft - walk;
        });
    }

    // Código para a Animação ao Rolar (Fade-in)
    const fadeOnScroll = () => {
        const elementos = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;

        elementos.forEach(elemento => {
            const elementPosition = elemento.getBoundingClientRect().top;
            if (elementPosition < windowHeight - 150) {
                elemento.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', fadeOnScroll);
    fadeOnScroll();

    // Código para o Fundo Animado de Partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Novo código para o menu hamburguer
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav-open');
    });

    // Fechar o menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav-open');
        });
    });
});