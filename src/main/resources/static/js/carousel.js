/* ============================================
   Carousel/Hero Slider Component
   ============================================ */

class Carousel {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        if (!this.container) {
            console.error('Carousel container not found');
            return;
        }

        this.options = {
            autoplay: options.autoplay !== false,
            interval: options.interval || 5000,
            showDots: options.showDots !== false,
            showArrows: options.showArrows !== false,
            pauseOnHover: options.pauseOnHover !== false,
            ...options
        };

        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.currentSlide = 0;
        this.isPlaying = this.options.autoplay;
        this.timer = null;

        this.init();
    }

    /**
     * Initialize carousel
     */
    init() {
        if (this.slides.length === 0) {
            console.warn('No slides found in carousel');
            return;
        }

        this.setupStructure();
        this.setupEventListeners();
        this.goToSlide(0);

        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    /**
     * Setup carousel structure
     */
    setupStructure() {
        // Add navigation arrows
        if (this.options.showArrows) {
            this.createArrows();
        }

        // Add dots navigation
        if (this.options.showDots) {
            this.createDots();
        }

        // Add slide classes
        this.slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
        });
    }

    /**
     * Create navigation arrows
     */
    createArrows() {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-arrow carousel-prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.setAttribute('aria-label', 'Previous slide');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-arrow carousel-next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.setAttribute('aria-label', 'Next slide');

        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);

        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());
    }

    /**
     * Create dots navigation
     */
    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';

        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });

            dotsContainer.appendChild(dot);
        });

        this.container.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.carousel-dot');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Pause on hover
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => {
                this.stopAutoplay();
            });

            this.container.addEventListener('mouseleave', () => {
                if (this.options.autoplay) {
                    this.startAutoplay();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    /**
     * Handle swipe gesture
     * @param {number} startX - Start X position
     * @param {number} endX - End X position
     */
    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const threshold = 50;

        if (diff > threshold) {
            this.next();
        } else if (diff < -threshold) {
            this.prev();
        }
    }

    /**
     * Go to specific slide
     * @param {number} index - Slide index
     */
    goToSlide(index) {
        if (index < 0) {
            index = this.slides.length - 1;
        } else if (index >= this.slides.length) {
            index = 0;
        }

        // Hide current slide
        this.slides[this.currentSlide].style.display = 'none';
        this.slides[this.currentSlide].classList.remove('active');

        // Show new slide
        this.currentSlide = index;
        this.slides[this.currentSlide].style.display = 'block';
        this.slides[this.currentSlide].classList.add('active');

        // Update dots
        if (this.dots) {
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Emit slide change event
        const event = new CustomEvent('carousel-slide-change', {
            detail: { currentIndex: index, totalSlides: this.slides.length }
        });
        this.container.dispatchEvent(event);
    }

    /**
     * Go to next slide
     */
    next() {
        this.goToSlide(this.currentSlide + 1);
    }

    /**
     * Go to previous slide
     */
    prev() {
        this.goToSlide(this.currentSlide - 1);
    }

    /**
     * Start autoplay
     */
    startAutoplay() {
        this.stopAutoplay();
        this.isPlaying = true;
        this.timer = setInterval(() => {
            this.next();
        }, this.options.interval);
    }

    /**
     * Stop autoplay
     */
    stopAutoplay() {
        this.isPlaying = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    /**
     * Toggle autoplay
     */
    toggleAutoplay() {
        if (this.isPlaying) {
            this.stopAutoplay();
        } else {
            this.startAutoplay();
        }
    }

    /**
     * Destroy carousel
     */
    destroy() {
        this.stopAutoplay();
        
        // Remove event listeners
        const arrows = this.container.querySelectorAll('.carousel-arrow');
        arrows.forEach(arrow => arrow.remove());

        const dots = this.container.querySelector('.carousel-dots');
        if (dots) dots.remove();
    }
}

// Auto-initialize carousels with data-carousel attribute
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(container => {
        const options = {
            autoplay: container.dataset.autoplay !== 'false',
            interval: parseInt(container.dataset.interval) || 5000,
            showDots: container.dataset.showDots !== 'false',
            showArrows: container.dataset.showArrows !== 'false',
            pauseOnHover: container.dataset.pauseOnHover !== 'false'
        };
        new Carousel(container, options);
    });
});
