package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class UserControllerTest {

    @Autowired UserController userController;
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
    @DisplayName("유저들 정보 받아오는 테스트")
    public void getUsersTest() throws Exception {
        // given

        // when
        ResponseEntity<HttpResult> res = userController.getUserList();
        List<User> data = (List<User>) res.getBody().getData();

        // then
        Assertions.assertThat(res.getBody().getResult()).isSameAs(HttpResult.Result.SUCCESS);
        Assertions.assertThat(data.size()).isEqualTo(2);
    }

}