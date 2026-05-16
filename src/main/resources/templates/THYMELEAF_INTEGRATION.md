# Thymeleaf Integration Guide

## Overview

This guide explains how to integrate the refactored frontend with Spring Boot and Thymeleaf. The frontend has been designed with reusable components that can be easily converted to Thymeleaf fragments.

## Project Structure for Thymeleaf

```
src/main/resources/
├── templates/
│   ├── fragments/
│   │   ├── navbar.html          # Navbar fragment
│   │   ├── footer.html          # Footer fragment
│   │   ├── hero-carousel.html   # Hero carousel fragment
│   │   └── head.html            # Common head fragment
│   ├── layout/
│   │   └── main.html            # Main layout template
│   ├── index.html               # Home page
│   ├── login.html               # Login page
│   ├── register.html            # Registration page
│   ├── order.html               # Orders page
│   ├── history.html             # Order history page
│   ├── wishlist.html            # Wishlist page
│   └── admin/
│       ├── admin.html           # Admin dashboard
│       ├── add.html             # Add item page
│       ├── edit.html            # Edit items page
│       ├── history.html         # Admin history page
│       └── profile.html         # Admin profile page
└── static/
    ├── css/
    │   ├── variables.css
    │   ├── global.css
    │   ├── components.css
    │   ├── carousel.css
    │   ├── menu.css
    │   ├── auth.css
    │   ├── dashboard.css
    │   └── responsive.css
    ├── js/
    │   ├── utils.js
    │   ├── theme.js
    │   ├── toast.js
    │   ├── navbar.js
    │   ├── carousel.js
    │   ├── cart.js
    │   ├── wishlist.js
    │   └── app.js
    └── images/
        └── canteen logo.jpg
```

## Step 1: Create Thymeleaf Fragments

### 1.1 Head Fragment (`templates/fragments/head.html`)

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head th:fragment="head(title)">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title th:text="${title}">Canteen Management System</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <!-- CSS Architecture -->
    <link rel="stylesheet" th:href="@{/css/variables.css}">
    <link rel="stylesheet" th:href="@{/css/global.css}">
    <link rel="stylesheet" th:href="@{/css/components.css}">
    <link rel="stylesheet" th:href="@{/css/responsive.css}">
    
    <!-- Page-specific CSS -->
    <th:block th:if="${pageCss}">
        <link rel="stylesheet" th:href="@{/css/${pageCss}}">
    </th:block>
