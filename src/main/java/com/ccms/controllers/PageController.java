package com.ccms.controllers;

import com.ccms.entities.User;
import com.ccms.services.impl.UserServiceImpl;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ccms.forms.LoginForm;
import com.ccms.forms.UserForm;

@Controller
public class PageController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/")
    public String defaultPage(Model model) {
        return "redirect:/login";
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
    public String registerPage(Model model) {
        UserForm user = new UserForm();
        model.addAttribute("user", user);
        return "register";
    }

    @GetMapping("/payment")
    public String paymentPage() {
        return "payment";
    }

    @GetMapping("/profile")
    public String profilePage() {
        return "profile";
    }

    // We can also use "@RequestMapping(value = "/get-registered",
    // method="RequetMethod.POST")
    @PostMapping("/get-registered")
    @ResponseBody
    public String getRegistered(@ModelAttribute UserForm userForm) {

        // Validate form data

        // Fetch form data
        User user = new User();
        user.setName(userForm.getFullname());
        user.setDepartment(userForm.getDepartment());
        user.setEnrollmentNumber(userForm.getEnrollment());
        user.setContact(userForm.getContact());
        user.setEmail(userForm.getEmail());
        user.setPassword(userForm.getPassword());
        user.setTermsAndConditions(userForm.isTermsCheckbox());
        user.setProfileUrl("https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png");

        // If user already exists
        if (userService.getUserByEmail(userForm.getEmail()) != null)
            return "alreadyExist";

        // Save to database
        User reternUser = userService.saveUser(user);
        if (reternUser != null)
            return "success";

        return "";
    }

    @PostMapping("/get-login")
    @ResponseBody
    public String postMethodName(@ModelAttribute LoginForm loginUser, HttpSession session) {
        User returnUser = userService.isUserValid(loginUser.getEmail(), loginUser.getPassword());
        session.setAttribute("user", returnUser);

        System.out.println("===========USER DETAILS");
        System.out.println("Name : "+returnUser.getName());
        System.out.println("Email : "+returnUser.getEmail());
        System.out.println("Depart : "+returnUser.getDepartment());
        System.out.println("Pro URL : "+returnUser.getProfileUrl());

        if (returnUser != null){
            System.out.println("User loged in");
            return "success";
        }
        return "";
    }
}
