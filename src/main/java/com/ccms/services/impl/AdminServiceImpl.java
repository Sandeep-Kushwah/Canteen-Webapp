package com.ccms.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccms.entities.Items;
import com.ccms.repository.AdminRepo;
import com.ccms.services.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    AdminRepo adminRepo;

    @Override
    public boolean addItem(Items items) {
        try {
            if (items.getImageFile() != null) {
                adminRepo.save(items);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Items> getAllItems() {
        try {
            List<Items> itemsList = adminRepo.findAll();
            return itemsList;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Optional<Items> getItemById(int id) {
        try{
            return adminRepo.findByItemId(id);
        } catch(Exception e)
        {
            return null;
        }
    }

    

}
