package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.TierPerColor;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.CharacterListResDto;
import com.shinhan.walfi.dto.game.CharacterWithUserIdResDto;
import com.shinhan.walfi.repository.CharacterRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class CharacterServiceTest {
    @PersistenceContext
    EntityManager em;

    @Autowired CharacterService characterService;
    @Autowired CharacterRepository characterRepository;

    @Test
    @Order(1)
    @DisplayName("캐릭터 생성(create) 확인 테스트 (색, 레벨, hp, exp, atk, def, ismain)")
    public void createCharacter() {
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        // when
        Long findGameIdx = characterService.create(userGameInfo.getUserId());
        GameCharacter findGameCharacter = em.find(GameCharacter.class, findGameIdx);

        // then
        assertThat(findGameCharacter.getColor()).isEqualTo(TierPerColor.BASIC);
        assertThat(findGameCharacter.getLevel()).isEqualTo(1);
        assertThat(findGameCharacter.getHp()).isEqualTo(50);
        assertThat(findGameCharacter.getExp()).isEqualTo(0);
        assertThat(findGameCharacter.getAtk()).isEqualTo(0);
        assertThat(findGameCharacter.getDef()).isEqualTo(0);
        assertThat(findGameCharacter.isMain()).isEqualTo(true);
    }

    @Test
    @Order(2)
    @DisplayName("캐릭터 뽑기(shop) 확인 테스트 (색, 레벨, hp, exp, atk, def, ismain)")
    public void shopCharacter() {
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        // when
        Long findGameIdx = characterService.shop(userGameInfo.getUserId());
        GameCharacter findGameCharacter = em.find(GameCharacter.class, findGameIdx);

        // then
        assertThat(findGameCharacter.getColor()).isEqualTo(TierPerColor.BASIC);
        assertThat(findGameCharacter.getLevel()).isEqualTo(1);
        assertThat(findGameCharacter.getHp()).isEqualTo(50);
        assertThat(findGameCharacter.getExp()).isEqualTo(0);
        assertThat(findGameCharacter.getAtk()).isEqualTo(0);
        assertThat(findGameCharacter.getDef()).isEqualTo(0);
        assertThat(findGameCharacter.isMain()).isEqualTo(false);
    }

    @Test
    @Order(3)
    @DisplayName("userId를 이용한 캐릭터 조회 (searchCharacters)")
    void searchCharacters() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long c1 = characterService.create(userGameInfo.getUserId());
        Long c2 = characterService.shop(userGameInfo.getUserId());
        Long c3 = characterService.shop(userGameInfo.getUserId());

        // when
        CharacterListResDto characterListResDto = characterService.searchCharacters(userGameInfo.getUserId());

        // then
        assertThat(characterListResDto.getCharacterDtoList().size()).isEqualTo(3);
    }

    @Test
    @Order(3)
    @DisplayName("userId를 이용한 메인 캐릭터 조회 (searchHomeCharacter)")
    void searchMainCharacter() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long mainCharacterIdx = characterService.create(userGameInfo.getUserId());
        Long c2 = characterService.shop(userGameInfo.getUserId());
        Long c3 = characterService.shop(userGameInfo.getUserId());

        // when
        CharacterWithUserIdResDto characterWithUserIdResDto = characterService.searchMainCharacter(userGameInfo.getUserId());

        // then
        assertThat(characterWithUserIdResDto.getCharacterDto().isMain()).isEqualTo(true);
        assertThat(characterWithUserIdResDto.getCharacterDto().getCharacterIdx()).isEqualTo(mainCharacterIdx);
    }

    @Test
    @Order(4)
    @DisplayName("사용자가 전달한 메인 캐릭터의 색을 변경하는 기능 테스트 (변경이 되는건진 정확히 알 수 없음...)")
    void changeColorTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long mainCharacterIdx = characterService.create(userGameInfo.getUserId());

        // when
        characterService.changeCharacterColor(userGameInfo.getUserId(), mainCharacterIdx);
    }

    @Test
    @Order(5)
    @DisplayName("atk를 변경하는 테스트")
    void changeAtkTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());
        int defaultAtk = characterRepository.findCharacterByIdx(characterIdx).getAtk();

        int updateValue = 2;
        String updateStatus = "atk";

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getAtk())
                .isEqualTo(updateValue + defaultAtk);
    }

    @Test
    @Order(5)
    @DisplayName("def를 변경하는 테스트")
    void changeDefTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());
        int defaultDef = characterRepository.findCharacterByIdx(characterIdx).getDef();

        int updateValue = 5;
        String updateStatus = "def";

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getDef())
                .isEqualTo(updateValue + defaultDef);
    }

    @Test
    @Order(5)
    @DisplayName("hp를 변경하는 테스트")
    void changeHpTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());
        int defaultHp = characterRepository.findCharacterByIdx(characterIdx).getHp();

        int updateValue = 50;
        String updateStatus = "hp";

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getHp())
                .isEqualTo(updateValue + defaultHp);
    }


}