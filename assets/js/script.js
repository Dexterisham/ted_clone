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

    // --- Hero Slider (Mobile/Responsive) ---
    const heroTrack = document.getElementById('heroTrack');
    const heroPrevBtn = document.querySelector('.mobile-nav-btn.prev');
    const heroNextBtn = document.querySelector('.mobile-nav-btn.next');
    const heroDotsContainer = document.querySelector('.hero-dots');
    const heroSlides = document.querySelectorAll('.hero-slide');

    if (heroTrack && heroSlides.length > 0) {
        // Generate Dots if not present or just manage active state
        // (HTML has 5 static dots, but let's ensure they match slide count if we want to be dynamic, 
        //  or just use the existing ones if they match. 5 slides in HTML, 5 dots in HTML.)

        const dots = heroDotsContainer.querySelectorAll('.dot');

        // Scroll Event to Update Dots
        const updateActiveDot = () => {
            const scrollLeft = heroTrack.scrollLeft;
            const slideWidth = heroTrack.clientWidth;
            const index = Math.round(scrollLeft / slideWidth);

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        heroTrack.addEventListener('scroll', updateActiveDot);

        // Arrow Navigation
        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', () => {
                const slideWidth = heroTrack.clientWidth;
                heroTrack.scrollBy({ left: slideWidth, behavior: 'smooth' });
            });
        }

        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', () => {
                const slideWidth = heroTrack.clientWidth;
                heroTrack.scrollBy({ left: -slideWidth, behavior: 'smooth' });
            });
        }

        // Dot Navigation
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const slideWidth = heroTrack.clientWidth;
                heroTrack.scrollTo({ left: slideWidth * i, behavior: 'smooth' });
            });
        });

        // Initial check
        updateActiveDot();
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
