document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    const slideIntervalTime = 3000; // 3 seconds

    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = (slideIndex + totalSlides) % totalSlides;
        const offset = -currentSlide * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Auto slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    // Pause on hover
    slider.parentElement.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Resume on mouse leave
    slider.parentElement.addEventListener('mouseleave', startInterval);

    // Initialize
    startInterval();

    // Make slider responsive
    function handleResize() {
        const offset = -currentSlide * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    slider.parentElement.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, { passive: true });

    slider.parentElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startInterval();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to consider it a swipe
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swipe left - go to next slide
                nextSlide();
            } else {
                // Swipe right - go to previous slide
                goToSlide(currentSlide - 1);
            }
        }
    }
});
