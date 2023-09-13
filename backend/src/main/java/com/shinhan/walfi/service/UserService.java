package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto login(String userId, String password);

    List<User> getUserList();

}

//    void signup(User user);
