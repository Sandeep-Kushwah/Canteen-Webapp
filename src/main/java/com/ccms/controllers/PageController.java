package com.ccms.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String defaultPage() {
        return "index";
    }

    @GetMapping("/home")
    public String indexPage() {
        return "index";
    }

    @GetMapping("/history")
    public String historyPage() {
        return "history";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/order")
    public String orderPage() {
        return "order";
    }

    @GetMapping("/wishlist")
    public String wishlistPage() {
        return "wishlist";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }

    // @PostMapping("/registerForm")
    // public String getRegistered(){
    // return "redirect:/register";
    // }
}
