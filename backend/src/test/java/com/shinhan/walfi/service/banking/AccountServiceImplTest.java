package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.exception.AccountException;
import com.shinhan.walfi.exception.UserException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class AccountServiceImplTest {

    @PersistenceContext EntityManager em;
    @Autowired AccountService accountService;

    String userId = "ssafy";
    String userMainAccount = "1234";

    @BeforeEach
    void before() {
        User user = new User();
        user.setUserId(userId);
        user.set대표계좌(userMainAccount);

        em.persist(user);
    }

    @Test
    @DisplayName("getAccounts (해당 유저 없을 때)")
    void userMainAccountException() {
        // given
        String notInDbUserId = "1234444";

        // when
        UserException e = Assertions.assertThrows(UserException.class,
                () -> accountService.getAccounts(notInDbUserId, ""));

        // then
        assertThat(e.getUserErrorCode().getMessage()).isEqualTo("해당 유저를 조회할 수 없거나 틀린 비밀번호 입니다");
    }

    @Test
    @DisplayName("getAccounts (유저와 대표계좌가 일치 하지 않을때)")
    void doesNotMatch() {
        // given
        String newMainAccount = "12344444";

        // when
        AccountException e = Assertions.assertThrows(AccountException.class,
                () -> accountService.getAccounts(userId, newMainAccount));

        // then
        assertThat(e.getAccountErrorCode().getMessage()).isEqualTo("유저 정보와 대표계좌가 일치하지 않습니다");
    }
}