package com.ccms.controllers;

import com.ccms.Application;
import com.ccms.entities.User;
import com.ccms.repository.UserRepo;
import com.ccms.services.impl.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ccms.forms.UserForm;

@Controller
public class PageController {

    private final UserRepo userRepo;
    private final Application application;
    
    @Autowired
    private UserServiceImpl userService;

    PageController(Application application, UserRepo userRepo) {
        this.application = application;
        this.userRepo = userRepo;
    }

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
    public String registerPage(Model model) {
        UserForm user = new UserForm();
        user.setFullname("Ravan Hu Main");
        model.addAttribute("user", user);
        return "register";
    }

    @GetMapping("/payment")
    public String paymentPage() {
        return "payment";
    }

    // We can also use "@RequestMapping(value = "/get-registered",
    // method="RequetMethod.POST")
    @PostMapping("/get-registered")
    @ResponseBody
    public String getRegistered(@ModelAttribute UserForm userForm) {
        // System.out.println(user);

        User user = new User();
        user.setName(userForm.getFullname());
        user.setDepartment(userForm.getDepartment());
        user.setEnrollmentNumber(userForm.getEnrollment());
        user.setContact(userForm.getContact());
        user.setEmail(userForm.getEmail());
        user.setPassword(userForm.getPassword());
        user.setTermsAndConditions(userForm.isTermsCheckbox());

        //Fetch form data
        //Validate form data
        //Save to database
        userService.saveUser(user);

        //message="Registration successfull"
        //Redirect to login page

        return "success"; // redirect:/register
    }
}
