package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.*;
import com.shinhan.walfi.repository.CharacterRepository;
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

@SpringBootTest
@Transactional
class CharacterControllerTest {

    @Autowired CharacterController characterController;
    @Autowired CharacterService characterService;
    @Autowired UserGameInfoRepository userGameInfoRepository;
    @Autowired CharacterRepository characterRepository;
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
        CharacterListResDto data = (CharacterListResDto) res.getBody().getData();

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

        ResponseEntity<HttpResult> res = characterController.getMainCharacter(characterReqDto);


        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        // api 반환값 테스트
        Assertions.assertThat(res.getBody().getResult()).isSameAs(HttpResult.Result.SUCCESS);
        Assertions.assertThat(res.getBody().getStatus()).isSameAs(HttpStatus.OK);

        // 메인 캐릭터를 잘 받아오는지 테스트
        Assertions.assertThat(data.getCharacterDto().isMain()).isEqualTo(true);

    }

    @Test
    @DisplayName("캐릭터의 색 변경 테스트")
    void changeColorTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("ssafy");
        em.persist(userGameInfo);

        MainCharacterReqDto mainCharacterReqDto = new MainCharacterReqDto();
        Long mainCharacterIdx = characterService.create("ssafy");

        mainCharacterReqDto.setUserId("ssafy");
        mainCharacterReqDto.setMainCharacterIdx(mainCharacterIdx);

        // when
        ResponseEntity<HttpResult> res = characterController.changeCharacterColor(mainCharacterReqDto);

        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        Assertions.assertThat(data.getUserId()).isEqualTo(userGameInfo.getUserId());
        Assertions.assertThat(data.getCharacterDto().getCharacterIdx())
                .isEqualTo(mainCharacterIdx);
    }

    @Test
    @DisplayName("캐릭터의 atk 변경 테스트")
    void changeAtkTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("ssafy");
        em.persist(userGameInfo);

        CharacterStatusReqDto characterStatusReqDto = new CharacterStatusReqDto();
        Long characterIdx = characterService.create("ssafy");

        characterStatusReqDto.setUserId("ssafy");
        characterStatusReqDto.setCharacterIdx(characterIdx);
        characterStatusReqDto.setStatusType("atk");
        characterStatusReqDto.setValue(10);

        // when
        ResponseEntity<HttpResult> res = characterController.changeCharacterStatus(characterStatusReqDto);

        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        Assertions.assertThat(data.getCharacterDto().getAtk()).isEqualTo(10);
    }

    @Test
    @DisplayName("캐릭터의 def 변경 테스트")
    void changeDefTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("ssafy");
        em.persist(userGameInfo);

        CharacterStatusReqDto characterStatusReqDto = new CharacterStatusReqDto();
        Long characterIdx = characterService.create("ssafy");

        characterStatusReqDto.setUserId("ssafy");
        characterStatusReqDto.setCharacterIdx(characterIdx);
        characterStatusReqDto.setStatusType("def");
        characterStatusReqDto.setValue(10);

        // when
        ResponseEntity<HttpResult> res = characterController.changeCharacterStatus(characterStatusReqDto);

        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        Assertions.assertThat(data.getCharacterDto().getDef()).isEqualTo(10);
    }
}