package com.ccms.forms;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserForm {
    private String fullname;
    private String department;
    private String enrollment;
    private String contact;
    private String email;
    private String password;
    // In getter it will : isTermsCheckbox
    private boolean termsCheckbox;
}
