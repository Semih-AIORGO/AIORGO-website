// AIORGO Website JavaScript
console.log("AIORGO website loaded successfully!");

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'dark';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initNavbarScroll();
    initPortfolioAnimations();
    initThemeToggle();
    initParallaxEffect();
    initImageLoading();
    initPageTransitions();
});

// Theme Toggle Functionality
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            currentTheme = currentTheme === 'dark' ? 'bright' : 'dark';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            updateThemeIcon();
        });
    }
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
    
    // Update navbar text colors when theme changes
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove any inline styles to let CSS handle the colors
    navLinks.forEach(link => {
        link.style.removeProperty('color');
    });
    
    // Trigger scroll event to update navbar appearance
    window.dispatchEvent(new Event('scroll'));
}

// Simple Mobile Navigation
function initMobileNavigation() {
    console.log('initMobileNavigation called');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Hamburger found:', !!hamburger);
    console.log('Nav menu found:', !!navMenu);
    console.log('Nav items found:', navItems.length);
    console.log('Nav links found:', navLinks.length);
    
    // Debug: Check if we're on mobile
    console.log('Window width:', window.innerWidth);
    console.log('Is mobile:', window.innerWidth <= 768);
    
    if (hamburger && navMenu) {
        console.log('Adding click event to hamburger');
        
        // Click event to toggle menu - UNIVERSAL APPROACH
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('=== HAMBURGER CLICKED ===');
            console.log('Menu classes before:', navMenu.className);
            console.log('Menu display before:', window.getComputedStyle(navMenu).display);
            console.log('Menu z-index before:', window.getComputedStyle(navMenu).zIndex);
            
            // Simple toggle approach
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // FORCE HIGH Z-INDEX
            navMenu.style.zIndex = '9999';
            hamburger.style.zIndex = '10000';
            
            console.log('Menu classes after:', navMenu.className);
            console.log('Menu display after:', window.getComputedStyle(navMenu).display);
            console.log('Menu z-index after:', window.getComputedStyle(navMenu).zIndex);
            
            // Log menu items
            const navItems = navMenu.querySelectorAll('.nav-item');
            const navLinks = navMenu.querySelectorAll('.nav-link');
            console.log('Menu items count:', navItems.length);
            console.log('Menu links count:', navLinks.length);
            
            navLinks.forEach((link, index) => {
                console.log(`Menu link ${index + 1}:`, link.textContent.trim(), link.href);
            });
            
            // FORCE SHOW MENU WITH INLINE STYLES
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'block';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.right = '0';
                navMenu.style.background = '#000000';
                navMenu.style.border = '2px solid white';
                navMenu.style.padding = '20px';
                navMenu.style.zIndex = '9999';
                navMenu.style.minWidth = '200px';
                navMenu.style.borderRadius = '5px';
                console.log('FORCED MENU TO SHOW WITH INLINE STYLES');
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Navigation link clicked:', this.textContent, 'href:', this.href);
                
                // Close the menu
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Allow normal navigation to proceed
                // The browser will handle the page navigation
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        console.log('Mobile navigation initialized successfully');
        
    } else {
        console.error('Could not find hamburger or nav menu');
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat, .contact-item, .value-card, .culture-item, .admission-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Navbar Scroll Effect - Change color when scrolling
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change navbar appearance based on scroll position
        if (scrollTop > 30) {
            // Scrolled down - darker/more solid background
            navbar.classList.add('scrolled');
        } else {
            // At top - lighter background
            navbar.classList.remove('scrolled');
        }
        
        // Let CSS handle the text colors based on theme and scroll state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.style.removeProperty('color');
        });
        
        lastScrollTop = scrollTop;
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 2000);
        });

        // Form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

// Field Validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validation rules
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'Subject must be at least 5 characters long';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    } else {
        removeFieldError(field);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

// Remove field error
function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#28a745';
    } else if (type === 'error') {
        notification.style.background = '#dc3545';
    } else {
        notification.style.background = '#17a2b8';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Portfolio Animations
function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Counter Animation for Stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 16);
    });
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const phoneMockup = document.querySelector('.phone-mockup');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && phoneMockup) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            const contentRate = scrolled * 0.2;
            
            phoneMockup.style.transform = `translateY(${rate}px)`;
            if (heroContent) {
                heroContent.style.transform = `translateY(${contentRate}px)`;
            }
        });
    }
}

// Initialize parallax effect
initParallaxEffect();

// Service Card Hover Effects
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Initialize service card effects
initServiceCardEffects();

// Add CSS for error states
const errorStyles = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;

// Inject error styles
const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    // Scroll-based animations can be added here
}, 16));

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

// Add smooth page transitions
function initPageTransitions() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
}

// Initialize image loading
initImageLoading();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add touch support for mobile devices
function initTouchSupport() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            // Swipe detected - can be used for additional mobile interactions
        }
    }
}

// Initialize touch support
initTouchSupport();

// Portfolio Filtering
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// FAQ Toggle
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Active Navigation Highlight
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize additional functionality
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioFilter();
    initFAQToggle();
    initActiveNavigation();
});



// Test function for debugging hamburger menu
window.testHamburgerMenu = function() {
    console.log('=== HAMBURGER MENU TEST ===');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    
    console.log('Hamburger element:', hamburger);
    console.log('Nav menu element:', navMenu);
    console.log('Nav items count:', navItems.length);
    console.log('Window width:', window.innerWidth);
    console.log('Is mobile:', window.innerWidth <= 768);
    
    if (hamburger) {
        console.log('Hamburger display:', window.getComputedStyle(hamburger).display);
        console.log('Hamburger visibility:', window.getComputedStyle(hamburger).visibility);
    }
    
    if (navMenu) {
        console.log('Nav menu display:', window.getComputedStyle(navMenu).display);
        console.log('Nav menu position:', window.getComputedStyle(navMenu).position);
        console.log('Nav menu classes:', navMenu.className);
    }
    
    // Try to trigger the menu
    if (hamburger && navMenu) {
        console.log('Triggering hamburger click...');
        hamburger.click();
        
        setTimeout(() => {
            console.log('After click - Nav menu display:', window.getComputedStyle(navMenu).display);
            console.log('After click - Nav menu classes:', navMenu.className);
            console.log('Has mobile-active class:', navMenu.classList.contains('mobile-active'));
        }, 100);
    }
    
    console.log('=== END TEST ===');
};

// Force show menu function for testing
window.forceShowMenu = function() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.add('mobile-active');
        hamburger.classList.add('active');
        navMenu.style.display = 'block';
        console.log('Menu forced to show!');
        console.log('Menu classes:', navMenu.className);
        console.log('Menu display:', window.getComputedStyle(navMenu).display);
    }
};

// Force hide menu function for testing
window.forceHideMenu = function() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.remove('mobile-active');
        hamburger.classList.remove('active');
        navMenu.style.display = 'none';
        console.log('Menu forced to hide!');
    }
};

console.log("AIORGO website JavaScript initialized successfully!");
console.log("Debug functions available:");
console.log("- testHamburgerMenu() - Test the hamburger menu");
console.log("- forceShowMenu() - Force show the menu");
console.log("- forceHideMenu() - Force hide the menu");

