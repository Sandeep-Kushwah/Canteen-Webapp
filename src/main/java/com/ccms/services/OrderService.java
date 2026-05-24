package com.ccms.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.ccms.entities.Orders;
import com.ccms.enums.OrderStatus;

@Service
public interface OrderService {
    public boolean placeOrder(Orders order);
    public List<Orders> getOrdersByUserId(int userId);
    public Orders getOrderByOrderId(int id);
    public Orders setHideMe(int id);
    public List<Orders> getAllOrders();
    public boolean setOrderStatus(int id, OrderStatus orderStatus);
}
