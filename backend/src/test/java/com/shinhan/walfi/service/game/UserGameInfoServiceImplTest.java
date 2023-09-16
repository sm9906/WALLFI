package com.shinhan.walfi.service.game;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.UserGameInfoDto;
import com.shinhan.walfi.exception.UserException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.PushbackReader;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;


@Transactional
@SpringBootTest
class UserGameInfoServiceImplTest {

    @Autowired UserGameInfoService userGameInfoService;
    @PersistenceContext EntityManager em;

    private String userId = "ssafy";
    private int defaultPoint = 100;

    @BeforeEach
    void before() {
        User user = new User();
        user.setUserId(userId);
        em.persist(user);

        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId(userId);
        userGameInfo.setPoint(defaultPoint);
        em.persist(userGameInfo);
    }

    @Test
    @DisplayName("유저 정보 받아오는 테스트")
    public void getUserGameInfoTest() throws Exception {
        // given
        
        // when
        UserGameInfoDto dto = userGameInfoService.getUserGameInfo(userId);

        // then
        assertThat(dto.getUserId()).isEqualTo(userId);
        assertThat(dto.getPoint()).isEqualTo(defaultPoint);

    }

    @Test
    @DisplayName("게임 포인트 상승 테스트")
    public void pointUpTest() throws Exception {
        // given
        int updatePoint = 100;

        // when
        UserGameInfoDto dto = userGameInfoService.updatePoint(userId, updatePoint);

        // then
        assertThat(dto.getPoint()).isEqualTo(defaultPoint + updatePoint);
    }

    @Test
    @DisplayName("유저의 게임 정보 조회시 예외 테스트 (유저가 존재하지 않을 때)")
    public void getUserGameInfoExceptionTest() throws Exception {
        // given
        String errorId = "123";

        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId(errorId);

        // when
        UserException e = org.junit.jupiter.api.Assertions.assertThrows(UserException.class,
                () -> userGameInfoService.getUserGameInfo(errorId));

        // then
        assertThat(e.getUserErrorCode().getMessage()).isEqualTo("해당 유저를 조회할 수 없거나 틀린 비밀번호 입니다");
    }

    @Test
    @DisplayName("게임 포인트 상승시 예외 테스트 (유저가 존재하지 않을 때)")
    public void updatePointExceptionTest() throws Exception {
        // given
        String errorId = "123";

        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId(errorId);

        int updatePoint = 100;

        // when
        UserException e = org.junit.jupiter.api.Assertions.assertThrows(UserException.class,
                () -> userGameInfoService.updatePoint(errorId, updatePoint));

        // then
        assertThat(e.getUserErrorCode().getMessage()).isEqualTo("해당 유저를 조회할 수 없거나 틀린 비밀번호 입니다");
    }

}