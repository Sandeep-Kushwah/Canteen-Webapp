package com.ccms.entities;

import com.ccms.enums.Providers;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder // To convert an object into user like (UserFormo --> User) but it can't set
         // default values
public class User {
    // Basic information of user
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    
    @Column(nullable = false)
    private String name;
    
    private String department;
    
    private String enrollmentNumber;
    
    private String contact;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    private String profileUrl;
    
    @Builder.Default
    private boolean termsAndConditions = false;

    // Verification status
    @Builder.Default
    private boolean emailVerified = false;

    // Band status of user
    @Builder.Default
    private boolean band = false;

    // Provider name (How user logedIn/Registered)
    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private Providers provider = Providers.SELF;

    private String providerUserId;
}
