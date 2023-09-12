package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.dto.banking.SignupReqDto;

import java.util.List;

public interface UserService {

//    void signup(User user);

    User login(String userId, String password);

    List<User> getUserList();
}
