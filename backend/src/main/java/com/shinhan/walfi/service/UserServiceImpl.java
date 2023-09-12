package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.dto.banking.SignupReqDto;
import com.shinhan.walfi.repository.UserGameInfoRepository;
import com.shinhan.walfi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final UserGameInfoRepository userGameInfoRepository;

//    @Override
//    public void signup(User user) {
//        // user 생성
//        userRepository.save(user);
//        // usergameinfo 생성
//        userGameInfoRepository.save(user.userGameInfoByUser());
//    }

    @Override
    public User login(String userId, String password) {
        return userRepository.login(userId, password);
    }

    @Override
    public List<User> getUserList() {
        List<User> userList = userRepository.findAll();
        return userList;
    }

}
