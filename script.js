// Advanced Portfolio JavaScript with 3D Effects and Animations

// Dark Mode Functionality
class DarkModeManager {
    constructor() {
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.currentTheme = localStorage.getItem('theme') || this.getSystemPreference();
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupEventListeners();
        this.updateToggleIcon();
    }

    getSystemPreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.updateToggleIcon();
        this.animateThemeTransition();
    }

    updateToggleIcon() {
        const icon = this.darkModeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    animateThemeTransition() {
        // Add a subtle animation class for theme transition
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }

    setupEventListeners() {
        this.darkModeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme();
                this.updateToggleIcon();
            }
        });
    }
}

// Initialize Dark Mode
let darkModeManager;

// Initialize immediately when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode first
    darkModeManager = new DarkModeManager();
    
    // Initialize basic functionality immediately
    initBasicFunctionality();
    
    // Try to initialize advanced features when libraries are ready
    setTimeout(() => {
        tryInitializeAdvancedFeatures();
    }, 1000);
});

// Initialize basic functionality that doesn't require external libraries
function initBasicFunctionality() {
    try {
        initNavigation();
        initFormHandling();
        initScrollAnimations();
        initMobileMenu();
        
        // Profile image handling
        const profileImg = document.querySelector('.profile-img');
        const profileImage = document.querySelector('.profile-image');
        
        if (profileImg && profileImage) {
            profileImg.addEventListener('load', function() {
                this.style.opacity = '1';
                profileImage.classList.remove('no-image');
            });
            
            profileImg.addEventListener('error', function() {
                this.style.display = 'none';
                profileImage.classList.add('no-image');
            });
            
            // Force image to be visible
            profileImg.style.opacity = '1';
            profileImg.style.display = 'block';
        }
        
    } catch (error) {
        console.error('Error initializing basic functionality:', error);
    }
}

// Try to initialize advanced features if libraries are available
function tryInitializeAdvancedFeatures() {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
        try {
            gsap.registerPlugin(ScrollTrigger);
            initGSAPAnimations();
            animateSkillBars();
            console.log('GSAP features initialized successfully');
        } catch (error) {
            console.error('Error initializing GSAP features:', error);
        }
    } else {
        console.log('GSAP not available, skipping advanced animations');
    }
    
    // Check if Three.js is available
    if (typeof THREE !== 'undefined') {
        try {
            new Advanced3DBackground();
            console.log('Three.js features initialized successfully');
        } catch (error) {
            console.error('Error initializing Three.js features:', error);
        }
    } else {
        console.log('Three.js not available, skipping 3D background');
    }
    
    // Initialize other advanced features
    try {
        new AdvancedScrollAnimations();
        init3DCardEffects();
        new MouseTrail();
        initIntersectionObserver();
        optimizePerformance();
        initTechLogos(); // Add this line
        console.log('Advanced features initialized successfully');
    } catch (error) {
        console.error('Error initializing advanced features:', error);
    }
}

// Advanced 3D Background System
class Advanced3DBackground {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        this.addEventListeners();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
            this.ctx.fill();
            
            // Connect nearby particles
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
}

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const particlesBg = document.getElementById('particles-bg');
const bgCanvas = document.getElementById('bg-canvas');
const contactForm = document.getElementById('contactForm');

// 3D Background Setup
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Initialize 3D Background
function init3DBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ 
        canvas: bgCanvas, 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particle system
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        
        colors[i] = Math.random() * 0.5 + 0.5;
        colors[i + 1] = Math.random() * 0.5 + 0.5;
        colors[i + 2] = Math.random() * 0.5 + 0.5;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 5;
    
    animate3DBackground();
}

