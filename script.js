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

    // 3. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);
            
            if(navLink) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // 4. Scroll Reveal Animations
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

    // 4.5 Category Tabs Logic
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            categoryContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(`categoria-${targetId}`).classList.add('active');
            
            const newContent = document.getElementById(`categoria-${targetId}`);
            newContent.style.animation = 'none';
            setTimeout(() => {
                newContent.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        });
    });

    // 5. Form Submit (Mock)
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
