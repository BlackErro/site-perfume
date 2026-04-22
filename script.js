// Inicializar ícones do Lucide
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
        const icon = nav.classList.contains('open') ? 'x' : 'menu';
        mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    });

    // Fechar menu ao clicar num link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            mobileMenuBtn.innerHTML = `<i data-lucide="menu"></i>`;
            lucide.createIcons();
        });
    });

    // 3. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para animar apenas 1 vez
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // 4. Category Tabs Logic
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');
    const productsSection = document.getElementById('produtos');

    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                categoryContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                document.getElementById(`categoria-${targetId}`).classList.add('active');
                
                // Trocar classe theme no container principal .products
                productsSection.classList.remove('theme-masculino', 'theme-feminino');
                productsSection.classList.add(`theme-${targetId}`);
                
                const newContent = document.getElementById(`categoria-${targetId}`);
                newContent.style.animation = 'none';
                setTimeout(() => {
                    newContent.style.animation = 'fadeIn 0.5s ease';
                }, 10);
                
                lucide.createIcons();
            });
        });
    }
});
