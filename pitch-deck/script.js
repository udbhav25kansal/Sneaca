// ===================================
// Sneaca Pitch Deck - JavaScript
// ===================================

class PitchDeck {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 15;
        this.startTime = null;
        this.timerInterval = null;
        this.isTimerRunning = false;

        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.updateUI();
        this.startTimer();
    }

    cacheDOM() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideCounter = document.getElementById('slideCounter');
        this.timer = document.getElementById('timer');
        this.progressBar = document.getElementById('progressBar');
        this.shortcutsHelp = document.getElementById('shortcutsHelp');
    }

    bindEvents() {
        // Button clicks
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });

        // Prevent default keyboard scrolling
        window.addEventListener('keydown', (e) => {
            if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);
    }

    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ': // Space
                this.nextSlide();
                break;
            case 'ArrowLeft':
                this.previousSlide();
                break;
            case 'Home':
                this.goToSlide(1);
                break;
            case 'End':
                this.goToSlide(this.totalSlides);
                break;
            case 't':
            case 'T':
                this.toggleTimer();
                break;
            case '?':
                this.toggleHelp();
                break;
            default:
                // Number keys 1-9 to jump to slides
                if (e.key >= '1' && e.key <= '9') {
                    const slideNum = parseInt(e.key);
                    if (slideNum <= this.totalSlides) {
                        this.goToSlide(slideNum);
                    }
                }
        }
    }

    handleSwipe(touchStartX, touchEndX) {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - next slide
                this.nextSlide();
            } else {
                // Swiped right - previous slide
                this.previousSlide();
            }
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;

        // Remove active class from current slide
        this.slides[this.currentSlide - 1].classList.remove('active');

        // Add prev class if going backwards
        if (slideNumber < this.currentSlide) {
            this.slides[this.currentSlide - 1].classList.add('prev');
            setTimeout(() => {
                this.slides[this.currentSlide - 1].classList.remove('prev');
            }, 600);
        }

        // Update current slide
        this.currentSlide = slideNumber;

        // Add active class to new slide
        this.slides[this.currentSlide - 1].classList.add('active');

        // Update UI
        this.updateUI();

        // Scroll to top of slide content
        const slideContent = this.slides[this.currentSlide - 1].querySelector('.slide-content');
        if (slideContent) {
            slideContent.scrollTop = 0;
        }
    }

    updateUI() {
        // Update slide counter
        this.slideCounter.textContent = `${this.currentSlide} / ${this.totalSlides}`;

        // Update progress bar
        const progress = (this.currentSlide / this.totalSlides) * 100;
        this.progressBar.style.width = `${progress}%`;

        // Update navigation buttons
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
    }

    startTimer() {
        this.startTime = Date.now();
        this.isTimerRunning = true;

        this.timerInterval = setInterval(() => {
            if (this.isTimerRunning) {
                this.updateTimer();
            }
        }, 1000);
    }

    updateTimer() {
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        this.timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Change timer color based on time
        if (minutes >= 7) {
            this.timer.style.color = '#e94560'; // Red when over time
        } else if (minutes >= 6) {
            this.timer.style.color = '#ffd700'; // Yellow when approaching time limit
        } else {
            this.timer.style.color = '#ffffff'; // White normally
        }
    }

    toggleTimer() {
        this.isTimerRunning = !this.isTimerRunning;

        if (this.isTimerRunning) {
            this.timer.style.opacity = '1';
        } else {
            this.timer.style.opacity = '0.5';
        }
    }

    resetTimer() {
        this.startTime = Date.now();
        this.updateTimer();
    }

    toggleHelp() {
        this.shortcutsHelp.classList.toggle('show');
    }
}

// ===================================
// Presentation Features
// ===================================

class PresentationFeatures {
    constructor(pitchDeck) {
        this.pitchDeck = pitchDeck;
        this.init();
    }

    init() {
        this.setupFullscreen();
        this.setupPresenterNotes();
        this.setupAutoAdvance();
        this.addEasterEggs();
    }

    setupFullscreen() {
        // Add fullscreen on F key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'f' || e.key === 'F') {
                this.toggleFullscreen();
            }
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    setupPresenterNotes() {
        // Press 'N' to show slide notes (future feature)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'n' || e.key === 'N') {
                console.log(`Slide ${this.pitchDeck.currentSlide} notes: [Feature coming soon]`);
            }
        });
    }

    setupAutoAdvance() {
        // Press 'A' to toggle auto-advance mode
        let autoAdvanceInterval = null;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'a' || e.key === 'A') {
                if (autoAdvanceInterval) {
                    clearInterval(autoAdvanceInterval);
                    autoAdvanceInterval = null;
                    console.log('Auto-advance disabled');
                } else {
                    // Auto-advance every 30 seconds
                    autoAdvanceInterval = setInterval(() => {
                        this.pitchDeck.nextSlide();
                        if (this.pitchDeck.currentSlide === this.pitchDeck.totalSlides) {
                            clearInterval(autoAdvanceInterval);
                            autoAdvanceInterval = null;
                        }
                    }, 30000);
                    console.log('Auto-advance enabled (30s per slide)');
                }
            }
        });
    }

    addEasterEggs() {
        // Konami code easter egg
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    activateEasterEgg() {
        // Fun animation on logo
        const logo = document.querySelector('.logo-mark');
        if (logo) {
            logo.style.animation = 'none';
            setTimeout(() => {
                logo.style.animation = 'spin 1s ease-in-out';
            }, 10);
        }
        console.log('🎉 Easter egg activated! You found the Konami code!');
    }
}

