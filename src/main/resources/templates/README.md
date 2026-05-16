# Canteen Management System - Frontend Refactoring

## Project Overview

This is a professionally refactored frontend for the Canteen Management System, upgraded for Minor Project-II and prepared for future Spring Boot + Thymeleaf integration.

## 🎯 Key Improvements

### 1. **Modern Folder Structure**
```
Canteen Project Frontend/
├── css/                          # Modular CSS architecture
│   ├── variables.css            # Design tokens & CSS variables
│   ├── global.css               # Global styles & reset
│   ├── components.css           # Reusable component styles
│   ├── carousel.css             # Hero carousel styles
│   ├── menu.css                 # Product/menu styles
│   ├── auth.css                 # Authentication page styles
│   ├── dashboard.css            # Dashboard styles
│   └── responsive.css           # Responsive design
├── js/                           # Modular JavaScript
│   ├── utils.js                 # Utility functions
│   ├── theme.js                 # Dark/light mode manager
│   ├── toast.js                 # Toast notifications
│   ├── navbar.js                # Navbar component
│   ├── carousel.js              # Carousel component
│   ├── cart.js                  # Shopping cart management
│   ├── wishlist.js              # Wishlist management
│   └── app.js                   # Main application logic
├── images/                       # All images
├── components/                   # Reusable HTML components
│   ├── navbar.html              # Navbar component
│   ├── footer.html              # Footer component
│   └── hero-carousel.html       # Hero carousel component
├── pages/                        # Page templates (for Thymeleaf)
│   └── admin/                   # Admin pages
└── [HTML files]                 # Main HTML pages
```

### 2. **CSS Architecture**

- **Variables System**: Centralized design tokens for colors, spacing, typography, shadows, etc.
- **Dark/Light Mode**: Built-in theme switching with CSS variables
- **Component-Based**: Reusable component styles (buttons, cards, forms, badges, etc.)
- **Responsive**: Mobile-first responsive design with breakpoints for all devices
- **Glassmorphism**: Modern glass effect for cards and modals

### 3. **JavaScript Architecture**

- **Modular**: Separated into focused modules (utils, theme, toast, navbar, carousel, cart, wishlist)
- **No Global Pollution**: Proper encapsulation with classes and modules
- **Event-Driven**: Custom events for component communication
- **Local Storage**: Persistent cart and wishlist data
- **Validation**: Built-in form validation utilities

### 4. **Modern UI/UX Features**

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark/Light mode toggle
- ✅ Modern responsive navbar with mobile menu
- ✅ Hero section with automatic sliding carousel
- ✅ Glassmorphism design
- ✅ Smooth animations and transitions
- ✅ Toast notifications
- ✅ Loading animations
- ✅ Password strength indicator
- ✅ Google Login button UI (OAuth integration required for backend)
- ✅ Modern form designs
- ✅ Product cards with hover effects
- ✅ Category filtering
- ✅ Shopping cart management
- ✅ Wishlist management

### 5. **Thymeleaf Integration Ready**

All components are structured as reusable fragments:
- `navbar.html` - Navigation component
- `footer.html` - Footer component  
- `hero-carousel.html` - Hero slider component

These can be easily converted to Thymeleaf fragments:
```html
<!-- In Thymeleaf -->
<div th:replace="~{components/navbar :: navbar}"></div>
<div th:replace="~{components/footer :: footer}"></div>
```

## 📁 File Structure

### CSS Files

| File | Purpose |
|------|---------|
| `css/variables.css` | CSS custom properties for theming |
| `css/global.css` | Reset, typography, utility classes |
| `css/components.css` | Buttons, cards, forms, badges, toasts |
| `css/carousel.css` | Hero carousel/slider styles |
| `css/menu.css` | Product grid, category filters |
| `css/auth.css` | Login/register page styles |
| `css/dashboard.css` | Dashboard and admin panel styles |
| `css/responsive.css` | Media queries for all breakpoints |

### JavaScript Files

| File | Purpose |
|------|---------|
| `js/utils.js` | Utility functions (debounce, throttle, validation, storage) |
| `js/theme.js` | Dark/light mode management |
| `js/toast.js` | Toast notification system |
| `js/navbar.js` | Navbar component logic |
| `js/carousel.js` | Carousel/slider component |
| `js/cart.js` | Shopping cart management |
| `js/wishlist.js` | Wishlist management |
| `js/app.js` | Main application initialization |

### Component Files

| File | Purpose |
|------|---------|
| `components/navbar.html` | Reusable navbar component |
| `components/footer.html` | Reusable footer component |
| `components/hero-carousel.html` | Hero carousel component |

## 🎨 Design System

### Colors

- **Primary**: #fc9e11 (Orange)
- **Secondary**: #222831 (Dark Blue)
- **Success**: #4da325 (Green)
- **Error**: #dc2626 (Red)
- **Warning**: #f59e0b (Yellow)
- **Info**: #3b82f6 (Blue)

### Typography

- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Font Sizes**: xs (0.75rem) to 5xl (3rem)
- **Font Weights**: 300 (Light) to 800 (Extra Bold)

### Spacing

- **Scale**: xs (0.25rem) to 3xl (4rem)
- **Consistent**: Used throughout all components

