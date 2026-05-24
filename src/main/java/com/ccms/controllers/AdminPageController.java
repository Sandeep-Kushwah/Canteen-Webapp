package com.ccms.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import com.ccms.entities.Items;
import com.ccms.entities.Orders;
import com.ccms.enums.OrderStatus;
import com.ccms.forms.ItemsForm;
import com.ccms.helper.OrderDetailsForAdmin;
import com.ccms.services.impl.AdminServiceImpl;
import com.ccms.services.impl.OrderServiceImpl;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/admin")
public class AdminPageController {

    @Autowired
    private addItemController addItemController;

    @Autowired
    private AdminServiceImpl adminService;

    @Autowired
    OrderServiceImpl orderRepo;

    @Autowired
    HttpSession sessionAuto;

    @Autowired
    OrderDetailsForAdmin orderDetailsForAdmin;

    @GetMapping("/")
    public String getLoginPage(Model model) {
        return "admin/login";
    }

    @PostMapping("/get-login")
    public String postMethodName(HttpSession session, @RequestParam String email, @RequestParam String password) {

        if (email.equals("itzsandeep111kushwah@gmail.com") && password.equals("Sandeep@123")) {
            session.setAttribute("isAdminLogedIn", true);
            return "redirect:/admin/home";
        }
        return "redirect:/admin/";
    }

    @GetMapping("/logout")
    public String getMethodName(HttpSession session) {
        session.invalidate();
        return "redirect:/admin/";
    }

    @GetMapping("/add")
    public String getAddPage(Model model,
            @SessionAttribute(value = "isAdminLogedIn", required = false) boolean isLogin) {

        if (isLogin == false)
            return "redirect:/admin/";

        ItemsForm itemsForm = new ItemsForm();
        model.addAttribute("itemForm", itemsForm);
        return "admin/add";
    }

    @GetMapping("/home") // For admin.html
    public String getAdminPage(HttpSession session, Model model,
            @SessionAttribute(value = "isAdminLogedIn", required = false) boolean isLogin) {

        if (isLogin == false)
            return "redirect:/admin/";

        model.addAttribute("orders", orderDetailsForAdmin.getOrderDetailsForAdmin(session));

        return "admin/admin";
    }

    @GetMapping("/edit")
    public String getEditPage(Model model,
            @SessionAttribute(value = "isAdminLogedIn", required = false) boolean isLogin) {

        if (isLogin == false)
            return "redirect:/admin/";

        model.addAttribute("allItems", adminService.getAllItems());
        return "admin/edit";
    }

    @GetMapping("/history")
    public String getHistroyPage(@SessionAttribute(value = "isAdminLogedIn", required = false) boolean isLogin, Model model) {
        if (isLogin == false)
            return "redirect:/admin/";

        model.addAttribute("orders", orderDetailsForAdmin.getOrderDetailsForAdmin(sessionAuto));

        return "admin/history";
    }

    @GetMapping("/adminLogin")
    public String getLoginPageThroughUrl() {
        return "admin/login";
    }

    @PostMapping("/uploadItem")
    @ResponseBody
    public String getItemDetails(@RequestParam("imageFile") MultipartFile file, @ModelAttribute ItemsForm itemsForm) {
        String imageUrl = addItemController.uploadImageAndGetUrl(file, itemsForm);

        System.out.println("AA gya hu");

        Items items = new Items();
        items.setItemName(itemsForm.getItemName());
        items.setCategory(itemsForm.getCategory());
        items.setBadge(itemsForm.getBadge());
        items.setPrice(itemsForm.getPrice());
        items.setDiscription(itemsForm.getDiscription());
        items.setImageFile(imageUrl);

        if (adminService.addItem(items))
            return "success";

        return "";
    }

    @PostMapping("/adminAction")
    @ResponseBody
    public String postMethodName(@RequestParam int id, @RequestParam OrderStatus status) {

        System.out.println("Action button Id : " + id);
        System.out.println("Action button Status : " + status);

        if (orderRepo.setOrderStatus(id, status))
            return "success";

        return "failed";
    }
}