// Animate 3D Background
function animate3DBackground() {
    if (!particles || !renderer || !scene || !camera) return;
    
    requestAnimationFrame(animate3DBackground);
    
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
    
    // Mouse interaction with throttling
    if (Math.abs(mouseY - windowHalfY) > 10 || Math.abs(mouseX - windowHalfX) > 10) {
        particles.rotation.x += (mouseY - windowHalfY) * 0.000005;
        particles.rotation.y += (mouseX - windowHalfX) * 0.000005;
    }
    
    renderer.render(scene, camera);
}

// Particle System for Background
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `;
        
        particle.x = Math.random() * window.innerWidth;
        particle.y = Math.random() * window.innerHeight;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
        particle.life = Math.random() * 100 + 100;
        
        particlesBg.appendChild(particle);
        this.particles.push(particle);
    }
    
    animate() {
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            if (particle.life <= 0 || 
                particle.x < 0 || particle.x > window.innerWidth ||
                particle.y < 0 || particle.y > window.innerHeight) {
                particle.remove();
                this.particles.splice(index, 1);
                this.createParticle();
            } else {
                particle.style.left = particle.x + 'px';
                particle.style.top = particle.y + 'px';
                particle.style.opacity = particle.life / 100;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Particle System
const particleSystem = new ParticleSystem();

// Mouse Move Event for 3D Background
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Window Resize Handler
window.addEventListener('resize', () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// GSAP Animations
function initGSAPAnimations() {
    // Hero Section Animations
    gsap.from('.hero-title .title-line', {
        duration: 1.2,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.7,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons .btn', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    gsap.from('.profile-image', {
        duration: 1.5,
        scale: 0,
        rotation: 360,
        opacity: 0,
        delay: 0.5,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.floating-card', {
        duration: 1.2,
        scale: 0,
        rotation: 180,
        opacity: 0,
        stagger: 0.3,
        delay: 1.2,
        ease: 'back.out(1.7)'
    });
    
    // Scroll-triggered animations
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.title-underline', {
        scrollTrigger: {
            trigger: '.title-underline',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        scaleX: 0,
        ease: 'power3.out'
    });
    
    // About Section Animations
    gsap.from('.about-text h3', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.stat-item', {
        scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Skills Section Animations
    gsap.from('.skill-item', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: -100,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Projects Section Animations
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Experience Section Animations
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.experience-timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out'
    });
    
    // Contact Section Animations
    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: -100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out'
    });
}

// Skill Progress Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        gsap.to(bar, {
            width: width,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Parallax Effect for Floating Cards
function initParallaxEffects() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.2);
            card.style.transform = `translateY(${rate * speed}px) rotateX(${scrolled * 0.01}deg) rotateY(${scrolled * 0.01}deg)`;
        });
    });
}

// Interactive 3D Card Effects
function init3DCardEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-item, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
            
            // Add dynamic shadow based on mouse position
            const shadowX = (x - centerX) / centerX * 20;
            const shadowY = (y - centerY) / centerY * 20;
            card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.3)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Enhanced Profile Image 3D Effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mousemove', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            // Add dynamic glow effect
            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
            const glowIntensity = 1 - (distance / maxDistance);
            
            profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) scale(1.05)`;
            profileImage.style.filter = `drop-shadow(0 0 ${20 + glowIntensity * 30}px rgba(59, 130, 246, ${0.3 + glowIntensity * 0.4}))`;
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
            profileImage.style.filter = 'none';
        });
    }
}

