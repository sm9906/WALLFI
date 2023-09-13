package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.UserDto;
import com.shinhan.walfi.dto.game.UserGameInfoDto;
import com.shinhan.walfi.exception.UserErrorCode;
import com.shinhan.walfi.exception.UserException;
import com.shinhan.walfi.repository.UserRepository;
import com.shinhan.walfi.repository.game.UserGameInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.shinhan.walfi.exception.UserErrorCode.NO_MATCHING_USER;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final UserGameInfoRepository userGameInfoRepository;

    @Override
    public List<UserDto> getUserList() {
        List<User> userList = userRepository.findAll();

        List<UserDto> dto = userList.stream().map(user -> getUserDto(user)).collect(Collectors.toList());
        log.info("=== 사용자 리스트 조회 ===");
        return dto;
    }

    /**
     * 로그인 기능
     *
     * @exception 'NO_MATCHING_USER' - 비밀번호가 틀리거나 존재하지 않는 사용자의 경우 예외 발생
     * @param userId
     * @param password
     * @return
     */
    @Override
    public UserDto login(String userId, String password) {
        User findUser = userRepository.login(userId, password);

        if (findUser == null) {
            log.error("틀린 비밀번호이거나 존재하지 않는 회원");
            throw new UserException(NO_MATCHING_USER);
        }

        log.info("=== 유저: " + userId + " 님이 로그인하였습니다 ===");
        return getUserDto(findUser);
    }

    /**
     * user 정보를 UserDto로 변환하는 기능
     *
     * @param user
     * @return UserDto
     */
    private UserDto getUserDto(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .birthDate(user.getBirthDate())
                .phoneNumber(user.getPhoneNumber())
                .userMainAccount(user.get대표계좌())
                .build();
    }

}





//    @Override
//    public void signup(User user) {
//        // user 생성
//        userRepository.save(user);
//        // usergameinfo 생성
//        userGameInfoRepository.save(user.userGameInfoByUser());
//    }