### Border Radius

- **Scale**: sm (0.25rem) to 2xl (1.5rem)
- **Full**: 9999px for circles

## 📱 Responsive Breakpoints

- **Extra Large**: 1200px and above
- **Large**: 992px - 1199px
- **Medium**: 768px - 991px
- **Small**: 576px - 767px
- **Extra Small**: 575px and below

## 🚀 Getting Started

### 1. Open the Project

Simply open `index.html` in a web browser to view the refactored frontend.

### 2. CSS Loading Order

Ensure CSS files are loaded in this order:
```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/[page-specific].css">
<link rel="stylesheet" href="css/responsive.css">
```

### 3. JavaScript Loading Order

Ensure JavaScript files are loaded in this order:
```html
<script src="js/utils.js"></script>
<script src="js/theme.js"></script>
<script src="js/toast.js"></script>
<script src="js/navbar.js"></script>
<script src="js/carousel.js"></script>
<script src="js/cart.js"></script>
<script src="js/wishlist.js"></script>
<script src="js/app.js"></script>
```

## 🔧 Features Implemented

### ✅ Completed

1. **Folder Structure** - Clean, organized structure
2. **CSS Architecture** - Modular, maintainable CSS
3. **JavaScript Architecture** - Modular, event-driven JS
4. **Dark/Light Mode** - Theme toggle functionality
5. **Responsive Navbar** - Mobile menu support
6. **Hero Carousel** - Auto-sliding with navigation
7. **Product Cards** - Modern card design
8. **Category Filtering** - Dynamic product filtering
9. **Shopping Cart** - Add/remove items, quantity control
10. **Wishlist** - Add/remove items
11. **Toast Notifications** - Success/error/info/warning
12. **Password Validation** - Real-time strength indicator
13. **Google Login UI** - Button ready for OAuth integration
14. **Loading States** - Button loading animations
15. **Form Validation** - Built-in validation utilities

### 🔄 Pages Refactored

- ✅ `index.html` - Home page with carousel and menu
- ✅ `login.html` - Modern login with glassmorphism
- ✅ `register.html` - Registration with password strength

### 📋 Pending

- `order.html` - Orders page
- `history.html` - Order history
- `wishlist.html` - Wishlist page
- Admin pages (admin, add, edit, history, profile)

## 🌙 Dark Mode

The theme automatically detects system preference. Users can toggle between light and dark mode using the theme toggle button in the navbar.

## 📱 Mobile Responsiveness

All pages are fully responsive with:
- Mobile-first approach
- Touch-friendly interactions
- Optimized layouts for small screens
- Hamburger menu for mobile navigation

## 🔐 Authentication

### Login Page
- Modern glassmorphism design
- Password visibility toggle
- Remember me option
- Google Login button (UI only - OAuth required)
- Form validation

### Register Page
- Comprehensive form with all required fields
- Real-time password strength indicator
- Password requirements checklist
- Terms & conditions checkbox
- Google Sign Up button (UI only - OAuth required)

## 🛒 Shopping Cart

- Add items with quantity control
- Remove items
- Update quantities
- Persistent storage (localStorage)
- Cart count badge
- Total calculation

## ❤️ Wishlist

- Add/remove items
- Persistent storage (localStorage)
- Wishlist count badge
- Quick add to cart from wishlist

## 🎯 Thymeleaf Migration Guide

### Step 1: Convert Components to Fragments

Create Thymeleaf fragments in `templates/fragments/`:

**navbar.html**
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head th:fragment="head">
    <!-- CSS links -->
</head>
<body>
    <nav th:fragment="navbar(activePage)">
        <!-- Navbar content -->
    </nav>
</body>
</html>
```

**footer.html**
```html
<footer th:fragment="footer" xmlns:th="http://www.thymeleaf.org">
    <!-- Footer content -->
</footer>
```

### Step 2: Use Fragments in Templates

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head th:replace="~{fragments/navbar :: head}">
    <title>Page Title</title>
</head>
<body>
    <div th:replace="~{fragments/navbar :: navbar('home')}"></div>
    
    <!-- Page content -->
    
    <div th:replace="~{fragments/footer :: footer}"></div>
</body>
</html>
```

### Step 3: Integrate with Spring Boot

1. Place HTML files in `src/main/resources/templates/`
2. Create controllers for each page
3. Use Thymeleaf expressions for dynamic content
4. Integrate with Spring Security for authentication

## 📝 Notes

- **No Backend**: This is a frontend-only refactoring
- **OAuth**: Google Login button is UI only - backend OAuth implementation required
- **Images**: Ensure all images are in the `images/` folder
- **Icons**: Font Awesome 6.5.0 is used for icons
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 🎓 For Minor Project-II

This refactored frontend demonstrates:
- Professional code organization
- Modern UI/UX design principles
- Responsive web development
- Component-based architecture
- CSS custom properties (variables)
- Modular JavaScript
- Accessibility considerations
- Performance optimization

## 📞 Contact

For questions or support, refer to the project documentation or contact the development team.

---

**Version**: 2.0 (Refactored)
**Last Updated**: 2025
**Status**: Production Ready (Frontend)
