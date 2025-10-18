// ============================================
// MENU MOBILE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animar o menu toggle
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(15px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-15px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// WHATSAPP BUTTON
// ============================================

const whatsappBtn = document.getElementById('whatsappBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

whatsappBtn.addEventListener('click', () => {
    const phoneNumber = '21990677432';
    const message = 'Olá! Gostaria de agendar um horário na Black Label Barber.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Mostrar toast
    toastMessage.textContent = 'Abrindo WhatsApp...';
    toast.classList.add('show');
    
    // Abrir WhatsApp
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 500);
    
    // Remover toast após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
});

// ============================================
// FORM CONTACT
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simular envio (em produção, isso seria enviado para um servidor)
    toastMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    toast.classList.add('show');
    
    // Limpar formulário
    contactForm.reset();
    
    // Remover toast após 4 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos de serviço
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

// Observar elementos da galeria
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(item);
});

// ============================================
// SMOOTH SCROLL PARA LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.style.borderBottomColor = 'rgba(212, 175, 55, 0.3)';
        header.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.borderBottomColor = 'rgb(51, 51, 51)';
        header.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
    }
});

// ============================================
// GALLERY HOVER EFFECT
// ============================================

const galleryPlaceholders = document.querySelectorAll('.gallery-placeholder');

galleryPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    placeholder.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================
// CONTADOR ANIMADO
// ============================================

const animateCounters = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                let currentValue = 0;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + (target.textContent.includes('+') ? '+' : target.textContent.includes('%') ? '%' : '');
                        clearInterval(counter);
                        target.dataset.animated = 'true';
                    } else {
                        target.textContent = Math.floor(currentValue) + (target.textContent.includes('+') ? '+' : target.textContent.includes('%') ? '%' : '');
                    }
                }, 16);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => counterObserver.observe(stat));
};

// Chamar função quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', animateCounters);

// ============================================
// EFEITO DE DIGITAÇÃO NO HERO
// ============================================

const typewriterEffect = () => {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    let index = 0;
    
    const type = () => {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    };
    
    // Iniciar após um pequeno delay
    setTimeout(type, 300);
};

// Chamar quando a página carregar
window.addEventListener('load', typewriterEffect);

// ============================================
// LAZY LOADING PARA IMAGENS
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// INICIALIZAÇÃO
// ============================================

console.log('Black Label Barber - Website carregado com sucesso!');

