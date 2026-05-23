package com.ccms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ccms.entities.Orders;
import java.util.List;


@Repository
public interface OrderRepo extends JpaRepository<Orders, Integer> {
    public List<Orders> findByUser_UserId(int userId);
    
}
