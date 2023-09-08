package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.CharacterReqDto;
import com.shinhan.walfi.repository.UserGameInfoRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CharacterControllerTest {

    @Autowired CharacterController characterController;
    @Autowired UserGameInfoRepository userGameInfoRepository;
    @PersistenceContext EntityManager em;

    @Test
    @DisplayName("캐릭터 생성 api 테스트")
    public void createCharacterTest() throws Exception {
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("ssafy");
        em.persist(userGameInfo);

        CharacterReqDto characterReqDto = new CharacterReqDto();
        characterReqDto.setUserId("ssafy");

        // when
        ResponseEntity<HttpResult> res = characterController.createRandomCharacter(characterReqDto);

        // then
        Assertions.assertThat(res.getBody().getResult()).isSameAs(HttpResult.Result.SUCCESS);
        Assertions.assertThat(res.getBody().getStatus()).isSameAs(HttpStatus.OK);
    }
}