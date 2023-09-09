package com.shinhan.walfi.repository;

import com.shinhan.walfi.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {

    @Query(value = "select count(*) from user where user_id = ?1 and password= ?2")
    int login(String userId, String password);
}
