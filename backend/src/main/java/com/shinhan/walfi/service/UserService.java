package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.UserDto;
import com.shinhan.walfi.dto.game.UserGameInfoDto;

import java.util.List;

public interface UserService {

    List<UserDto> getUserList();

    UserDto login(String userId, String password);

    UserGameInfoDto getUserGameInfo(String userId);

}

//    void signup(User user);