</head>
</html>
```

### 1.2 Navbar Fragment (`templates/fragments/navbar.html`)

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <!-- Navbar Component -->
    <nav class="navbar" th:fragment="navbar(activePage, isAdmin)">
        <div class="navbar-container">
            <!-- Brand -->
            <div class="navbar-brand">
                <a th:href="@{/}" class="navbar-logo-link">
                    <img th:src="@{/images/canteen logo.jpg}" alt="Canteen Logo" class="navbar-logo">
                </a>
                <span th:if="${isAdmin}" class="badge badge-primary admin-badge">Admin</span>
            </div>

            <!-- Navigation Links -->
            <div class="navbar-menu">
                <a th:href="@{/}" class="navbar-link" th:classappend="${activePage == 'home' ? 'active' : ''}" data-page="home">
                    <i class="fas fa-home"></i> Home
                </a>
                <a th:href="@{/order}" class="navbar-link" th:classappend="${activePage == 'orders' ? 'active' : ''}" data-page="orders">
                    <i class="fas fa-shopping-bag"></i> Orders
                    <span class="badge badge-primary wishlist-count hidden">0</span>
                </a>
                <a th:href="@{/wishlist}" class="navbar-link" th:classappend="${activePage == 'wishlist' ? 'active' : ''}" data-page="wishlist">
                    <i class="fas fa-heart"></i> WishList
                    <span class="badge badge-primary wishlist-count hidden">0</span>
                </a>
                <a th:href="@{/history}" class="navbar-link" th:classappend="${activePage == 'history' ? 'active' : ''}" data-page="history">
                    <i class="fas fa-history"></i> History
                </a>
                <th:block th:if="${isAdmin}">
                    <a th:href="@{/admin}" class="navbar-link" th:classappend="${activePage == 'admin' ? 'active' : ''}" data-page="admin">
                        <i class="fas fa-shopping-bag"></i> Orders
                    </a>
                    <a th:href="@{/admin/add}" class="navbar-link" th:classappend="${activePage == 'add' ? 'active' : ''}" data-page="add">
                        <i class="fas fa-plus"></i> Add
                    </a>
                    <a th:href="@{/admin/edit}" class="navbar-link" th:classappend="${activePage == 'edit' ? 'active' : ''}" data-page="edit">
                        <i class="fas fa-edit"></i> Edit
                    </a>
                    <a th:href="@{/admin/history}" class="navbar-link" th:classappend="${activePage == 'admin-history' ? 'active' : ''}" data-page="admin-history">
                        <i class="fas fa-history"></i> History
                    </a>
                    <a th:href="@{/admin/profile}" class="navbar-link" th:classappend="${activePage == 'profile' ? 'active' : ''}" data-page="profile">
                        <i class="fas fa-user"></i> Profile
                    </a>
                </th:block>
            </div>

            <!-- Search -->
            <div class="navbar-search">
                <input type="search" 
                       class="navbar-search-input" 
                       placeholder="Search..." 
                       id="search-input">
                <i class="fas fa-search search-icon"></i>
            </div>

            <!-- Actions -->
            <div class="navbar-actions">
                <!-- Theme Toggle -->
                <button class="theme-toggle" aria-label="Toggle theme">
                    <i class="fas fa-moon theme-toggle-icon" id="theme-icon"></i>
                </button>

                <!-- Cart -->
                <a th:href="@{/order}" class="btn btn-primary btn-sm cart-btn">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="badge badge-primary cart-count hidden">0</span>
                </a>

                <!-- Login/Profile or Logout -->
                <th:block th:if="${user == null}">
                    <a th:href="@{/login}" class="btn btn-secondary btn-sm login-btn">
                        <i class="fas fa-user"></i>
                        <span class="login-text">Login</span>
                    </a>
                </th:block>
                <th:block th:if="${user != null}">
                    <a th:href="@{/logout}" class="btn btn-danger btn-sm">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </th:block>

                <!-- Mobile Menu Toggle -->
                <button class="navbar-toggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="navbar-mobile-menu">
            <a th:href="@{/}" class="navbar-mobile-link" th:classappend="${activePage == 'home' ? 'active' : ''}">
                <i class="fas fa-home"></i> Home
            </a>
            <a th:href="@{/order}" class="navbar-mobile-link" th:classappend="${activePage == 'orders' ? 'active' : ''}">
                <i class="fas fa-shopping-bag"></i> Orders
            </a>
            <a th:href="@{/wishlist}" class="navbar-mobile-link" th:classappend="${activePage == 'wishlist' ? 'active' : ''}">
                <i class="fas fa-heart"></i> WishList
            </a>
            <a th:href="@{/history}" class="navbar-mobile-link" th:classappend="${activePage == 'history' ? 'active' : ''}">
                <i class="fas fa-history"></i> History
            </a>
            <th:block th:if="${isAdmin}">
                <a th:href="@{/admin}" class="navbar-mobile-link" th:classappend="${activePage == 'admin' ? 'active' : ''}">
                    <i class="fas fa-shopping-bag"></i> Orders
                </a>
                <a th:href="@{/admin/add}" class="navbar-mobile-link" th:classappend="${activePage == 'add' ? 'active' : ''}">
                    <i class="fas fa-plus"></i> Add
                </a>
                <a th:href="@{/admin/edit}" class="navbar-mobile-link" th:classappend="${activePage == 'edit' ? 'active' : ''}">
                    <i class="fas fa-edit"></i> Edit
                </a>
                <a th:href="@{/admin/history}" class="navbar-mobile-link" th:classappend="${activePage == 'admin-history' ? 'active' : ''}">
                    <i class="fas fa-history"></i> History
                </a>
                <a th:href="@{/admin/profile}" class="navbar-mobile-link" th:classappend="${activePage == 'profile' ? 'active' : ''}">
                    <i class="fas fa-user"></i> Profile
                </a>
            </th:block>
            <hr class="HR">
            <th:block th:if="${user == null}">
                <a th:href="@{/login}" class="navbar-mobile-link">
                    <i class="fas fa-user"></i> Login
                </a>
            </th:block>
            <th:block th:if="${user != null}">
                <a th:href="@{/logout}" class="navbar-mobile-link">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </th:block>
        </div>
    </nav>
</body>
</html>
```

