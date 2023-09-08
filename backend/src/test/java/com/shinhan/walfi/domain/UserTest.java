package com.shinhan.walfi.domain;

import com.shinhan.walfi.repository.UserRepository;
import com.shinhan.walfi.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class UserTest {
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Test
    void 회원조회() throws Exception{
        // given
        User user = new User();
        user.setUserId("123");
        user.setName("userA");
        user.setEmail("email");
        user.setPassword("123");

        // when
        String joinedUserId = userService.join(user);

        // then
        assertThat(user).isSameAs(userRepository.findUserById(joinedUserId));
    }

}