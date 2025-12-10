// Sneaca Pitch Deck - Simple Navigation

let currentSlide = 1;
const totalSlides = 12;
let startTime = Date.now();
let timerInterval;

// Initialize when page loads
window.addEventListener('load', function() {
    console.log('Pitch deck loaded!');
    updateSlide();
    startTimer();
    setupEventListeners();
    showHelpBriefly();
});

function setupEventListeners() {
    // Previous button
    document.getElementById('prevBtn').addEventListener('click', previousSlide);

    // Next button
    document.getElementById('nextBtn').addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
            case 'f':
            case 'F':
                toggleFullscreen();
                break;
            case '?':
                toggleHelp();
                break;
        }

        // Number keys 1-9
        if (e.key >= '1' && e.key <= '9') {
            const num = parseInt(e.key);
            if (num <= totalSlides) {
                goToSlide(num);
            }
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    });
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        goToSlide(currentSlide - 1);
    }
}

function goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;

    // Remove active from current slide
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide - 1].classList.remove('active');

    // Update current slide
    currentSlide = slideNumber;

    // Add active to new slide
    slides[currentSlide - 1].classList.add('active');

    // Update UI
    updateSlide();

    // Scroll to top of slide content
    const slideContent = slides[currentSlide - 1].querySelector('.slide-content');
    if (slideContent) {
        slideContent.scrollTop = 0;
    }

    console.log('Now on slide:', currentSlide);
}

function updateSlide() {
    // Update counter
    document.getElementById('slideCounter').textContent = `${currentSlide} / ${totalSlides}`;

    // Update progress bar
    const progress = (currentSlide / totalSlides) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    // Update buttons
    document.getElementById('prevBtn').disabled = (currentSlide === 1);
    document.getElementById('nextBtn').disabled = (currentSlide === totalSlides);
}

function startTimer() {
    timerInterval = setInterval(function() {
        const elapsed = Date.now() - startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        const timerElement = document.getElementById('timer');
        timerElement.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        // Color coding
        if (minutes >= 7) {
            timerElement.style.color = '#e94560'; // Red
        } else if (minutes >= 6) {
            timerElement.style.color = '#ffd700'; // Yellow
        } else {
            timerElement.style.color = '#ffffff'; // White
        }
    }, 1000);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(function(err) {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

function toggleHelp() {
    document.getElementById('shortcutsHelp').classList.toggle('show');
}

function showHelpBriefly() {
    const help = document.getElementById('shortcutsHelp');
    help.classList.add('show');
    setTimeout(function() {
        help.classList.remove('show');
    }, 5000);
}

console.log('Sneaca Pitch Deck loaded! Use arrow keys or click buttons to navigate.');
console.log('Press ? for keyboard shortcuts');
