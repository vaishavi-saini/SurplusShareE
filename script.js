
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
      mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
    }
  
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    });
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Show active page in navigation
    const currentPage = window.location.pathname;
    const navLinks2 = document.querySelectorAll('.nav-links a');
    navLinks2.forEach(link => {
      if (link.getAttribute('href') === currentPage || 
          (currentPage === '/' && link.getAttribute('href') === '/')) {
        link.classList.add('active');
      }
    });
  
    // Animate elements on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll('.listing-card, .benefit-card, .step');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }
  
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.listing-card, .benefit-card, .step');
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  
    // Run animation on page load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
  });