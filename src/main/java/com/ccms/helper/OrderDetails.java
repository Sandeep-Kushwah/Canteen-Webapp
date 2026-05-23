package com.ccms.helper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.SessionAttribute;
import com.ccms.entities.Orders;
import com.ccms.entities.User;
import com.ccms.services.OrderService;
import jakarta.servlet.http.HttpSession;

@Service
public class OrderDetails {

    @Autowired
    OrderService orderService;

    public List<Orders> getOrderDetails(HttpSession session, @SessionAttribute User user) {
        int totalSpent = 0;
        int totalCompleted = 0;
        int totalPending = 0;
        boolean noOrders = true;
        int cancelledOrder = 0;

        List<Orders> orders = orderService.getOrdersByUserId(user.getUserId());

        for (Orders orders2 : orders) {
            totalSpent += orders2.getTotalPrice();
        }

        for (Orders orders2 : orders) {
            if (orders2.getOrderStatus().toString().equals("COMPLETED"))
                totalCompleted++;
            if (orders2.getOrderStatus().toString().equals("PENDING"))
                totalPending++;
            if (!orders2.isHide())
                noOrders = false;
            if(orders2.getOrderStatus().toString().equals("CANCELED"))
                cancelledOrder++;
        }

        session.setAttribute("numberOfOrders", orders.size());
        session.setAttribute("totalSpent", totalSpent);
        session.setAttribute("totalCompleted", totalCompleted);
        session.setAttribute("totalPending", totalPending);
        session.setAttribute("noOrders", noOrders);
        session.setAttribute("cancelledOrder", cancelledOrder);

        return orders;
    }
}