### 1.3 Footer Fragment (`templates/fragments/footer.html`)

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <!-- Footer Component -->
    <footer class="footer" th:fragment="footer">
        <div class="footer-container">
            <div class="footer-content">
                <!-- Contact Section -->
                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <p>
                        <i class="fas fa-phone"></i>
                        <a href="tel:+918889414008">+91 8889414008</a>
                    </p>
                    <p>
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:collegecanteen@gmail.com">collegecanteen@gmail.com</a>
                    </p>
                </div>

                <!-- Canteen Info -->
                <div class="footer-section">
                    <h3>About Canteen</h3>
                    <p>
                        Your favorite campus canteen serving delicious food 
                        with love and care.
                    </p>
                </div>

                <!-- Opening Hours -->
                <div class="footer-section">
                    <h3>Opening Hours</h3>
                    <p><i class="fas fa-clock"></i> Everyday</p>
                    <p>09:00 AM - 10:00 PM</p>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <p>&copy; 2025 Canteen Management System. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>
```

### 1.4 Hero Carousel Fragment (`templates/fragments/hero-carousel.html`)

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <!-- Hero Carousel Component -->
    <section class="hero-carousel" th:fragment="hero-carousel(slides)">
        <div class="carousel-container">
            <div class="carousel-slides">
                <div class="carousel-slide" th:each="slide : ${slides}">
                    <img th:src="${slide.image}" th:alt="${slide.title}">
                    <div class="carousel-overlay">
                        <div class="carousel-content">
                            <h1 th:text="${slide.title}">Welcome to Canteen</h1>
                            <p th:text="${slide.description}">Delicious food at your fingertips</p>
                            <a th:href="${slide.link}" class="btn btn-primary" th:text="${slide.buttonText}">Order Now</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Arrows -->
            <button class="carousel-arrow carousel-prev">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="carousel-arrow carousel-next">
                <i class="fas fa-chevron-right"></i>
            </button>

            <!-- Dots -->
            <div class="carousel-dots">
                <button class="carousel-dot" th:each="slide, stat : ${slides}" 
                        th:classappend="${stat.index == 0 ? 'active' : ''}"></button>
            </div>

            <!-- Progress Bar -->
            <div class="carousel-progress">
                <div class="carousel-progress-bar"></div>
            </div>
        </div>
    </section>
</body>
</html>
```

## Step 2: Create Main Layout Template

### 2.1 Main Layout (`templates/layout/main.html`)

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org"
      th:fragment="layout(title, content, pageCss, activePage, isAdmin)">
<head th:replace="~{fragments/head :: head(${title})}">
</head>
<body>
    <!-- Navbar -->
    <div th:replace="~{fragments/navbar :: navbar(${activePage}, ${isAdmin})}"></div>

    <!-- Main Content -->
    <main th:replace="${content}"></main>

    <!-- Footer -->
    <div th:replace="~{fragments/footer :: footer}"></div>

    <!-- Modular JavaScript -->
    <script th:src="@{/js/utils.js}"></script>
    <script th:src="@{/js/theme.js}"></script>
    <script th:src="@{/js/toast.js}"></script>
    <script th:src="@{/js/navbar.js}"></script>
    <script th:src="@{/js/app.js}"></script>

    <!-- Page-specific JavaScript -->
    <th:block th:if="${pageJs}">
        <script th:src="@{/js/${pageJs}}"></script>
    </th:block>
