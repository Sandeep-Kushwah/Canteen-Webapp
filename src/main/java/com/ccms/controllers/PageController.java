package com.ccms.controllers;

import com.ccms.entities.Items;
import com.ccms.entities.Orders;
import com.ccms.entities.User;
import com.ccms.services.OrderService;
import com.ccms.services.impl.AdminServiceImpl;
import com.ccms.services.impl.UserServiceImpl;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.ccms.forms.LoginForm;
import com.ccms.forms.UserForm;
import com.ccms.helper.OrderDetails;

import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PageController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private AdminServiceImpl adminService;

    @Autowired
    HttpSession sessionAuto;

    @Autowired
    OrderService orderService;

    @Autowired
    OrderDetails orderDetails;

    @GetMapping("/")
    public String defaultPage(Model model) {
        return "redirect:/login";
    }

    @GetMapping("/home")
    public String indexPage(Model model) {

        model.addAttribute("allItems", adminService.getAllItems());

        return isLogin("index");
    }

    @GetMapping("/history")
    public String historyPage(Model model, @SessionAttribute(value = "user", required = false) User user) {

        if(user == null)
            return "redirect:/login";

        List<Orders> orders = orderDetails.getOrderDetails(sessionAuto, user);
        model.addAttribute("order", orders);

        for (Orders orders2 : orders) {
            System.out.println("Item name : "+orders2.getItem().getItemName());
            System.out.println("Item price : "+orders2.getItem().getPrice());
        }

        return isLogin("history");
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/logout")
    public String logoutPage(HttpSession session) {
        session.invalidate();
        System.out.println("Session Invalidate in LogoutPage : " + sessionAuto);
        return "redirect:/login";
    }

    @GetMapping("/deleteAccount")
    public String deleteAccount(HttpSession session) {
        User user = (User) session.getAttribute("user");
        System.out.println("Session in delete method is : " + session);
        System.out.println("Session object : " + session.getAttribute("user"));
        User check = userService.deleteUserByEmail(user.getEmail());
        System.out.println("What by default return : " + check);
        return "redirect:/login";
    }

    @GetMapping("/order")
    public String orderPage(Model model, @SessionAttribute(value = "user", required = false) User user) {

        if (user == null)
            return "redirect:/login";

        List<Orders> orders = orderDetails.getOrderDetails(sessionAuto, user);

        model.addAttribute("orders", orders);
        return "order";
    }

    @GetMapping("/hide")
    public String hideMeMethod(@RequestParam int id) {

        orderService.setHideMe(id);

        return "redirect:/order";
    }

    @GetMapping("/wishlist")
    public String wishlistPage() {
        return isLogin("wishlist");
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

    @PostMapping("/placeOrder")
    @ResponseBody
    public String getMethodName(
            @RequestParam int id,
            @RequestParam int price,
            @RequestParam int quantity,
            @RequestParam int total,
            @SessionAttribute User user) throws Exception {

        LocalDateTime currentTime = LocalDateTime.now();
        Optional<Items> item = adminService.getItemById(id);

        Orders order = new Orders();
        order.setUser(user);
        order.setItem(item.get());
        order.setOrderTime(currentTime);
        order.setQuantity(quantity);
        order.setTotalPrice(total);

        if (orderService.placeOrder(order))
            return "success";
        return "";
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
        System.out.println("Name : " + returnUser.getName());
        System.out.println("Email : " + returnUser.getEmail());
        System.out.println("Depart : " + returnUser.getDepartment());
        System.out.println("Pro URL : " + returnUser.getProfileUrl());

        if (returnUser != null) {
            return "success";
        }
        return "";
    }

    public String isLogin(String route) {

        System.out.println("Is Login method : " + sessionAuto.getAttribute("user"));
        if (sessionAuto.getAttribute("user") == null)
            return "redirect:/login";
        return route;
    }

    // The core utility helper to grab the session anywhere
    // private HttpSession getCurrentSession() {
    // ServletRequestAttributes attributes = (ServletRequestAttributes)
    // RequestContextHolder.getRequestAttributes();
    // if (attributes != null) {
    // HttpServletRequest request = attributes.getRequest();
    // // passing 'false' means: return the existing session, don't create a new one
    // if
    // // it doesn't exist
    // return request.getSession(false);
    // }
    // return null;
    // }
}
