document.addEventListener('DOMContentLoaded', () => {
    // Animação de seções
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animação dos cards de habilidade e certificação
    const skillCards = document.querySelectorAll('#habilidades .habilidade-card');
    const certCards = document.querySelectorAll('#certificacoes .certificado-card');

    const cardObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.habilidade-card, .certificado-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150); // Atraso de 150ms para cada card
                });
                observer.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    const habilidadesSection = document.getElementById('habilidades');
    if (habilidadesSection) {
        cardObserver.observe(habilidadesSection);
    }

    const certificacoesSection = document.getElementById('certificacoes');
    if (certificacoesSection) {
        cardObserver.observe(certificacoesSection);
    }
});