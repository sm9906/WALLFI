package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.repository.UserGameInfoRepository;
import com.shinhan.walfi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final UserGameInfoRepository userGameInfoRepository;

    @Override
    public void signup(User user) {
        //user 생성
        userRepository.save(user);
        //usergameinfo 생성
        userGameInfoRepository.save(user.userGameInfoByUser());
        // 계좌 6개 생성
    }
}