</body>
</html>
```

## Step 3: Convert Pages to Thymeleaf Templates

### 3.1 Home Page (`templates/index.html`)

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head th:replace="~{fragments/head :: head('Home - Canteen Management System')}">
    <link rel="stylesheet" th:href="@{/css/carousel.css}">
    <link rel="stylesheet" th:href="@{/css/menu.css}">
</head>
<body>
    <!-- Navbar -->
    <div th:replace="~{fragments/navbar :: navbar('home', false)}"></div>

    <!-- Hero Carousel -->
    <div th:replace="~{fragments/hero-carousel :: hero-carousel(${slides})}"></div>

    <!-- Menu Section -->
    <div class="container" style="padding-top: var(--spacing-3xl);">
        <div class="section-header">
            <div>
                <h1>Our Menu</h1>
                <p>Delicious food items for you</p>
            </div>
        </div>

        <!-- Category Filter -->
        <div class="category-filter">
            <div class="category-filter-container">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="burger">Burger</button>
                <button class="filter-btn" data-filter="food">Food</button>
                <button class="filter-btn" data-filter="juice">Juice</button>
                <button class="filter-btn" data-filter="chocolate">Chocolate</button>
            </div>
        </div>

        <!-- Product Grid -->
        <div class="product-grid">
            <div class="product-card" th:each="product : ${products}" 
                 th:data-category="${product.category}" 
                 th:data-id="${product.id}" 
                 th:data-price="${product.price}" 
                 th:data-name="${product.name}">
                <div class="product-image">
                    <img th:src="${product.image}" th:alt="${product.name}">
                    <span class="product-badge" th:if="${product.badge}" th:text="${product.badge}">Popular</span>
                    <button class="product-wishlist" th:data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="product-body">
                    <p class="product-category" th:text="${product.category}">Food</p>
                    <h3 class="product-name" th:text="${product.name}">Product Name</h3>
                    <p class="product-description" th:text="${product.description}">Description</p>
                    <div class="product-footer">
                        <span class="product-price" th:text="'₹' + ${product.price}">₹0</span>
                        <div class="product-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn minus">-</button>
                                <span class="quantity-value">1</span>
                                <button class="quantity-btn plus">+</button>
                            </div>
                            <button class="add-to-cart-btn" 
                                    th:data-id="${product.id}" 
                                    th:data-price="${product.price}" 
                                    th:data-name="${product.name}">
                                <i class="fas fa-cart-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div th:replace="~{fragments/footer :: footer}"></div>

    <!-- JavaScript -->
    <script th:src="@{/js/utils.js}"></script>
    <script th:src="@{/js/theme.js}"></script>
    <script th:src="@{/js/toast.js}"></script>
    <script th:src="@{/js/navbar.js}"></script>
    <script th:src="@{/js/cart.js}"></script>
    <script th:src="@{/js/wishlist.js}"></script>
    <script th:src="@{/js/app.js}"></script>
</body>
</html>
```

### 3.2 Login Page (`templates/login.html`)

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head th:replace="~{fragments/head :: head('Login - Canteen Management System')}">
    <link rel="stylesheet" th:href="@{/css/auth.css}">
</head>
<body>
    <!-- Navbar -->
    <div th:replace="~{fragments/navbar :: navbar('login', false)}"></div>

    <!-- Login Section -->
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <h1>Welcome Back</h1>
                <p>Login to access your account</p>
            </div>

            <form class="auth-form" th:action="@{/login}" th:object="${loginForm}" method="post">
                <!-- Username -->
                <div class="form-group">
                    <label class="form-label" for="username">Username</label>
                    <div class="auth-input-group">
                        <input type="text" 
                               class="form-input" 
                               id="username" 
                               th:field="*{username}" 
                               placeholder="Enter your username"
                               required>
                        <i class="fas fa-user auth-input-icon"></i>
                    </div>
                    <p class="form-error" th:if="${#fields.hasErrors('username')}" th:errors="*{username}">Username is required</p>
                </div>

                <!-- Password -->
                <div class="form-group">
                    <label class="form-label" for="password">Password</label>
                    <div class="auth-input-group">
                        <input type="password" 
                               class="form-input" 
                               id="password" 
                               th:field="*{password}" 
                               placeholder="Enter your password"
                               required>
                        <i class="fas fa-eye auth-input-icon password-toggle"></i>
                    </div>
                    <p class="form-error" th:if="${#fields.hasErrors('password')}" th:errors="*{password}">Password is required</p>
                </div>

                <!-- Remember Me -->
                <div class="form-group">
                    <label class="form-checkbox">
                        <input type="checkbox" th:field="*{rememberMe}">
                        <span>Remember me</span>
                    </label>
                </div>

                <!-- Login Button -->
                <button type="submit" class="auth-submit-btn">
                    <i class="fas fa-sign-in-alt"></i>
                    Login
                </button>

                <!-- Divider -->
                <div class="auth-divider">or continue with</div>

                <!-- Social Login -->
                <div class="auth-social-login">
                    <button type="button" class="auth-google-btn">
                        <img src="https://www.google.com/favicon.ico" alt="Google">
                        Sign in with Google
                    </button>
                </div>

                <!-- Register Link -->
                <div class="auth-footer">
                    Don't have an account? 
                    <a th:href="@{/register}">Register here</a>
                </div>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <div th:replace="~{fragments/footer :: footer}"></div>

    <!-- JavaScript -->
    <script th:src="@{/js/utils.js}"></script>
    <script th:src="@{/js/theme.js}"></script>
    <script th:src="@{/js/toast.js}"></script>
    <script th:src="@{/js/navbar.js}"></script>
    <script th:src="@{/js/app.js}"></script>
