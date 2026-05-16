/* ============================================
   Shopping Cart Management
   ============================================ */

class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    /**
     * Initialize cart
     */
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
    }

    /**
     * Load cart from local storage
     */
    loadFromStorage() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.items = JSON.parse(storedCart);
            this.calculateTotal();
        }
    }

    /**
     * Save cart to local storage
     */
    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for add to cart events
        document.addEventListener('add-to-cart', (e) => {
            this.addItem(e.detail.id, e.detail.price, e.detail.name);
        });

        // Listen for remove from cart events
        document.addEventListener('remove-from-cart', (e) => {
            this.removeItem(e.detail.id);
        });

        // Listen for update quantity events
        document.addEventListener('update-quantity', (e) => {
            this.updateQuantity(e.detail.id, e.detail.quantity);
        });
    }

    /**
     * Add item to cart
     * @param {number} id - Item ID
     * @param {number} price - Item price
     * @param {string} name - Item name
     * @param {number} quantity - Item quantity (default: 1)
     */
    addItem(id, price, name, quantity = 1) {
        const existingItem = this.items.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id,
                price,
                name,
                quantity
            });
        }
        
        this.calculateTotal();
        this.saveToStorage();
        this.updateUI();
        
        toast.success(`${name} added to cart`);
    }

    /**
     * Remove item from cart
     * @param {number} id - Item ID
     */
    removeItem(id) {
        const item = this.items.find(item => item.id === id);
        this.items = this.items.filter(item => item.id !== id);
        
        this.calculateTotal();
        this.saveToStorage();
        this.updateUI();
        
        if (item) {
            toast.info(`${item.name} removed from cart`);
        }
    }

    /**
     * Update item quantity
     * @param {number} id - Item ID
     * @param {number} quantity - New quantity
     */
    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(id);
            } else if (quantity <= 5) {
                item.quantity = quantity;
                this.calculateTotal();
                this.saveToStorage();
                this.updateUI();
            } else {
                toast.warning('Maximum quantity is 5');
            }
        }
    }

    /**
     * Calculate cart total
     */
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    /**
     * Get cart total
     * @returns {number} Cart total
     */
    getTotal() {
        return this.total;
    }

    /**
     * Get cart item count
     * @returns {number} Item count
     */
    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * Get all items
     * @returns {Array} Cart items
     */
    getItems() {
        return this.items;
    }

    /**
     * Clear cart
     */
    clear() {
        this.items = [];
        this.total = 0;
        this.saveToStorage();
        this.updateUI();
        toast.info('Cart cleared');
    }

    /**
     * Update cart UI
     */
    updateUI() {
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
            cartCount.style.display = this.getItemCount() > 0 ? 'block' : 'none';
        }

        // Update cart total
        const cartTotal = document.querySelector('.cart-total');
        if (cartTotal) {
            cartTotal.textContent = `₹${this.total.toFixed(2)}`;
        }

        // Update cart items list
        const cartItems = document.querySelector('.cart-items');
        if (cartItems) {
            this.renderCartItems(cartItems);
        }

        // Emit cart update event
        const event = new CustomEvent('cart-updated', {
            detail: {
                items: this.items,
                total: this.total,
                count: this.getItemCount()
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Render cart items
     * @param {Element} container - Container element
     */
    renderCartItems(container) {
        if (this.items.length === 0) {
            container.innerHTML = '<p class="text-center">Your cart is empty</p>';
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="btn btn-sm btn-icon quantity-btn" data-action="decrease">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-sm btn-icon quantity-btn" data-action="increase">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-icon remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to cart items
        container.querySelectorAll('.cart-item').forEach(itemEl => {
            const id = parseInt(itemEl.dataset.id);
            
            itemEl.querySelector('[data-action="decrease"]').addEventListener('click', () => {
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity - 1);
                }
            });

            itemEl.querySelector('[data-action="increase"]').addEventListener('click', () => {
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity + 1);
                }
            });

            itemEl.querySelector('.remove-btn').addEventListener('click', () => {
                this.removeItem(id);
            });
        });
    }
}

// Initialize cart
const cart = new Cart();
