package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.CharacterReqDto;
import com.shinhan.walfi.dto.game.CharacterResDto;
import com.shinhan.walfi.dto.game.MainCharacterResDto;
import com.shinhan.walfi.repository.UserGameInfoRepository;
import com.shinhan.walfi.service.CharacterService;
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
    @Autowired CharacterService characterService;
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
        UserGameInfo findUserGameInfo = userGameInfoRepository.findById("ssafy");

        // then

        // api 반환값 테스트
        Assertions.assertThat(res.getBody().getResult()).isSameAs(HttpResult.Result.SUCCESS);
        Assertions.assertThat(res.getBody().getStatus()).isSameAs(HttpStatus.OK);

        // UserGameInfo에 캐릭터 등록이 잘 되었는지 테스트
        Assertions.assertThat(findUserGameInfo.getGameCharacters().size()).isEqualTo(1);

        // isMain 테스트 1이 true 0이 false
        Assertions.assertThat(findUserGameInfo.getGameCharacters().get(0).isMain()).isEqualTo(true);
    }

    @Test
    @DisplayName("캐릭터 뽑기 api 테스트")
    public void shopCharacterTest() throws Exception {
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("ssafy");
        em.persist(userGameInfo);

        CharacterReqDto characterReqDto = new CharacterReqDto();
        characterReqDto.setUserId("ssafy");

        // when
        ResponseEntity<HttpResult> res = characterController.shopRandomCharacter(characterReqDto);
        UserGameInfo findUserGameInfo = userGameInfoRepository.findById("ssafy");

        // then

        // api 반환값 테스트
        Assertions.assertThat(res.getBody().getResult()).isSameAs(HttpResult.Result.SUCCESS);
        Assertions.assertThat(res.getBody().getStatus()).isSameAs(HttpStatus.OK);

        // UserGameInfo에 캐릭터 등록이 잘 되었는지 테스트
        Assertions.assertThat(findUserGameInfo.getGameCharacters().size()).isEqualTo(1);


        // isMain 테스트 1이 true 0이 false
        Assertions.assertThat(findUserGameInfo.getGameCharacters().get(0).isMain()).isEqualTo(false);
    }

    @Test
    @DisplayName("캐릭터 리스트 받기 테스트")
    public void getCharacterListTest() throws Exception {
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("ssafy");
        em.persist(userGameInfo);

        CharacterReqDto characterReqDto = new CharacterReqDto();
        characterReqDto.setUserId("ssafy");


        // when
        characterController.createRandomCharacter(characterReqDto);
        characterController.shopRandomCharacter(characterReqDto);


        // then
        ResponseEntity<HttpResult> res = characterController.getCharacters(characterReqDto);
        CharacterResDto data = (CharacterResDto) res.getBody().getData();

        // api 반환값 테스트
        Assertions.assertThat(res.getBody().getResult()).isSameAs(HttpResult.Result.SUCCESS);
        Assertions.assertThat(res.getBody().getStatus()).isSameAs(HttpStatus.OK);

        // 저장한 캐릭터 2개를 받아오는지 테스트
        Assertions.assertThat(data.getCharacterDtoList().size()).isEqualTo(2);

    }

    @Test
    @DisplayName("메인 캐릭터 조회 테스트")
    public void getMainTest() throws Exception {
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("ssafy");
        em.persist(userGameInfo);

        CharacterReqDto characterReqDto = new CharacterReqDto();
        characterReqDto.setUserId("ssafy");


        // when
        Long mainCharacterIdx = characterService.create(userGameInfo.getUserId());
        characterService.shop(userGameInfo.getUserId());
        characterService.shop(userGameInfo.getUserId());

        // then
        ResponseEntity<HttpResult> res = characterController.getMainCharacter(characterReqDto);
        MainCharacterResDto data = (MainCharacterResDto) res.getBody().getData();

        // api 반환값 테스트
        Assertions.assertThat(res.getBody().getResult()).isSameAs(HttpResult.Result.SUCCESS);
        Assertions.assertThat(res.getBody().getStatus()).isSameAs(HttpStatus.OK);

        // 메인 캐릭터를 잘 받아오는지 테스트
        Assertions.assertThat(data.getCharacterDto().isMain()).isEqualTo(true);

    }
}