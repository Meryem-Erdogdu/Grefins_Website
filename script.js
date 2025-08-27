// ===== GREFINS LANDING PAGE - INTERACTIVE FEATURES =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            const isOpen = navLinks.classList.contains('mobile-open');
            
            if (isOpen) {
                navLinks.classList.remove('mobile-open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            } else {
                navLinks.classList.add('mobile-open');
                navToggle.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close mobile nav when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksItems = document.querySelectorAll('.nav-links a[href^="#"]');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    function createIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.section-title, .feature-card, .step, .why-item, .about-item');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
        
        // Observe section numbers for left animation
        const sectionNumbers = document.querySelectorAll('.section-number');
        sectionNumbers.forEach(el => {
            observer.observe(el);
            el.addEventListener('animationstart', () => {
                el.classList.add('animate-in-left');
            });
        });
    }
    
    // ===== FORM HANDLING =====
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');
    
    function showFormMessage(message, isError = false) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = 'form-status' + (isError ? ' error' : ' success');
        }
    }
    
    function clearFormMessage() {
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            
            // Clear any previous messages
            clearFormMessage();
            
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Basic validation
            if (!email || !email.includes('@')) {
                showFormMessage('Please enter a valid email address.', true);
                return;
            }
            
            if (!message || message.trim().length < 5) {
                showFormMessage('Please enter a message.', true);
                return;
            }
            
            // Check if honeypot field is filled (likely a bot)
            const honeypot = this.querySelector('input[name="honeypot"]');
            if (honeypot && honeypot.value) {
                console.log('Honeypot triggered - likely spam submission');
                // Pretend to submit but actually don't
                showFormMessage('Submitting...');
                setTimeout(() => {
                    showFormMessage('Message received!'); 
                    contactForm.reset();
                }, 1500);
                return;
            }
            
            // Change button state for visual feedback
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('sending');
            
            // Show sending message
            showFormMessage('Opening Outlook...');
            
            // Open Outlook directly with the specified email address
            openOutlookForContact(email, message, submitBtn, originalText, contactForm);
        });
    }
    
    // Open Outlook directly for contact form
    function openOutlookForContact(email, message, submitBtn, originalText, contactForm) {
        try {
            // Create a mailto link for Outlook with the specified email address
            const mailtoSubject = 'Message from GREFINS Website';
            const mailtoBody = `From: ${email}%0D%0A%0D%0A${message}`;
            const collectorEmail = 'aykas64@gmail.com'; // Changed to the specified email address
            const mailtoLink = `mailto:${collectorEmail}?subject=${encodeURIComponent(mailtoSubject)}&body=${mailtoBody}`;
            
            // Create temporary link element and trigger click
            const emailLink = document.createElement('a');
            emailLink.href = mailtoLink;
            emailLink.style.display = 'none';
            document.body.appendChild(emailLink);
            
            // Click the link to open Outlook
            emailLink.click();
            
            // Clean up
            document.body.removeChild(emailLink);
            
            // Show success notification
            const notificationModal = document.getElementById('notification-modal');
            if (notificationModal) {
                const modalTitle = notificationModal.querySelector('h3');
                if (modalTitle) {
                    modalTitle.textContent = 'Outlook Opened';
                }
                
                const modalText = notificationModal.querySelector('p');
                if (modalText) {
                    modalText.textContent = 'Your message is ready to send in Outlook. Please click "Send" in Outlook to deliver your message to aykas64@gmail.com.';
                }
                
                notificationModal.classList.add('active');
                setupNotificationCloseHandlers(notificationModal);
            }
            
            // Reset form
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('sending');
            contactForm.reset();
            showFormMessage('Outlook opened successfully! Please send the message from Outlook.', false);
        } catch (e) {
            console.error('Failed to open Outlook:', e);
            showFormMessage('Failed to open email client. Please try again.', true);
            
            // Reset form
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('sending');
        }
    }
    
    // ===== KEYBOARD NAVIGATION =====
    function enhanceKeyboardNavigation() {
        // Focus management for mobile menu
        const firstFocusableElement = navLinks.querySelector('a');
        const lastFocusableElement = navLinks.querySelector('a:last-child');
        
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Trap focus in mobile menu when open
        document.addEventListener('keydown', function(e) {
            if (!navLinks.classList.contains('mobile-open')) return;
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
            
            if (e.key === 'Escape') {
                navLinks.classList.remove('mobile-open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNav);
            ticking = true;
        }
    }
    
    function handleScroll() {
        requestTick();
        ticking = false;
    }
    
    // ===== REDUCED MOTION CHECK =====
    function respectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            document.documentElement.style.setProperty('--transition', 'none');
            return;
        }
        
        // Initialize animations only if motion is allowed
        createIntersectionObserver();
    }
    
    // ===== INITIALIZE ALL FEATURES =====
    function init() {
        respectReducedMotion();
        enhanceKeyboardNavigation();
        
        // Add scroll listener with throttling
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial nav state
        updateActiveNav();
        
        // Add loading class removal for initial animation
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }
    
    // Start the application
    init();
    
    // ===== UTILITY FUNCTIONS =====

    // Helper function to open Outlook as a fallback
    function openOutlook(email, message, submitBtn, originalText, contactForm) {
        try {
            // Create a mailto link for Outlook
            const mailtoSubject = 'Message from GREFINS Website';
            const mailtoBody = `From: ${email}%0D%0A%0D%0A${message}`;
            const collectorEmail = 'aykas64@gmail.com'; // Updated to the new email address
            const mailtoLink = `mailto:${collectorEmail}?subject=${encodeURIComponent(mailtoSubject)}&body=${mailtoBody}`;
            
            // Create temporary link element and trigger click
            const emailLink = document.createElement('a');
            emailLink.href = mailtoLink;
            emailLink.style.display = 'none';
            document.body.appendChild(emailLink);
            
            // Click the link to open Outlook
            emailLink.click();
            
            // Clean up
            document.body.removeChild(emailLink);
            
            // Show success notification
            const notificationModal = document.getElementById('notification-modal');
            if (notificationModal) {
                const modalTitle = notificationModal.querySelector('h3');
                if (modalTitle) {
                    modalTitle.textContent = 'Outlook Opened';
                }
                
                const modalText = notificationModal.querySelector('p');
                if (modalText) {
                    modalText.textContent = 'Your message is ready to send in Outlook. Please click "Send" in Outlook to deliver your message to aykas64@gmail.com.';
                }
                
                notificationModal.classList.add('active');
                setupNotificationCloseHandlers(notificationModal);
            }
            
            // Reset form
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('sending');
            contactForm.reset();
            showFormMessage('Outlook opened successfully! Please send the message from Outlook.', false);
        } catch (e) {
            console.error('Failed to open Outlook:', e);
            showFormMessage('Failed to open email client. Please try again.', true);
            
            // Reset form
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('sending');
        }
    }

    // Setup notification close handlers
    function setupNotificationCloseHandlers(notificationModal) {
        // Handle close button
        const closeBtn = notificationModal.querySelector('.close-notification');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                notificationModal.classList.remove('active');
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', function escapeListener(e) {
            if (e.key === 'Escape') {
                notificationModal.classList.remove('active');
                document.removeEventListener('keydown', escapeListener);
            }
        });
        
        // Close when clicking outside the content
        notificationModal.addEventListener('click', function(e) {
            if (e.target === notificationModal) {
                notificationModal.classList.remove('active');
            }
        });
    }
    
    // Debounce function for performance
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
    
    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Handle resize events with debouncing
    const debouncedResize = debounce(() => {
        updateActiveNav();
    }, 250);
    
    window.addEventListener('resize', debouncedResize, { passive: true });
});