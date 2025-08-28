// DOM elements
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const navbarHover = document.querySelector('.navbar-hover');
const themeToggle = document.getElementById('themeToggle');
const themeToggleHover = document.getElementById('themeToggleHover');
const themeToggleMobile = document.getElementById('themeToggleMobile');

// Hamburger menu toggle functionality
hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Scroll detection for navbar activation
let scrollThreshold = 100; // Start showing navbar after 100px scroll
let isScrolled = false;

function checkScreenSize() {
    return window.innerWidth > 460; // Only show hover navbar on desktop
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only show hover navbar on desktop
    if (checkScreenSize()) {
        if (scrollTop > scrollThreshold && !isScrolled) {
            // Show the hover navbar
            navbarHover.classList.add('scroll-active');
            isScrolled = true;
        } else if (scrollTop <= scrollThreshold && isScrolled) {
            // Hide the hover navbar
            navbarHover.classList.remove('scroll-active');
            isScrolled = false;
        }
    } else {
        // Hide hover navbar on mobile
        navbarHover.classList.remove('scroll-active');
        isScrolled = false;
    }
});

// Initialize scroll state on page load
window.addEventListener('load', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > scrollThreshold && checkScreenSize()) {
        navbarHover.classList.add('scroll-active');
        isScrolled = true;
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (!checkScreenSize()) {
        navbarHover.classList.remove('scroll-active');
        isScrolled = false;
    }
});

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update theme toggle buttons
    const icon = newTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.textContent = icon;
    themeToggleHover.textContent = icon;
    themeToggleMobile.textContent = icon;
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = savedTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.textContent = icon;
    themeToggleHover.textContent = icon;
    themeToggleMobile.textContent = icon;
}

// Theme toggle event listeners
themeToggle.addEventListener('click', toggleTheme);
themeToggleHover.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Initialize theme on page load
initTheme();

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});
