package com.ccms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ccms.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
    //We can also write some essential methods.

    //Custom finder methods (This two following mehtod are custom finder methods)
    //Because we don't need to write queries for it
    User findByEmail(String email);
    User findByEmailAndPassword(String email, String password);
}
