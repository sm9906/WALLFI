package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.*;
import com.shinhan.walfi.repository.CharacterRepository;
import com.shinhan.walfi.repository.UserGameInfoRepository;
import com.shinhan.walfi.service.CharacterService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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

    String userId = "ssafy";

    Long mainCharacterIdx;

    Long shopCharacterIdx_1;

    Long shopCharacterIdx_2;

    @BeforeEach
    void create() {
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId(userId);
        em.persist(userGameInfo);

        mainCharacterIdx = characterService.create(userId).getCharacterDto().getCharacterIdx();
        shopCharacterIdx_1 = characterService.shop(userId).getCharacterDto().getCharacterIdx();
        shopCharacterIdx_2 = characterService.shop(userId).getCharacterDto().getCharacterIdx();

    }


    @Test
    @DisplayName("캐릭터 생성 api 테스트")
    public void createCharacterTest() throws Exception {
        // given
        CharacterReqDto characterReqDto = new CharacterReqDto();
        characterReqDto.setUserId(userId);

        // when
        ResponseEntity<HttpResult> res = characterController.createRandomCharacter(characterReqDto);
        UserGameInfo findUserGameInfo = userGameInfoRepository.findById(userId);

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
        CharacterReqDto characterReqDto = new CharacterReqDto();
        characterReqDto.setUserId(userId);

        // when
        ResponseEntity<HttpResult> res = characterController.shopRandomCharacter(characterReqDto);
        UserGameInfo findUserGameInfo = userGameInfoRepository.findById(userId);

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
        CharacterReqDto characterReqDto = new CharacterReqDto();
        characterReqDto.setUserId(userId);


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
        CharacterReqDto characterReqDto = new CharacterReqDto();
        characterReqDto.setUserId(userId);


        // when
        CharacterWithUserIdResDto characterWithUserIdResDto = characterService.create(userId);
        characterService.shop(userId);
        characterService.shop(userId);

        ResponseEntity<HttpResult> res = characterController.getMainCharacter(characterReqDto);


        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        // api 반환값 테스트
        Assertions.assertThat(res.getBody().getResult()).isSameAs(HttpResult.Result.SUCCESS);
        Assertions.assertThat(res.getBody().getStatus()).isSameAs(HttpStatus.OK);

        // 메인 캐릭터를 잘 받아오는지 테스트
        Assertions.assertThat(characterWithUserIdResDto.getCharacterDto().isMain()).isEqualTo(true);

    }

    @Test
    @DisplayName("캐릭터의 색 변경 테스트")
    void changeColorTest() throws Exception{
        // given
        MainCharacterReqDto mainCharacterReqDto = new MainCharacterReqDto();
        CharacterWithUserIdResDto characterWithUserIdResDto = characterService.create(userId);
        Long mainCharacterIdx = characterWithUserIdResDto.getCharacterDto().getCharacterIdx();


        mainCharacterReqDto.setUserId(userId);
        mainCharacterReqDto.setMainCharacterIdx(mainCharacterIdx);

        // when
        ResponseEntity<HttpResult> res = characterController.changeCharacterColor(mainCharacterReqDto);

        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        Assertions.assertThat(data.getUserId()).isEqualTo(userId);
        Assertions.assertThat(data.getCharacterDto().getCharacterIdx())
                .isEqualTo(mainCharacterIdx);
    }

    @Test
    @DisplayName("캐릭터의 atk 변경 테스트")
    void changeAtkTest() throws Exception{
        // given
        CharacterStatusReqDto characterStatusReqDto = new CharacterStatusReqDto();
        Long characterIdx = characterService.create(userId).getCharacterDto().getCharacterIdx();

        characterStatusReqDto.setUserId(userId);
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
        CharacterStatusReqDto characterStatusReqDto = new CharacterStatusReqDto();
        Long characterIdx = characterService.create(userId).getCharacterDto().getCharacterIdx();

        characterStatusReqDto.setUserId(userId);
        characterStatusReqDto.setCharacterIdx(characterIdx);
        characterStatusReqDto.setStatusType("def");
        characterStatusReqDto.setValue(10);

        // when
        ResponseEntity<HttpResult> res = characterController.changeCharacterStatus(characterStatusReqDto);

        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        Assertions.assertThat(data.getCharacterDto().getDef()).isEqualTo(10);
    }

    @Test
    @DisplayName("캐릭터의 hp 변경 테스트")
    void changeHpTest() throws Exception{
        // given
        CharacterStatusReqDto characterStatusReqDto = new CharacterStatusReqDto();
        Long characterIdx = characterService.create(userId).getCharacterDto().getCharacterIdx();

        characterStatusReqDto.setUserId(userId);
        characterStatusReqDto.setCharacterIdx(characterIdx);
        characterStatusReqDto.setStatusType("hp");
        characterStatusReqDto.setValue(10);

        // when
        ResponseEntity<HttpResult> res = characterController.changeCharacterStatus(characterStatusReqDto);

        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        Assertions.assertThat(data.getCharacterDto().getHp()).isEqualTo(60);
    }

    @Test
    @DisplayName("메인 캐릭터 변경 테스트")
    void changeMainTest() throws Exception{
        // given
        CharacterStatusReqDto characterStatusReqDto = new CharacterStatusReqDto();

        characterStatusReqDto.setUserId(userId);
        characterStatusReqDto.setCharacterIdx(shopCharacterIdx_1);
        characterStatusReqDto.setStatusType("isMain");
        characterStatusReqDto.setValue(10);

        GameCharacter mainCharacter = characterRepository.findCharacterByIdx(mainCharacterIdx);

        // when
        ResponseEntity<HttpResult> res = characterController.changeCharacterStatus(characterStatusReqDto);

        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        // 요청한 캐릭터가 main으로 변경되었는지 확인
        Assertions.assertThat(data.getCharacterDto().isMain()).isEqualTo(true);
        // 기존 메인 캐릭터가 메인이 아니게 변경되었는지 확인
        Assertions.assertThat(mainCharacter.isMain()).isEqualTo(false);

    }

    @Test
    @DisplayName("캐릭터의 exp 상승 (level+1, exp+10) 테스트")
    void changeExpTest() throws Exception{
        // given
        CharacterStatusReqDto characterStatusReqDto = new CharacterStatusReqDto();

        characterStatusReqDto.setUserId(userId);
        characterStatusReqDto.setCharacterIdx(mainCharacterIdx);
        characterStatusReqDto.setStatusType("exp");
        characterStatusReqDto.setValue(50);

        // when
        ResponseEntity<HttpResult> res = characterController.changeCharacterStatus(characterStatusReqDto);

        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        Assertions.assertThat(data.getCharacterDto().getLevel()).isEqualTo(2);
        Assertions.assertThat(data.getCharacterDto().getExp()).isEqualTo(10);

    }

    @Test
    @DisplayName("캐릭터의 exp 상승 (level+2, exp+10) 테스트")
    void changeExpLevelTwoTest() throws Exception{
        // given
        CharacterStatusReqDto characterStatusReqDto = new CharacterStatusReqDto();

        characterStatusReqDto.setUserId(userId);
        characterStatusReqDto.setCharacterIdx(mainCharacterIdx);
        characterStatusReqDto.setStatusType("exp");
        characterStatusReqDto.setValue(130);

        // when
        ResponseEntity<HttpResult> res = characterController.changeCharacterStatus(characterStatusReqDto);

        // then
        CharacterWithUserIdResDto data = (CharacterWithUserIdResDto) res.getBody().getData();

        Assertions.assertThat(data.getCharacterDto().getLevel()).isEqualTo(3);
        Assertions.assertThat(data.getCharacterDto().getExp()).isEqualTo(10);

    }


}