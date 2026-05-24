package com.ccms.helper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccms.entities.Orders;
import com.ccms.services.impl.OrderServiceImpl;
import jakarta.servlet.http.HttpSession;

@Service
public class OrderDetailsForAdmin {

    @Autowired
    OrderServiceImpl orderRepo;

    public List<Orders> getOrderDetailsForAdmin(HttpSession session) {

        int adminTotalOrders = 0;
        int adminTotalPendingOrders = 0;
        int adminTotalCompletedOrders = 0;
        int totalRevenue = 0;

        List<Orders> orders = orderRepo.getAllOrders();

        for (Orders orders2 : orders) {
            adminTotalOrders++;
            if (orders2.getOrderStatus().toString().equals("COMPLETED"))
                adminTotalCompletedOrders++;
            if (orders2.getOrderStatus().toString().equals("PENDING"))
                adminTotalPendingOrders++;
            if (!orders2.getOrderStatus().toString().equals("CANCELED"))
                totalRevenue += orders2.getTotalPrice();
        }

        session.setAttribute("adminTotalOrders", adminTotalOrders);
        session.setAttribute("adminTotalPendingOrders", adminTotalPendingOrders);
        session.setAttribute("adminTotalCompletedOrders", adminTotalCompletedOrders);
        session.setAttribute("totalRevenue", totalRevenue);

        return orders;
    }
}