</body>
</html>
```

## Step 4: Spring Boot Controller Setup

### 4.1 Main Controller (`src/main/java/com/canteen/controller/MainController.java`)

```java
package com.canteen.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Home");
        model.addAttribute("activePage", "home");
        model.addAttribute("isAdmin", false);
        // Add slides data
        model.addAttribute("slides", getSlides());
        // Add products data
        model.addAttribute("products", getProducts());
        return "index";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("title", "Login");
        model.addAttribute("activePage", "login");
        model.addAttribute("isAdmin", false);
        model.addAttribute("loginForm", new LoginForm());
        return "login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("title", "Register");
        model.addAttribute("activePage", "register");
        model.addAttribute("isAdmin", false);
        model.addAttribute("registerForm", new RegisterForm());
        return "register";
    }

    // Other page mappings...
}
```

## Step 5: Data Models

### 5.1 Product Model

```java
package com.canteen.model;

public class Product {
    private Long id;
    private String name;
    private String category;
    private Double price;
    private String description;
    private String image;
    private String badge;

    // Constructors, getters, setters
}
```

## Step 6: Configuration

### 6.1 Application Properties (`application.properties`)

```properties
# Server Configuration
server.port=8080

# Thymeleaf Configuration
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
spring.thymeleaf.cache=false

# Static Resources
spring.web.resources.static-locations=classpath:/static/

# Database Configuration (add your database config)
spring.datasource.url=jdbc:mysql://localhost:3306/canteen_db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
```

## Step 7: Security Configuration

### 7.1 Security Config (`src/main/java/com/canteen/config/SecurityConfig.java`)

```java
package com.canteen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/login", "/register", "/css/**", "/js/**", "/images/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/", true)
                .permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout")
                .permitAll()
            );
        
        return http.build();
    }
}
```

## Migration Checklist

- [ ] Move HTML files to `src/main/resources/templates/`
- [ ] Move CSS files to `src/main/resources/static/css/`
- [ ] Move JavaScript files to `src/main/resources/static/js/`
- [ ] Move images to `src/main/resources/static/images/`
- [ ] Create Thymeleaf fragments in `templates/fragments/`
- [ ] Convert pages to use Thymeleaf expressions
- [ ] Create Spring Boot controllers
- [ ] Configure Spring Security
- [ ] Set up database connection
- [ ] Test all pages with Thymeleaf rendering

## Notes

- All CSS and JavaScript paths should use `@{/path}` syntax for Thymeleaf
- Use `th:if`, `th:each`, `th:text` for dynamic content
- Form submissions should use `th:action` and `th:object`
- Security annotations should be added to controller methods
- Consider using Thymeleaf Layout Dialect for more complex layouts

## Benefits of This Approach

1. **Reusable Components**: Navbar, footer, and carousel are defined once and reused
2. **Maintainability**: Changes to components are reflected across all pages
3. **Separation of Concerns**: HTML, CSS, and JavaScript are properly separated
4. **Dynamic Content**: Thymeleaf expressions enable server-side rendering
5. **Security**: Spring Security integration for authentication and authorization
6. **Professional**: Clean, maintainable code structure suitable for Minor Project-II
