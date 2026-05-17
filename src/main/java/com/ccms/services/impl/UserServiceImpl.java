package com.ccms.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccms.entities.User;
import com.ccms.repository.UserRepo;
import com.ccms.services.UserService;

@Service
public class UserServiceImpl implements UserService{

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
    public boolean saveUser(User user) {
        System.out.println("User object data : "+user);

        //To generate random ID
        // String userId = UUID.randomUUID().toString();
        // user.setUserId(Integer.parseInt(userId));

        //password encoder
        
        System.out.println("I am in saveUser method");
        userRepo.save(user);
        return true;
    }

    @Override
    public User updateUser(User user) {
        // TODO Auto-generated method stub
        return null;
    }

}
