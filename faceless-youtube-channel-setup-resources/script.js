// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Form Submission
    const subscribeForm = document.getElementById('subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Success message
                showFormMessage('Thanks for subscribing!', 'success');
                subscribeForm.reset();
                
                // In a real application, you would send this data to your server
                console.log('Form submitted with email:', email);
            } else {
                // Error message
                showFormMessage('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animation classes as elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.resource-category, .feature-card, .content-block');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    animateOnScroll();
    
    // // Mobile navigation toggle (add this if implementing a mobile menu)
    // const mobileMenuToggle = document.createElement('button');
    // mobileMenuToggle.className = 'mobile-menu-toggle';
    // mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    // const header = document.querySelector('.site-header .container');
    // const nav = document.querySelector('.main-nav');
    
    // header.insertBefore(mobileMenuToggle, nav);
    
    // mobileMenuToggle.addEventListener('click', () => {
    //     nav.classList.toggle('active');
    //     mobileMenuToggle.innerHTML = nav.classList.contains('active') ? 
    //         '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    // });
    
    // Handle window resize for responsive navigation
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Helper functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function showFormMessage(message, type) {
    // Check if message element already exists
    let messageEl = document.querySelector('.form-message');
    
    if (!messageEl) {
        // Create message element if it doesn't exist
        messageEl = document.createElement('div');
        messageEl.className = 'form-message';
        
        // Insert after form
        const subscribeForm = document.getElementById('subscribe-form');
        subscribeForm.parentNode.insertBefore(messageEl, subscribeForm.nextSibling);
    }
    
    // Set message content and styling
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    
    // Add the appropriate style based on message type
    if (type === 'success') {
        messageEl.style.color = '#4CAF50';
    } else if (type === 'error') {
        messageEl.style.color = '#F44336';
    }
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

// Add lazy loading for resources
function lazyLoadResources() {
    // This would be used in a real application to load resources dynamically
    // For example, loading more resources when scrolling to the bottom of a category
    
    const loadMoreButtons = document.querySelectorAll('.load-more');
    
    loadMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.closest('.resource-category');
            const resourceList = category.querySelector('.resource-list');
            
            // Simulate loading more resources
            // In a real app, this would fetch data from an API or database
            const newResources = [
                { name: 'New Resource 1', url: 'https://example.com/new1' },
                { name: 'New Resource 2', url: 'https://example.com/new2' },
                { name: 'New Resource 3', url: 'https://example.com/new3' }
            ];
            
            newResources.forEach(resource => {
                const resourceItem = document.createElement('a');
                resourceItem.className = 'resource-item';
                resourceItem.href = resource.url;
                
                const resourceName = document.createElement('span');
                resourceName.className = 'resource-name';
                resourceName.textContent = resource.name;
                
                resourceItem.appendChild(resourceName);
                resourceList.appendChild(resourceItem);
            });
            
            // Hide the load more button after loading
            this.style.display = 'none';
        });
    });
}

// Function to handle dark/light mode toggle (optional enhancement)
function setupThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle dark/light mode';
    
    // Add to header
    const nav = document.querySelector('.main-nav ul');
    const themeToggleLi = document.createElement('li');
    themeToggleLi.appendChild(themeToggle);
    nav.appendChild(themeToggleLi);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}