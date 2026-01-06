document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    const slideIntervalTime = 3000; // 3 seconds
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    // Disable context menu
    window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        // Ensure slideIndex is within bounds
        currentSlide = (slideIndex + totalSlides) % totalSlides;
        currentTranslate = -currentSlide * 100;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    // Set slider position with smooth transition
    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}%)`;
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Auto slide
    function startInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            if (!isDragging) {  // Only auto-slide if not being interacted with
                nextSlide();
            }
        }, slideIntervalTime);
    }

    // Touch event handlers
    function touchStart(index) {
        return function(event) {
            isDragging = true;
            startPos = getPositionX(event);
            clearInterval(slideInterval);
            
            // Stop any ongoing animations
            cancelAnimationFrame(animationID);
        }
    }

    function touchEnd() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        
        // If moved enough to change slide
        if (movedBy < -50 && currentSlide < totalSlides - 1) {
            currentSlide += 1;
        }
        
        if (movedBy > 50 && currentSlide > 0) {
            currentSlide -= 1;
        }
        
        goToSlide(currentSlide);
        startInterval();
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + (currentPosition - startPos) / slider.offsetWidth * 100;
            
            // Prevent scrolling while swiping
            if (Math.abs(currentPosition - startPos) > 10) {
                event.preventDefault();
            }
            
            // Move the slider
            slider.style.transform = `translateX(${currentTranslate}%)`;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // Initialize event listeners
    function init() {
        // Add event listeners for mouse and touch events
        slider.parentElement.addEventListener('mousedown', touchStart(0));
        slider.parentElement.addEventListener('touchstart', touchStart(0), { passive: false });
        
        window.addEventListener('mouseup', touchEnd);
        window.addEventListener('touchend', touchEnd);
        
        window.addEventListener('mousemove', touchMove);
        window.addEventListener('touchmove', touchMove, { passive: false });
        
        // Prevent image drag
        const images = document.querySelectorAll('.slide img');
        images.forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
        
        // Start the auto-slide
        startInterval();
    }
    
    // Initialize the slider
    init();
    
    // Handle window resize
    function handleResize() {
        goToSlide(currentSlide);
    }
    
    window.addEventListener('resize', handleResize);
});
