// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.menu-close-btn');

    console.log('Hamburger element:', hamburger);
    console.log('Nav menu element:', navMenu);
    console.log('Close button element:', closeBtn);

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked!');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Menu active class:', navMenu.classList.contains('active'));
        });

        // Close menu when clicking close button
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                console.log('Close button clicked!');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
