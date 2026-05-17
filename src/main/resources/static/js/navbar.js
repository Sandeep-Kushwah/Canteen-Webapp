/* ============================================
   Navbar Component
   ============================================ */


/**
    * In Navbar
    * For login and register button toggle
*/

const authBtn = document.getElementById("login-register-click");
const link = document.getElementById("login-register-href");
const icon = link.querySelector("i");
const currentPage = window.location.pathname;

if (currentPage.includes("login")) {
    authBtn.innerText = "Register";
    link.href = "register";
    icon.className = "fas fa-user-plus";

} else if (currentPage.includes("register")) {
    authBtn.innerText = "Login";
    icon.className = "fas fa-sign-in-alt";
    link.href = "login";
}
//Above code to toggle the login and register button.

class Navbar {
    constructor() {
        this.navbar = null;
        this.toggle = null;
        this.mobileMenu = null;
        this.searchInput = null;
        this.init();
    }

    /**
     * Initialize navbar
     */
    init() {
        this.navbar = document.querySelector('.navbar');
        this.toggle = document.querySelector('.navbar-toggle');
        this.mobileMenu = document.querySelector('.navbar-mobile-menu');
        this.searchInput = document.querySelector('.navbar-search-input');

        this.setupEventListeners();
        this.setupActiveLink();
        this.setupSearch();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Mobile menu toggle
        if (this.toggle) {
            this.toggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileMenu &&
                !this.mobileMenu.contains(e.target) &&
                !this.toggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle scroll for navbar shadow
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    /**
     * Setup active link based on current page
     */
    setupActiveLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const links = document.querySelectorAll('.navbar-link, .navbar-mobile-link');

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage ||
                (currentPage === '' && href === 'home')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }



    /**
     * Setup search functionality
     */
    setupSearch() {
        if (this.searchInput) {
            let searchTimeout;

            this.searchInput.addEventListener('input', (e) => {
                scrollToMenu();
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.handleSearch(e.target.value);
                }, 300);
            });

            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }
    }

    /**
     * Handle search
     * @param {string} query - Search query
     */
    handleSearch(query) {
        // Emit custom event for search
        const event = new CustomEvent('navbar-search', {
            detail: { query }
        });
        document.dispatchEvent(event);
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('open');
        }
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.remove('open');
        }
    }

    /**
     * Handle scroll
     */
    handleScroll() {
        if (this.navbar) {
            if (window.scrollY > 50) {
                this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.navbar.style.boxShadow = 'var(--navbar-shadow)';
            }
        }
    }

    /**
     * Add link to navbar
     * @param {string} text - Link text
     * @param {string} href - Link href
     * @param {boolean} mobile - Add to mobile menu
     */
    addLink(text, href, mobile = false) {
        const link = document.createElement('a');
        link.className = mobile ? 'navbar-mobile-link' : 'navbar-link';
        link.href = href;
        link.textContent = text;

        if (mobile && this.mobileMenu) {
            this.mobileMenu.appendChild(link);
        } else {
            const menu = document.querySelector('.navbar-menu');
            if (menu) {
                menu.appendChild(link);
            }
        }
    }

    /**
     * Remove link from navbar
     * @param {string} href - Link href
     */
    removeLink(href) {
        const links = document.querySelectorAll('.navbar-link, .navbar-mobile-link');
        links.forEach(link => {
            if (link.getAttribute('href') === href) {
                link.remove();
            }
        });
    }
}


// Initialize navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Navbar();
    });
} else {
    new Navbar();
}
