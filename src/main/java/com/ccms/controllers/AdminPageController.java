package com.ccms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.ccms.forms.ItemsForm;


@Controller
@RequestMapping("/admin")
public class AdminPageController {

    @Autowired
    private addItemController addItemController;

    @GetMapping("/")
    public String getLoginPage() {
        return "admin/login";
    }
    
    @GetMapping("/add")
    public String getAddPage(Model model) {
        ItemsForm itemsForm = new ItemsForm();
        model.addAttribute("itemForm", itemsForm);
        return "admin/add";
    }

    @GetMapping("/home") // For admin.html
    public String getAdminPage() {
        return "admin/admin";
    }
    
    @GetMapping("/edit")
    public String getEditPage() {
        return "admin/edit";
    }
    
    @GetMapping("/history")
    public String getHistroyPage() {
        return "admin/history";
    }

    @GetMapping("/login")
    public String getLoginPageThroughUrl() {
        return "admin/login";
    }

    @GetMapping("/profile")
    public String getProfilePage() {
        return "admin/profile";
    }

    @PostMapping("/uploadItem")
    public String getItemDetails(@RequestParam("imageFile") MultipartFile file, @ModelAttribute ItemsForm itemsForm) {
        String url = addItemController.uploadImageAndGetUrl(file, itemsForm);
        
        return "redirect:/admin/add";
    }
    
}
