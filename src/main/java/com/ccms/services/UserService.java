package com.ccms.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ccms.entities.User;

@Service
public interface UserService {
    public boolean saveUser(User user);
    public User getUserById(int id);
    public User updateUser(User user);
    public User deleteUser(int id);
    public List<User> getAllUsers();
}
