package com.ccms.services;

import java.util.List;
import java.util.Optional;

import com.ccms.entities.Items;

public interface AdminService {
    public boolean addItem(Items items);
    public List<Items> getAllItems();
    public Optional<Items> getItemById(int id);
}