// Advanced Mouse Trail Effect
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });
    }

    addTrailPoint(x, y) {
        const point = document.createElement('div');
        point.className = 'mouse-trail-point';
        point.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x - 4}px;
            top: ${y - 4}px;
            opacity: 0.8;
            transition: all 0.1s ease;
        `;
        
        document.body.appendChild(point);
        this.trail.push(point);
        
        if (this.trail.length > this.maxTrailLength) {
            const oldPoint = this.trail.shift();
            oldPoint.remove();
        }
        
        // Animate trail points
        this.trail.forEach((trailPoint, index) => {
            const delay = index * 50;
            setTimeout(() => {
                trailPoint.style.transform = 'scale(0)';
                trailPoint.style.opacity = '0';
                setTimeout(() => {
                    if (trailPoint.parentNode) {
                        trailPoint.remove();
                    }
                }, 100);
            }, delay);
        });
    }
}

// Form Handling
function initFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Intersection Observer for Skill Bars
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.dataset.width || skillBar.style.width;
                
                gsap.to(skillBar, {
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out'
                });
                
                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    // Observe skill bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        observer.observe(bar);
    });
}

// Performance Optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0.1);
    }
}

// Advanced Scroll Animations and Parallax
class AdvancedScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.initParallax();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add stagger effect for multiple elements
                    if (entry.target.classList.contains('stat-item')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.2;
                        gsap.fromTo(entry.target, 
                            { scale: 0, rotation: 180 },
                            { scale: 1, rotation: 0, duration: 0.8, delay: delay, ease: 'back.out(1.7)' }
                        );
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.slide-in-left, .slide-in-right, .scale-in, .fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Parallax for profile image
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                profileImage.style.transform = `translateY(${rate * 0.3}px) rotateY(${scrolled * 0.01}deg)`;
            }

            // Parallax for floating cards
            document.querySelectorAll('.floating-card').forEach((card, index) => {
                const speed = 0.5 + (index * 0.2);
                card.style.transform = `translateY(${rate * speed}px) rotateX(${scrolled * 0.005}deg) rotateY(${scrolled * 0.005}deg)`;
            });
        });
    }
}

// DOM ready check for elements that need to be available immediately
document.addEventListener('DOMContentLoaded', () => {
    // Profile image specific handling
    const profileImg = document.querySelector('.profile-img');
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImg && profileImage) {
        console.log('Profile image elements found:', { profileImg, profileImage });
        console.log('Profile image source:', profileImg.src);
        
        profileImg.addEventListener('load', function() {
            console.log('Profile image loaded successfully!');
            this.style.opacity = '1';
            profileImage.classList.remove('no-image');
            console.log('Profile image now visible');
        });
        
        profileImg.addEventListener('error', function() {
            console.log('Profile image failed to load:', this.src);
            this.style.display = 'none';
            profileImage.classList.add('no-image');
            console.log('Showing fallback initials');
        });
        
        // Check if image is already loaded
        if (profileImg.complete) {
            console.log('Profile image already loaded');
            profileImg.style.opacity = '1';
            profileImg.style.display = 'block';
        }
        
        // Force image to be visible
        profileImg.style.opacity = '1';
        profileImg.style.display = 'block';
    } else {
        console.log('Profile image elements not found:', { profileImg, profileImage });
    }
});

// Add some CSS for the notification system
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        font-size: 0.9rem;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
        }
        to {
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(notificationStyles);

// Add smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add floating animation to stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const startValue = 0;
        
        gsap.fromTo(stat, {
            textContent: startValue
        }, {
            textContent: finalValue,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Initialize stats animation
animateStats();

// Add cursor trail effect
function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--gradient-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    `;
    
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }
}

// Initialize cursor trail
initCursorTrail(); 

