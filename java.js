// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference or use default light theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Add scroll event to change header style
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Check if skills section is in viewport for animation
        animateSkillBarsOnScroll();
    });
    
    // Initialize skill bars animation
    animateSkillBarsOnScroll();
    
    // Function to animate skill bars when in viewport
    function animateSkillBarsOnScroll() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;
        
        const skillBars = document.querySelectorAll('.skill-progress');
        
        if (isInViewport(skillsSection)) {
            skillBars.forEach(bar => {
                const width = bar.parentElement.parentElement.querySelector('span').getAttribute('data-progress') || bar.style.width;
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    }
    
    // Helper function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});
