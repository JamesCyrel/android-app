document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Improved Screenshot Carousel Navigation
    const carousel = document.querySelector('.screenshot-carousel');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    
    if (carousel && prevBtn && nextBtn && screenshotItems.length > 0) {
        let currentIndex = 0;
        const totalItems = screenshotItems.length;
        
        // Center the first item initially
        updateCarouselPosition();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            updateCarouselPosition();
        });
        
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarouselPosition();
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarouselPosition();
        });
        
        function updateCarouselPosition() {
            // Get current item width including margins
            const itemWidth = screenshotItems[0].offsetWidth + 30; // Width + margin
            const carouselWidth = carousel.offsetWidth;
            
            // Calculate position to center the current item
            const offset = (carouselWidth / 2) - (itemWidth / 2);
            const scrollAmount = -(currentIndex * itemWidth) + offset;
            
            carousel.style.transform = `translateX(${scrollAmount}px)`;
            
            // Highlight current item
            screenshotItems.forEach((item, index) => {
                if (index === currentIndex) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1.05)';
                } else {
                    item.style.opacity = '0.7';
                    item.style.transform = 'scale(1)';
                }
            });
        }
        
        // Auto-advance carousel every 5 seconds
        let autoAdvance = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarouselPosition();
        }, 5000);
        
        // Stop auto-advance on interaction
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarouselPosition();
            }, 5000);
        });
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.feature-card, .contact-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Year for copyright
    const yearSpan = document.querySelector('.footer-logo p');
    if (yearSpan) {
        const year = new Date().getFullYear();
        yearSpan.textContent = `© ${year} All Rights Reserved`;
    }
}); 