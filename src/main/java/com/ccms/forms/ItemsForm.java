package com.ccms.forms;

import org.springframework.web.multipart.MultipartFile;
import com.ccms.enums.Badge;
import com.ccms.enums.Category;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemsForm {

    private String itemName;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Badge badge;

    private int price;

    private String discription;

    private MultipartFile imageFile;
}
