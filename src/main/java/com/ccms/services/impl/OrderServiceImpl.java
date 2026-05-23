package com.ccms.services.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ccms.entities.Orders;
import com.ccms.repository.OrderRepo;
import com.ccms.services.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepo orderRepo;

    @Override
    public boolean placeOrder(Orders order) {
        try {
            if (orderRepo.save(order) != null)
                return true;
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Orders> getOrdersByUserId(int userId) {
        try {
            return orderRepo.findByUser_UserId(userId);
        } catch (Exception e) {
            System.out.println("Exception in getOrdersByUserId");
            return null;
        }
    }

    @Override
    public Orders getOrderByOrderId(int id) {
        try {
            return orderRepo.getReferenceById(id);
        } catch (Exception e) {
            System.out.println("Exception in getOrderByOrderId method");
            return null;
        }
    }

    @Override
    public Orders setHideMe(int id) {
        try {
            Orders order = getOrderByOrderId(id);
            order.setHide(true);
            return orderRepo.save(order);
        } catch (Exception e) {
            System.out.println("Exception in setHideMe Method");
            return null;
        }
    }

}
