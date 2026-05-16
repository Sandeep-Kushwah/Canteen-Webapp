package com.ccms.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    //Different fields work as table column.
    @Id
    private int id;
    private String name;
    private String enrollNo;
    private String contact;
    private String email;
    private String password;
    private boolean termsAndConditions = true;
}
