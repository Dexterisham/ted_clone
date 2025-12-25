document.addEventListener('DOMContentLoaded', () => {
    console.log("TED Clone Loaded");

    // --- Load More Functionality ---
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const videoGrid = document.querySelector('.video-grid');

    if (loadMoreBtn && videoGrid) {
        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading (show 'Loading...' text)
            const originalText = loadMoreBtn.innerText;
            loadMoreBtn.innerText = 'Loading...';
            loadMoreBtn.disabled = true;

            setTimeout(() => {
                // Duplicate the first 2 cards for demo purposes
                const cardsToClone = videoGrid.querySelectorAll('.video-card');

                // Clone first 2 cards
                for (let i = 0; i < 2; i++) {
                    if (cardsToClone[i]) {
                        const clone = cardsToClone[i].cloneNode(true);
                        // Optional: Add a fade-in animation class if we had one
                        videoGrid.appendChild(clone);
                    }
                }

                // Restore button
                loadMoreBtn.innerText = originalText;
                loadMoreBtn.disabled = false;

                // Scroll to the new items (optional, but nice)
            }, 800);
        });
    }

    // --- Add to List Interaction ---
    const addToListBtns = document.querySelectorAll('.btn-secondary'); // Targeting the "Add to list" specific one would be better with an ID, but let's filter or just grab the one in Hero

    // Specifically finding the hero "Add to list" button
    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
        const addBtn = Array.from(heroActions.querySelectorAll('.btn-secondary')).find(b => b.innerText.includes('Add to list'));

        if (addBtn) {
            addBtn.addEventListener('click', () => {
                if (addBtn.innerText.includes('Add to list')) {
                    addBtn.innerText = '✓ Added to list';
                    addBtn.style.backgroundColor = 'var(--color-black)';
                    addBtn.style.color = 'var(--color-white)';
                } else {
                    addBtn.innerText = '+ Add to list';
                    addBtn.style.backgroundColor = 'transparent';
                    addBtn.style.color = 'var(--color-black)';
                }
            });
        }
    }
});
