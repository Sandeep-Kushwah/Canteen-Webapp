package com.ccms.controllers;

import com.ccms.entities.User;
import com.ccms.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ccms.forms.LoginForm;
import com.ccms.forms.UserForm;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class PageController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/")
    public String defaultPage(Model model) {
        return "login";
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
    public String postMethodName(@ModelAttribute LoginForm loginUser) {
        boolean returnUser = userService.isUserValid(loginUser.getEmail(), loginUser.getPassword());
        System.out.println("In get-loigin method : "+returnUser);
        if (returnUser){
            System.out.println("User loged in");
            return "redirect:/index";
        }
        System.out.println("User does not login due to some isues");
        return "login";
    }

}
