/* ============================================
   Utility Functions
   ============================================ */

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency symbol (default: ₹)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = '₹') {
    return `${currency}${amount.toFixed(2)}`;
}

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @param {string} format - Format string
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'DD/MM/YYYY') {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year);
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Local storage helpers
 */
const Storage = {
    /**
     * Get item from local storage
     * @param {string} key - Storage key
     * @returns {any} Stored value
     */
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error getting from storage:', error);
            return null;
        }
    },

    /**
     * Set item in local storage
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting to storage:', error);
        }
    },

    /**
     * Remove item from local storage
     * @param {string} key - Storage key
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    },

    /**
     * Clear all items from local storage
     */
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }
};

/**
 * Cookie helpers
 */
const Cookie = {
    /**
     * Set cookie
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {number} days - Expiration days
     */
    set(name, value, days = 7) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    },

    /**
     * Get cookie
     * @param {string} name - Cookie name
     * @returns {string|null} Cookie value
     */
    get(name) {
        const nameEQ = `${name}=`;
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
    },

    /**
     * Delete cookie
     * @param {string} name - Cookie name
     */
    delete(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    }
};

/**
 * Validation helpers
 */
const Validator = {
    /**
     * Validate email
     * @param {string} email - Email to validate
     * @returns {boolean} Is valid email
     */
    isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Validate phone number
     * @param {string} phone - Phone number to validate
     * @returns {boolean} Is valid phone
     */
    isPhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    },

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {object} Validation result
     */
    validatePassword(password) {
        const result = {
            isValid: true,
            hasCapital: false,
            hasSpecial: false,
            hasNumber: false,
            hasMinLength: false
        };

        if (password.length >= 8) {
            result.hasMinLength = true;
        }

        if (/[A-Z]/.test(password)) {
            result.hasCapital = true;
        }

        if (/[!@#$%^&*()_+\-={}[\]|;:'",.<>/?]/.test(password)) {
            result.hasSpecial = true;
        }

        if (/\d/.test(password)) {
            result.hasNumber = true;
        }

        result.isValid = result.hasCapital && result.hasSpecial && 
                       result.hasNumber && result.hasMinLength;

        return result;
    }
};

/**
 * DOM helpers
 */
const DOM = {
    /**
     * Get element by selector
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element
     * @returns {Element|null} Element
     */
    get(selector, parent = document) {
        return parent.querySelector(selector);
    },

    /**
     * Get all elements by selector
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element
     * @returns {NodeList} Elements
     */
    getAll(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },

    /**
     * Create element
     * @param {string} tag - HTML tag
     * @param {object} attributes - Element attributes
     * @param {string} content - Element content
     * @returns {Element} Created element
     */
    create(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'innerHTML') {
                element.innerHTML = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });

        if (content) {
            element.textContent = content;
        }

        return element;
    },

    /**
     * Add event listener
     * @param {Element} element - Target element
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    on(element, event, handler) {
        element.addEventListener(event, handler);
    },

    /**
     * Remove event listener
     * @param {Element} element - Target element
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    off(element, event, handler) {
        element.removeEventListener(event, handler);
    },

    /**
     * Add class to element
     * @param {Element} element - Target element
     * @param {string} className - Class name
     */
    addClass(element, className) {
        element.classList.add(className);
    },

    /**
     * Remove class from element
     * @param {Element} element - Target element
     * @param {string} className - Class name
     */
    removeClass(element, className) {
        element.classList.remove(className);
    },

    /**
     * Toggle class on element
     * @param {Element} element - Target element
     * @param {string} className - Class name
     */
    toggleClass(element, className) {
        element.classList.toggle(className);
    },

    /**
     * Check if element has class
     * @param {Element} element - Target element
     * @param {string} className - Class name
     * @returns {boolean} Has class
     */
    hasClass(element, className) {
        return element.classList.contains(className);
    }
};

/**
 * Animation helpers
 */
const Animation = {
    /**
     * Fade in element
     * @param {Element} element - Target element
     * @param {number} duration - Animation duration
     */
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.transition = `opacity ${duration}ms ease-in-out`;
            element.style.opacity = '1';
        }, 10);
    },

    /**
     * Fade out element
     * @param {Element} element - Target element
     * @param {number} duration - Animation duration
     */
    fadeOut(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    },

    /**
     * Slide up element
     * @param {Element} element - Target element
     * @param {number} duration - Animation duration
     */
    slideUp(element, duration = 300) {
        element.style.transition = `transform ${duration}ms ease-in-out`;
        element.style.transform = 'translateY(-20px)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    },

    /**
     * Slide down element
     * @param {Element} element - Target element
     * @param {number} duration - Animation duration
     */
    slideDown(element, duration = 300) {
        element.style.transform = 'translateY(-20px)';
        element.style.opacity = '0';
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.transition = `transform ${duration}ms ease-in-out`;
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 10);
    }
};
