/* ============================================
   Wishlist Management
   ============================================ */

class Wishlist {
    constructor() {
        this.items = [];
        this.init();
    }

    /**
     * Initialize wishlist
     */
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.updateUI();
    }

    /**
     * Load wishlist from local storage
     */
    loadFromStorage() {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            this.items = JSON.parse(storedWishlist);
        }
    }

    /**
     * Save wishlist to local storage
     */
    saveToStorage() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for wishlist toggle events
        document.addEventListener('wishlist-toggle', (e) => {
            this.toggleItem(e.detail.id, e.detail.price, e.detail.name);
        });
    }

    /**
     * Toggle item in wishlist
     * @param {number} id - Item ID
     * @param {number} price - Item price
     * @param {string} name - Item name
     */
    toggleItem(id, price, name) {
        const existingIndex = this.items.findIndex(item => item.id === id);
        
        if (existingIndex !== -1) {
            this.items.splice(existingIndex, 1);
            toast.info(`${name} removed from wishlist`);
        } else {
            this.items.push({ id, price, name });
            toast.success(`${name} added to wishlist`);
        }
        
        this.saveToStorage();
        this.updateUI();
    }

    /**
     * Check if item is in wishlist
     * @param {number} id - Item ID
     * @returns {boolean} Is in wishlist
     */
    isInWishlist(id) {
        return this.items.some(item => item.id === id);
    }

    /**
     * Remove item from wishlist
     * @param {number} id - Item ID
     */
    removeItem(id) {
        const item = this.items.find(item => item.id === id);
        this.items = this.items.filter(item => item.id !== id);
        
        this.saveToStorage();
        this.updateUI();
        
        if (item) {
            toast.info(`${item.name} removed from wishlist`);
        }
    }

    /**
     * Get all items
     * @returns {Array} Wishlist items
     */
    getItems() {
        return this.items;
    }

    /**
     * Get item count
     * @returns {number} Item count
     */
    getItemCount() {
        return this.items.length;
    }

    /**
     * Clear wishlist
     */
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateUI();
        toast.info('Wishlist cleared');
    }

    /**
     * Update wishlist UI
     */
    updateUI() {
        // Update wishlist count
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = this.getItemCount();
            wishlistCount.style.display = this.getItemCount() > 0 ? 'block' : 'none';
        }

        // Update wishlist heart icons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const id = parseInt(btn.dataset.id);
            const icon = btn.querySelector('i');
            
            if (this.isInWishlist(id)) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid', 'active');
            } else {
                icon.classList.remove('fa-solid', 'active');
                icon.classList.add('fa-regular');
            }
        });

        // Render wishlist items on wishlist page
        const wishlistContainer = document.querySelector('.wishlist-items');
        if (wishlistContainer) {
            this.renderWishlistItems(wishlistContainer);
        }

        // Emit wishlist update event
        const event = new CustomEvent('wishlist-updated', {
            detail: {
                items: this.items,
                count: this.getItemCount()
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Render wishlist items
     * @param {Element} container - Container element
     */
    renderWishlistItems(container) {
        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="empty-wishlist text-center">
                    <i class="fas fa-heart fa-3x"></i>
                    <h3>Your wishlist is empty</h3>
                    <p>Add items you love to your wishlist</p>
                    <a href="index.html" class="btn btn-primary">Browse Menu</a>
                </div>
            `;
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="card wishlist-item" data-id="${item.id}">
                <div class="card-body">
                    <div class="wishlist-item-info">
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-price">₹${item.price}</p>
                    </div>
                    <div class="wishlist-item-actions">
                        <button class="btn btn-primary add-to-cart-btn" data-id="${item.id}" data-price="${item.price}" data-name="${item.name}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-danger remove-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to wishlist items
        container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const price = parseFloat(btn.dataset.price);
                const name = btn.dataset.name;
                
                cart.addItem(id, price, name);
            });
        });

        container.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                this.removeItem(id);
            });
        });
    }
}

// Initialize wishlist
const wishlist = new Wishlist();