// ===================================
// Accessibility Features
// ===================================

class AccessibilityFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.setupAriaLabels();
        this.setupFocusManagement();
        this.setupReducedMotion();
    }

    setupAriaLabels() {
        // Add ARIA labels for screen readers
        document.querySelectorAll('.slide').forEach((slide, index) => {
            slide.setAttribute('role', 'region');
            slide.setAttribute('aria-label', `Slide ${index + 1}`);
        });

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.setAttribute('aria-label', 'Previous slide');
        nextBtn.setAttribute('aria-label', 'Next slide');
    }

    setupFocusManagement() {
        // Ensure keyboard focus is managed properly
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Allow tab navigation
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    setupReducedMotion() {
        // Respect user's reduced motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
            // Reduce animations in CSS via this class
        }
    }
}

// ===================================
// Analytics & Tracking
// ===================================

class PresentationAnalytics {
    constructor(pitchDeck) {
        this.pitchDeck = pitchDeck;
        this.slideTimeSpent = {};
        this.currentSlideStartTime = null;
        this.init();
    }

    init() {
        this.trackSlideChanges();
        this.trackPresentationDuration();

        // Log analytics on presentation end
        window.addEventListener('beforeunload', () => {
            this.logAnalytics();
        });
    }

    trackSlideChanges() {
        // Track time spent on each slide
        setInterval(() => {
            const currentSlide = this.pitchDeck.currentSlide;

            if (!this.slideTimeSpent[currentSlide]) {
                this.slideTimeSpent[currentSlide] = 0;
            }

            this.slideTimeSpent[currentSlide] += 1;
        }, 1000);
    }

    trackPresentationDuration() {
        // Already handled by main timer
        return;
    }

    logAnalytics() {
        console.log('=== Presentation Analytics ===');
        console.log('Total slides:', this.pitchDeck.totalSlides);
        console.log('Slides viewed:', Object.keys(this.slideTimeSpent).length);
        console.log('Time per slide:', this.slideTimeSpent);

        const totalTime = Object.values(this.slideTimeSpent).reduce((a, b) => a + b, 0);
        const avgTime = totalTime / Object.keys(this.slideTimeSpent).length;
        console.log(`Average time per slide: ${avgTime.toFixed(1)}s`);
        console.log('===============================');
    }
}

// ===================================
// Initialize Application
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize main pitch deck
    const pitchDeck = new PitchDeck();

    // Initialize additional features
    const features = new PresentationFeatures(pitchDeck);
    const accessibility = new AccessibilityFeatures();
    const analytics = new PresentationAnalytics(pitchDeck);

    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .keyboard-nav *:focus {
            outline: 3px solid var(--success);
            outline-offset: 3px;
        }

        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);

    // Show help on first load
    setTimeout(() => {
        const shortcutsHelp = document.getElementById('shortcutsHelp');
        shortcutsHelp.classList.add('show');

        // Hide after 5 seconds
        setTimeout(() => {
            shortcutsHelp.classList.remove('show');
        }, 5000);
    }, 1000);

    // Console welcome message
    console.log('%cSneaca Pitch Deck', 'font-size: 24px; font-weight: bold; color: #e94560;');
    console.log('%cKeyboard Shortcuts:', 'font-size: 16px; font-weight: bold;');
    console.log('→ or Space: Next slide');
    console.log('←: Previous slide');
    console.log('Home: First slide');
    console.log('End: Last slide');
    console.log('1-9: Jump to slide number');
    console.log('T: Toggle timer');
    console.log('F: Fullscreen');
    console.log('?: Toggle help');
    console.log('A: Auto-advance mode');
    console.log('\n%cHidden Features:', 'font-size: 14px; font-style: italic;');
    console.log('Try the Konami code! ↑↑↓↓←→←→BA');
});

// ===================================
// Export for external use
// ===================================

window.SneacaPitchDeck = {
    version: '1.0.0',
    description: 'Sneaca Pitch Deck Presentation System',
    author: 'Sneaca Team',
    features: {
        slides: 15,
        keyboardNavigation: true,
        touchSupport: true,
        timer: true,
        analytics: true,
        accessibility: true
    }
};
