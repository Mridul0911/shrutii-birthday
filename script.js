// ========================================
// PARTICLES ANIMATION
// ========================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// ========================================
// LOADING SCREEN ANIMATION
// ========================================

const loadingMessages = [
    'Initializing Shrutii.exe...',
    'Loading Travel Energy...',
    'Loading BTS Creativity...',
    'Loading Adventure Mode...',
    'Cuteness Level: SYSTEM OVERLOAD ⚠️'
];

let messageIndex = 0;
let charIndex = 0;
let currentMessage = '';

function typeLoadingText() {
    const loadingText = document.getElementById('loadingText');
    
    if (messageIndex < loadingMessages.length) {
        if (charIndex < loadingMessages[messageIndex].length) {
            currentMessage += loadingMessages[messageIndex][charIndex];
            loadingText.innerHTML = currentMessage;
            charIndex++;
            setTimeout(typeLoadingText, 50);
        } else {
            currentMessage += '<br>';
            loadingText.innerHTML = currentMessage;
            messageIndex++;
            charIndex = 0;
            setTimeout(typeLoadingText, 500);
        }
    } else {
        setTimeout(() => {
            document.getElementById('startBtn').classList.remove('hidden');
        }, 500);
    }
}

// ========================================
// START BUTTON - TRANSITION TO MAIN CONTENT
// ========================================

document.getElementById('startBtn').addEventListener('click', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        initializeSections();
    }, 500);
});

// ========================================
// TRAVEL MODE - LOCATION PINS
// ========================================

const pinMessages = {
    1: "You were never meant for ordinary. The world is your playground. 🌍",
    2: "Some people take trips. You create stories. ✨",
    3: "Next destination idea: A birthday adventure with me? 🎒"
};

document.querySelectorAll('.location-pin').forEach(pin => {
    pin.addEventListener('click', function() {
        const pinNumber = this.dataset.pin;
        showPopup(pinMessages[pinNumber]);
    });
});

// ========================================
// POPUP MODAL
// ========================================

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    
    popupMessage.textContent = message;
    popup.classList.remove('hidden');
    popup.classList.add('show');
}

document.querySelector('.popup-close').addEventListener('click', function() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 300);
});

document.getElementById('popup').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('show');
        setTimeout(() => {
            this.classList.add('hidden');
        }, 300);
    }
});

// ========================================
// CREATOR MODE - RENDERING ANIMATION
// ========================================

function animateRendering() {
    const progressFill = document.getElementById('progressFill');
    const renderPercent = document.getElementById('renderPercent');
    const renderComplete = document.getElementById('renderComplete');
    
    let progress = 0;
    const interval = setInterval(() => {
        if (progress <= 100) {
            progressFill.style.width = progress + '%';
            renderPercent.textContent = progress + '%';
            progress++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                renderComplete.classList.remove('hidden');
                renderComplete.classList.add('show');
            }, 500);
        }
    }, 30);
}

// ========================================
// HUSTLE MODE - ANIMATED STATS
// ========================================

function animateStats() {
    const statFills = document.querySelectorAll('.stat-fill');
    
    statFills.forEach(fill => {
        const percent = fill.dataset.percent;
        // Cap at 100% width even if the value is higher
        const displayPercent = Math.min(percent, 100);
        setTimeout(() => {
            fill.style.width = displayPercent + '%';
        }, 300);
    });
}

// ========================================
// BIRTHDAY MESSAGE - CONFETTI EFFECT
// ========================================

function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#ff6b9d', '#c44569', '#ffa07a', '#4facfe', '#ffd700', '#ff69b4'];
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new Confetti());
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(confetti => {
            confetti.update();
            confetti.draw();
        });
        
        requestAnimationFrame(animateConfetti);
    }
    
    animateConfetti();
}

// ========================================
// ACCEPT BUTTON - FINAL POPUP
// ========================================

document.getElementById('acceptBtn').addEventListener('click', function() {
    showPopup("Coffee is basic.\nLet's plan something better 😉");
});

// ========================================
// MUSIC TOGGLE
// ========================================

const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

musicToggle.addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play().catch(e => {
            console.log('Music autoplay prevented by browser');
        });
        this.classList.add('playing');
    } else {
        bgMusic.pause();
        this.classList.remove('playing');
    }
});

// ========================================
// INTERSECTION OBSERVER FOR SECTION ANIMATIONS
// ========================================

function initializeSections() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                if (section.id === 'creatorMode') {
                    animateRendering();
                } else if (section.id === 'hustleMode') {
                    animateStats();
                } else if (section.id === 'birthdayMessage') {
                    setTimeout(() => {
                        createConfetti();
                    }, 1000);
                }
                
                observer.unobserve(section);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// WINDOW RESIZE HANDLER FOR CONFETTI
// ========================================

window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

window.addEventListener('load', () => {
    createParticles();
    typeLoadingText();
});
