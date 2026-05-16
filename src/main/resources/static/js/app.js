/* ============================================
   Main Application JavaScript
   ============================================ */

// Import utilities (if using modules)
// import { debounce, throttle, formatCurrency, Storage, Validator, DOM, Animation } from './utils.js';

class App {
    constructor() {
        this.init();
    }

    /**
     * Initialize application
     */
    init() {
        this.setupGlobalEventListeners();
        this.setupFormValidation();
        this.setupPasswordToggle();
        this.setupLoadingStates();
    }

    /**
     * Setup global event listeners
     */
    setupGlobalEventListeners() {
        // Handle theme changes
        document.addEventListener('themechange', (e) => {
            console.log('Theme changed to:', e.detail.theme);
        });

        // Handle navbar search
        document.addEventListener('navbar-search', (e) => {
            this.handleSearch(e.detail.query);
        });

        // Handle carousel slide changes
        document.addEventListener('carousel-slide-change', (e) => {
            console.log('Slide changed to:', e.detail.currentIndex);
        });
    }

    /**
     * Setup form validation
     */
    setupFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    /**
     * Validate form
     * @param {HTMLFormElement} form - Form to validate
     * @returns {boolean} Is valid
     */
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showInputError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearInputError(input);
                
                // Email validation
                if (input.type === 'email' && !this.isEmail(input.value)) {
                    this.showInputError(input, 'Please enter a valid email');
                    isValid = false;
                }
                
                // Phone validation
                if (input.type === 'tel' && !this.isPhone(input.value)) {
                    this.showInputError(input, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    /**
     * Show input error
     * @param {HTMLInputElement} input - Input element
     * @param {string} message - Error message
     */
    showInputError(input, message) {
        input.classList.add('error');
        
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('form-error')) {
            errorElement = document.createElement('span');
            errorElement.className = 'form-error';
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        
        errorElement.textContent = message;
    }

    /**
     * Clear input error
     * @param {HTMLInputElement} input - Input element
     */
    clearInputError(input) {
        input.classList.remove('error');
        
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.remove();
        }
    }

    /**
     * Setup password toggle
     */
    setupPasswordToggle() {
        const toggleButtons = document.querySelectorAll('.password-toggle');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const input = button.previousElementSibling;
                const icon = button.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
    }

    /**
     * Setup loading states
     */
    setupLoadingStates() {
        const buttons = document.querySelectorAll('[data-loading]');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const originalText = button.innerHTML;
                const loadingText = button.dataset.loading || 'Loading...';
                
                button.disabled = true;
                button.innerHTML = `<span class="spinner spinner-sm"></span> ${loadingText}`;
                
                // Simulate loading (remove this in production)
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = originalText;
                }, 2000);
            });
        });
    }

    /**
     * Handle search
     * @param {string} query - Search query
     */
    handleSearch(query) {
        console.log('Search query:', query);
        // Implement search logic here
    }

    /**
     * Validate email
     * @param {string} email - Email to validate
     * @returns {boolean} Is valid email
     */
    isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Validate phone number
     * @param {string} phone - Phone to validate
     * @returns {boolean} Is valid phone
     */
    isPhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new App();
    });
} else {
    window.app = new App();
}
