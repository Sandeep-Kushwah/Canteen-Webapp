package com.ccms.controllers;

import java.io.IOException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;
import com.ccms.forms.ItemsForm;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Controller
public class addItemController {
    @Autowired
    private Cloudinary cloudinary;

    public String uploadImageAndGetUrl(MultipartFile file,ItemsForm items) {
        return uploadImageOnCloud(file);
    }

    private String uploadImageOnCloud(MultipartFile file) {

        try {
            Map uploadResult = cloudinary.uploader()
                    .upload(file.getBytes(),
                            ObjectUtils.emptyMap());
            String imageUrl = uploadResult.get("url").toString();
            return imageUrl;
        } catch (IOException e) {
            System.out.println("Excepiton in addItemController class.");
            return null;
        }
    }
}
