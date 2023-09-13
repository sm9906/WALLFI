package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.dto.UserDto;
import com.shinhan.walfi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public List<UserDto> getUserList() {
        System.out.println("============================");
        List<User> userList = userRepository.findAll();

        List<UserDto> dto = userList.stream().map(user -> getUserDto(user)).collect(Collectors.toList());
        System.out.println("userList = " + dto);
        return dto;
    }

    @Override
    public UserDto login(String userId, String password) {
        User findUser = userRepository.login(userId, password);

        //Todo: findUser가 null이면 비밀번호가 틀렸거나 없는 유저임으로 exception

        return getUserDto(findUser);
    }

    /**
     * user 정보를 UserDto로 변환하는 기능
     *
     * @param findUser
     * @return UserDto
     */
    private UserDto getUserDto(User findUser) {
        return UserDto.builder()
                .userId(findUser.getUserId())
                .email(findUser.getEmail())
                .birthDate(findUser.getBirthDate())
                .phoneNumber(findUser.getPhoneNumber())
                .userMainAccount(findUser.get대표계좌())
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
