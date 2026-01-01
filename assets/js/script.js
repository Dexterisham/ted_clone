document.addEventListener('DOMContentLoaded', () => {
    console.log("TED Clone Loaded");

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', () => {
            navWrapper.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // --- Hero Slider ---
    const heroScrollContainer = document.querySelector('.hero-scroll-container');
    const heroPrevBtn = document.getElementById('heroPrevBtn');
    const heroNextBtn = document.getElementById('heroNextBtn');
    const heroSlides = document.querySelectorAll('.hero-slide');

    if (heroScrollContainer && heroSlides.length > 0) {
        let currentSlide = 0;
        const totalSlides = heroSlides.length;

        const updateHeroSlider = () => {
            heroScrollContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Logic to show/hide arrows if not cyclic (optional, or cyclic)
            // For now, let's keep it simple: 
            if (currentSlide === 0) {
                heroPrevBtn.classList.add('hidden');
            } else {
                heroPrevBtn.classList.remove('hidden');
            }
        };

        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', () => {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                    updateHeroSlider();
                } else {
                    // Loop back to start (optional)
                    currentSlide = 0; // Uncomment to loop
                    updateHeroSlider();
                }
            });
        }

        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateHeroSlider();
                }
            });
        }

        // Initialize state
        updateHeroSlider();
    }


    // --- Discover Slider Scroll with Arrow Logic ---
    const topicsWrapper = document.getElementById('topicsWrapper');
    const discPrevBtn = document.querySelector('.prev-btn'); // Assuming class name in index.html for discover arrows
    const discNextBtn = document.querySelector('.next-btn'); // You might need to add IDs to these in HTML or ensuring clearer selection

    // Warning: .prev-btn and .next-btn might be generic. Let's check HTML if we can allow specific selection.
    // In style.css/index.html they are .slider-btn .prev-btn. 
    // Let's assume there is only one "topicsWrapper" so getting its siblings or buttons nearby is key.

    // Better selection if possible, or just using the class
    const discoverSection = document.querySelector('.discover-section');
    if (discoverSection) {
        // Scoped selection
        const dPrev = discoverSection.querySelector('.prev-btn');
        const dNext = discoverSection.querySelector('.next-btn');
        const dWrapper = discoverSection.querySelector('.topics-wrapper');

        if (dWrapper && dPrev && dNext) {

            // Initial state: Hide left arrow
            dPrev.classList.add('hidden');

            const checkScroll = () => {
                const maxScrollLeft = dWrapper.scrollWidth - dWrapper.clientWidth;

                // Show/Hide Left Arrow
                if (dWrapper.scrollLeft > 20) {
                    dPrev.classList.remove('hidden');
                } else {
                    dPrev.classList.add('hidden');
                }

                // Optional: Hide Right Arrow if at end
                // if (Math.abs(dWrapper.scrollLeft - maxScrollLeft) < 5) { ... }
            };

            dWrapper.addEventListener('scroll', checkScroll);

            dNext.addEventListener('click', () => {
                dWrapper.scrollBy({ left: 300, behavior: 'smooth' });
                // We rely on scroll event to toggle arrow
            });

            dPrev.addEventListener('click', () => {
                dWrapper.scrollBy({ left: -300, behavior: 'smooth' });
            });

            // --- Drag to Scroll Logic ---
            let isDown = false;
            let startX;
            let scrollLeft;
            let isDragging = false; // Flag to distinguish click vs drag

            dWrapper.addEventListener('mousedown', (e) => {
                isDown = true;
                isDragging = false;
                dWrapper.classList.add('active');
                startX = e.pageX - dWrapper.offsetLeft;
                scrollLeft = dWrapper.scrollLeft;

                // Prevent default drag behavior of images/links
                e.preventDefault();
            });

            dWrapper.addEventListener('mouseleave', () => {
                isDown = false;
                dWrapper.classList.remove('active');
            });

            dWrapper.addEventListener('mouseup', () => {
                isDown = false;
                dWrapper.classList.remove('active');
                // We reset isDragging slightly later to allow click events to check it
                setTimeout(() => { isDragging = false; }, 0);
            });

            dWrapper.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - dWrapper.offsetLeft;
                const walk = (x - startX) * 2; // Scroll-fast multiplier

                // If moved significantly, mark as dragging
                if (Math.abs(walk) > 5) {
                    isDragging = true;
                }

                dWrapper.scrollLeft = scrollLeft - walk;
            });

            // Prevent link navigation if dragging
            const links = dWrapper.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    if (isDragging) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            });
        }
    }


    // --- Load More Functionality (Talks) ---
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const videoGrid = document.querySelector('.talks-section .video-grid'); // Be specific

    if (loadMoreBtn && videoGrid) {
        loadMoreBtn.addEventListener('click', () => {
            const originalText = loadMoreBtn.innerText;
            loadMoreBtn.innerText = 'Loading...';
            loadMoreBtn.disabled = true;

            setTimeout(() => {
                // Clone first 2 cards
                const cardsToClone = videoGrid.querySelectorAll('.video-card');
                for (let i = 0; i < 2; i++) {
                    if (cardsToClone[i]) {
                        const clone = cardsToClone[i].cloneNode(true);
                        videoGrid.appendChild(clone);
                    }
                }
                loadMoreBtn.innerText = originalText;
                loadMoreBtn.disabled = false;
            }, 800);
        });
    }

    // --- Add to List Interaction (Hero) ---
    // Update to handle potentially multiple buttons or specific hero one
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-secondary')) {
            const btn = e.target.closest('.btn-secondary');
            if (btn.innerText.includes('Add to list')) {
                // Toggle state
                if (btn.innerText.includes('Add to list')) {
                    btn.innerText = '✓ Added';
                    btn.style.backgroundColor = 'var(--color-black)';
                    btn.style.color = 'var(--color-white)';
                } else {
                    btn.innerText = '+ Add to list';
                    btn.style.backgroundColor = 'transparent';
                    btn.style.color = 'var(--color-black)';
                }
            }
        }
    });

});
