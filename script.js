// ==================== PORTFOLIO SCRIPT ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LOADING SCREEN =====
    const pageTransition = document.querySelector('.page-transition');
    
    // Hide loading screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            pageTransition.classList.add('hidden');
            setTimeout(() => pageTransition.remove(), 1000);
        }, 800);
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== PROJECT FILTERING =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
// ===== CONTACT FORM =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(this);
        
        // Send to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--success)';
                
                // Show success message
                alert('✅ Message sent successfully! I\'ll get back to you soon.');
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Error
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed';
            submitBtn.style.background = '#DC3545';
            
            // Show error message
            alert('❌ Failed to send message. Please try again or email me directly.');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    });
}
    
    // ===== NOTIFICATION FUNCTION =====
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28A745' : '#DC3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;
        
        // Add keyframes for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ===== COPY EMAIL FUNCTIONALITY =====
    const emailElement = document.querySelector('.contact-item:nth-child(1) p');
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        emailElement.addEventListener('click', () => {
            const email = emailElement.textContent;
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!', 'success');
            });
        });
    }
    
    // ===== CURRENT YEAR IN FOOTER =====
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }

// ===== SCROLL-TRIGGERED RISE ANIMATION =====
// Select all sections except the hero
const sectionsToReveal = document.querySelectorAll('section:not(#home)');

// Configure the Intersection Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Add the class when the section enters the viewport
        if (entry.isIntersecting) {
            entry.target.classList.add('rise-visible');

            // Optional: Animate child items with a staggered delay
            const items = entry.target.querySelectorAll('.project-card, .skill-category, .about-content > div, .contact-content > div');
            items.forEach((item, index) => {
                // Set a CSS custom property for staggered delay
                item.style.setProperty('--item-order', index);
            });
            
            // Stop observing the section after it's been revealed to improve performance
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    root: null, // Uses the viewport
    threshold: 0.10, // Triggers when 10% of the section is visible
    rootMargin: '0px 0px -50px 0px' // Adjusts the trigger point slightly
});

// Start observing each target section
sectionsToReveal.forEach(section => {
    revealObserver.observe(section);
});

});