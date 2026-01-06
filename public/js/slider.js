document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    const slideIntervalTime = 5000; // 5 seconds

    // Create dots
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = (slideIndex + totalSlides) % totalSlides;
        const offset = -currentSlide * 100;
        slider.style.transform = `translateX(${offset}%)`;
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Reset the auto-slide timer
        resetInterval();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    // Reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Initialize
    createDots();
    startInterval();

    // Pause on hover
    slider.parentElement.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.parentElement.addEventListener('mouseleave', startInterval);

    // Make slider responsive
    function handleResize() {
        const offset = -currentSlide * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    window.addEventListener('resize', handleResize);
});
