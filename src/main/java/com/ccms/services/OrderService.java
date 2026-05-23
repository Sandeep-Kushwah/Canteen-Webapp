package com.ccms.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.ccms.entities.Orders;

@Service
public interface OrderService {
    public boolean placeOrder(Orders order);
    public List<Orders> getOrdersByUserId(int userId);
    public Orders getOrderByOrderId(int id);
    public Orders setHideMe(int id);
}
