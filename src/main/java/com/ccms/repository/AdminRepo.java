package com.ccms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ccms.entities.Items;


@Repository
public interface AdminRepo extends JpaRepository<Items,Integer> {
    public Optional<Items> findByItemId(int itemId);
}
