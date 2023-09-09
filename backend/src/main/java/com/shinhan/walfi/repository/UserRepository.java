package com.shinhan.walfi.repository;

import com.shinhan.walfi.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
