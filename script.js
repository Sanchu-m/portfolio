// ============================================
// SMOOTH SCROLL FUNCTIONALITY
// ============================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            form.reset();
            
            // In a production environment, you would send this data to a server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Message sent successfully!');
            //     form.reset();
            // })
            // .catch(error => {
            //     alert('Error sending message. Please try again.');
            // });
        });
    }
}

// ============================================
// PARALLAX EFFECT ON HERO IMAGE
// ============================================

function initParallax() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// HEADER BACKGROUND ON SCROLL (if you add a header later)
// ============================================

function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ============================================
// MASONRY LAYOUT ADJUSTMENT
// ============================================

function adjustMasonryLayout() {
    const gallery = document.querySelector('.gallery-grid');
    
    if (gallery && window.innerWidth > 768) {
        const items = gallery.querySelectorAll('.gallery-item');
        
        // Calculate optimal heights for masonry effect
        items.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img) {
                img.style.height = 'auto';
            }
        });
    }
}

// ============================================
// PRELOAD CRITICAL IMAGES
// ============================================

function preloadImages() {
    const heroImage = new Image();
    heroImage.src = 'https://images.unsplash.com/photo-1760890719879-9cbf3599d775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5JTIwYmFja3N0YWdlJTIwbHV4dXJ5fGVufDF8fHx8MTc3MDc0ODg2N3ww&ixlib=rb-4.1.0&q=80&w=1920';
}

// ============================================
// SMOOTH REVEAL FOR STATS COUNTER
// ============================================

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.textContent);
                entry.target.dataset.animated = 'true';
                countUp(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// ============================================
// ADD LOADING STATE
// ============================================

function removeLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
}

// ============================================
// PREVENT LAYOUT SHIFT
// ============================================

function preventLayoutShift() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Press 'H' to go to top
        if (e.key === 'h' || e.key === 'H') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Press 'C' to go to contact
        if (e.key === 'c' || e.key === 'C') {
            scrollToSection('contact');
        }
    });
}

// ============================================
// ACCESSIBILITY: FOCUS VISIBLE
// ============================================

function initAccessibility() {
    // Add focus-visible polyfill behavior
    document.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
            }, 0);
        });
    }
}

// ============================================
// INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initScrollAnimations();
    initContactForm();
    initParallax();
    initAccessibility();
    
    // Performance optimizations
    preloadImages();
    preventLayoutShift();
    
    // Optional enhancements
    animateStats();
    adjustMasonryLayout();
    initKeyboardNav();
    
    // Development monitoring
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        logPerformance();
    }
});

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        adjustMasonryLayout();
    }, 250);
});

// ============================================
// PAGE VISIBILITY API - PAUSE ANIMATIONS WHEN TAB INACTIVE
// ============================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations or heavy computations
        console.log('Page is hidden - pausing animations');
    } else {
        // Resume animations
        console.log('Page is visible - resuming animations');
    }
});

// ============================================
// EXPOSE GLOBAL FUNCTION FOR HTML onclick
// ============================================

window.scrollToSection = scrollToSection;
