package com.shinhan.walfi.service.game;

import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.UserGameInfoDto;
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
        Assertions.assertThat(dto.getUserId()).isEqualTo(userId);
        Assertions.assertThat(dto.getPoint()).isEqualTo(defaultPoint);

    }

    @Test
    @DisplayName("게임 포인트 상승 테스트")
    public void pointUpTest() throws Exception {
        // given
        int updatePoint = 100;

        // when
        UserGameInfoDto dto = userGameInfoService.updatePoint(userId, updatePoint);

        // then
        Assertions.assertThat(dto.getPoint()).isEqualTo(defaultPoint + updatePoint);
    }
    

}