package com.ccms.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ccms.entities.User;

@Service
public interface UserService {
    public User saveUser(User user);
    public User getUserById(int id);
    public User getUserByEmail(String email);
    public User updateUser(User user);
    public User deleteUser(int id);
    public User deleteUserByEmail(String email);
    public List<User> getAllUsers();
    public User isUserValid(String email, String password);
}
