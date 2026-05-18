package com.ccms.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccms.entities.User;
import com.ccms.repository.UserRepo;
import com.ccms.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public User deleteUser(int id) {
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public User getUserById(int id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public User saveUser(User user) {

        // To generate random ID
        // String userId = UUID.randomUUID().toString();
        // user.setUserId(Integer.parseInt(userId));
        // password encoder
        
        try {
            User returnUser = userRepo.save(user);
            if (returnUser != null)
                return returnUser;
            else
                return null;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public User updateUser(User user) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}
