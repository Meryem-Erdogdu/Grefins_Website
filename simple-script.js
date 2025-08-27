// Simplified GREFINS website script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded successfully');
    
    // Add loaded class to body to trigger animations
    setTimeout(function() {
        document.body.classList.add('loaded');
        console.log('Body loaded class added');
    }, 100);
    
    // Basic navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            navToggle.classList.toggle('active');
        });
    }
    
    // Simple smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Basic form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Simple validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Create mailto link
            const mailtoLink = `mailto:grefins.contact@gmail.com?subject=Message from GREFINS Website&body=From: ${email}%0A%0A${message}`;
            window.location.href = mailtoLink;
            
            // Reset form
            this.reset();
            alert('Email client opened. Please send the email to complete your message.');
        });
    }
});