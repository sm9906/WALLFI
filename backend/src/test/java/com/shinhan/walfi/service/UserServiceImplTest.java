package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.dto.UserDto;
import com.shinhan.walfi.exception.UserErrorCode;
import com.shinhan.walfi.exception.UserException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class UserServiceImplTest {

    @Autowired UserService userService;
    @PersistenceContext EntityManager em;

    String user1Id = "1";
    String user2Id = "2";
    String user1MainAccount = "user1";

    String user1Pwd = "123";
    String user2Pwd = "123";
    String user2MainAccount = "user2";

    @BeforeEach
    void before() {
        User user1 = new User();
        user1.setUserId(user1Id);
        user1.setPassword(user1Pwd);
        user1.set대표계좌(user1MainAccount);

        User user2 = new User();
        user2.setUserId(user2Id);
        user2.setPassword(user2Pwd);
        user2.set대표계좌(user2MainAccount);

        em.persist(user1);
        em.persist(user2);
    }

    @Test
    @DisplayName("유저 리스트 테스트")
    public void userListTest() throws Exception {
        // given

        // when
        List<UserDto> userList = userService.getUserList();

        // then
        Assertions.assertThat(userList.size()).isEqualTo(2);
    }

    @Test
    @DisplayName("로그인 테스트")
    public void loginTest() throws Exception {
        // given
        String user1TargetAccount = "user1";

        // when
        UserDto userDto = userService.login(user1Id, user1Pwd);

        // then
        Assertions.assertThat(userDto.getUserMainAccount()).isSameAs(user1TargetAccount);
    }

    @Test
    @DisplayName("로그인 비밀번호가 틀렸을 때 exception 발생 테스트")
    public void loginExceptioinWrongPwdTest() throws Exception {
        // given

        // when
        UserException e = assertThrows(UserException.class,
                () -> userService.login("1", "aaa"));
        // then
        Assertions.assertThat(e.getUserErrorCode().getMessage()).isSameAs(UserErrorCode.NO_MATCHING_USER.getMessage());
    }

    @Test
    @DisplayName("조회되지 않는 회원일 경우 예외 처리")
    public void loginExceptioinNoUserTest() throws Exception {
        // given

        // when
        UserException e = assertThrows(UserException.class,
                () -> userService.login("111111", ""));
        // then
        Assertions.assertThat(e.getUserErrorCode().getMessage()).isSameAs(UserErrorCode.NO_MATCHING_USER.getMessage());
    }

}