tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#ecfeff',
                    100: '#cffafe',
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                    800: '#155e75',
                    900: '#164e63',
                },
                vibe: {
                    500: '#10b981',
                    600: '#059669',
                    glow: '#34d399'
                },
                darkbg: '#0b0f19',
                cardbg: '#111827',
                cardborder: '#1f2937'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mobile-menu-btn').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    const portfolioCarousel = document.querySelector('[data-portfolio-carousel]');
    if (portfolioCarousel) {
        const slides = Array.from(portfolioCarousel.querySelectorAll('[data-portfolio-slide]'));
        const indicators = Array.from(portfolioCarousel.querySelectorAll('[data-portfolio-go]'));
        const status = portfolioCarousel.querySelector('[data-portfolio-status]');
        let activeSlide = 0;

        function showPortfolioSlide(index) {
            activeSlide = (index + slides.length) % slides.length;
            slides.forEach(function(slide, slideIndex) {
                const isActive = slideIndex === activeSlide;
                slide.classList.toggle('hidden', !isActive);
                slide.setAttribute('aria-hidden', String(!isActive));
            });
            indicators.forEach(function(indicator, indicatorIndex) {
                const isActive = indicatorIndex === activeSlide;
                indicator.classList.toggle('bg-brand-400', isActive);
                indicator.classList.toggle('bg-gray-600', !isActive);
                indicator.setAttribute('aria-current', String(isActive));
            });
            status.textContent = String(activeSlide + 1).padStart(2, '0') + ' / ' +
                String(slides.length).padStart(2, '0');
        }

        portfolioCarousel.querySelector('[data-portfolio-prev]').addEventListener('click', function() {
            showPortfolioSlide(activeSlide - 1);
        });
        portfolioCarousel.querySelector('[data-portfolio-next]').addEventListener('click', function() {
            showPortfolioSlide(activeSlide + 1);
        });
        indicators.forEach(function(indicator) {
            indicator.addEventListener('click', function() {
                showPortfolioSlide(Number(indicator.dataset.portfolioGo));
            });
        });
        portfolioCarousel.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                showPortfolioSlide(activeSlide - 1);
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                showPortfolioSlide(activeSlide + 1);
            }
        });
    }
});