// Navigation functionality

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Create intersection observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percent = skillBar.getAttribute('data-percent');
                
                // Animate the skill bar
                skillBar.style.width = percent + '%';
                
                // Add a subtle animation effect
                skillBar.style.transition = 'width 1.5s ease-in-out';
                
                // Stop observing after animation
                skillObserver.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all skill bars
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Smooth scroll for all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Add fade-in class to elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('section, .project-card, .skill-category');
    
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Profile image hover effect
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Floating cards hover effect
document.addEventListener('DOMContentLoaded', function() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .notification-message {
        flex: 1;
    }
`;

document.head.appendChild(notificationStyles);

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Navbar scroll effect (already implemented above)
}, 16)); // 60fps

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.log('Image failed to load:', this.src);
        });
    });
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

// Add CSS for mobile menu
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            padding: 2rem 0;
            border-top: 1px solid #e5e7eb;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-toggle.active span {
            transition: all 0.3s ease;
        }
    }
`;

document.head.appendChild(mobileMenuStyles); 

// Initialize tech logos with 3D effects
function initTechLogos() {
    const techLogos = document.querySelectorAll('.tech-logo');
    
    techLogos.forEach(logo => {
        const logo3d = logo.querySelector('.logo-3d');
        const icon = logo.querySelector('i');
        const techName = logo.querySelector('.tech-name');

        if (!logo3d) return;

        // Enhanced 3D mouse tracking
        logo.addEventListener('mousemove', (e) => {
            const rect = logo3d.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Calculate rotation based on mouse position
            const rotateX = (mouseY / (rect.height / 2)) * -15;
            const rotateY = (mouseX / (rect.width / 2)) * 15;
            
            // Apply 3D transform
            logo3d.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            
            // Dynamic shadow based on mouse position
            const shadowX = (mouseX / rect.width) * 20;
            const shadowY = (mouseY / rect.height) * 20;
            logo3d.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2)`;
            
            // Icon glow effect
            if (icon) {
                icon.style.filter = `drop-shadow(0 0 15px currentColor)`;
                icon.style.transform = `translateZ(30px) scale(1.1)`;
            }
            
            // Text effect
            if (techName) {
                techName.style.color = 'var(--primary-color)';
                techName.style.transform = 'translateZ(25px)';
            }
        });

        // Reset on mouse leave
        logo.addEventListener('mouseleave', () => {
            logo3d.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
            logo3d.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            
            if (icon) {
                icon.style.filter = 'none';
                icon.style.transform = 'translateZ(20px) scale(1)';
            }
            
            if (techName) {
                techName.style.color = 'var(--text-primary)';
                techName.style.transform = 'translateZ(15px)';
            }
        });

        // Click effect and show info
        logo.addEventListener('click', () => {
            // Click animation
            logo3d.style.transform = 'translateY(-20px) rotateX(20deg) rotateY(20deg) scale(1.15)';
            setTimeout(() => {
                logo3d.style.transform = 'translateY(-5px) rotateX(0deg) rotateY(0deg) scale(1.05)';
            }, 200);
            
            // Show technology information
            const tech = logo.getAttribute('data-tech');
            showTechInfo(tech);
        });

        // Staggered entrance animation
        const index = Array.from(techLogos).indexOf(logo);
        setTimeout(() => {
            logo.style.transition = 'all 0.8s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

function showTechInfo(tech) {
    const techInfo = {
        python: "Python - High-level programming language for AI/ML, web development, and automation",
        javascript: "JavaScript - Dynamic programming language for web development and server-side applications",
        java: "Java - Object-oriented programming language for enterprise applications and Android development",
        tensorflow: "TensorFlow - Open-source machine learning framework by Google",
        pytorch: "PyTorch - Deep learning framework with dynamic computational graphs",
        scikit: "Scikit-learn - Machine learning library for Python with simple and efficient tools",
        react: "React - JavaScript library for building user interfaces and single-page applications",
        nodejs: "Node.js - JavaScript runtime for server-side development",
        mongodb: "MongoDB - NoSQL document database for modern applications",
        html5: "HTML5 - Latest version of HyperText Markup Language for web structure",
        css3: "CSS3 - Cascading Style Sheets for web design and animations",
        github: "GitHub - Platform for version control and collaborative development",
        nlp: "NLP - Natural Language Processing for understanding human language",
        d3js: "D3.js - Data visualization library for creating interactive charts",
        flask: "Flask - Lightweight Python web framework for building APIs",
        aws: "AWS - Amazon Web Services cloud computing platform",
        docker: "Docker - Containerization platform for deploying applications",
        git: "Git - Distributed version control system for tracking code changes"
    };
    
    const message = techInfo[tech] || `Information about ${tech} technology`;
    showNotification(message, 'info');
} 