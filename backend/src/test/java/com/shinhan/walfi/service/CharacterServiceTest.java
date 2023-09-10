package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.LevelUp;
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

    @Test
    @Order(6)
    @DisplayName("메인이 아닌 캐릭터를 메인으로 변경하는 기능 테스트")
    void changeMainTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long mainCharacterIdx = characterService.create(userGameInfo.getUserId());
        Long shopCharacterIdx = characterService.shop(userGameInfo.getUserId());

        String updateStatus = "isMain";
        int updateValue = 0;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), shopCharacterIdx, updateStatus, updateValue);

        // then

        // 메인이었던 캐릭터가 더이상 메인이 아닌지 확인
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).isMain()).isEqualTo(false);
        // 메인이 아니었던 캐릭터가 메인으로 변경되었는지 확인
        assertThat(characterRepository.findCharacterByIdx(shopCharacterIdx).isMain()).isEqualTo(true);
    }

    @Test
    @Order(7)
    @DisplayName("(레벨1, exp 0에서 시작) 캐릭터의 exp만 상승하는지 확인하는 테스트")
    void changeOnlyExpTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());

        String updateStatus = "exp";
        int updateValue = 10;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_01;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(characterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(7)
    @DisplayName("(레벨1, exp 0에서 시작) 캐릭터의 레벨만 상승하는지 확인하는 테스트")
    void changeOnlyLevelTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());

        String updateStatus = "exp";
        int updateValue = 40;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_02;
        int expectExp = 0;

        assertThat(characterRepository.findCharacterByIdx(characterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(7)
    @DisplayName("(레벨1, exp 0에서 시작) 캐릭터의 레벨과 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());

        String updateStatus = "exp";
        int updateValue = 50;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_02;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(characterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(8)
    @DisplayName("(레벨2, exp 0에서 시작) 캐릭터의 exp만 상승하는지 확인하는 테스트")
    void changeOnlyExpFromLEVEL_TWO_Test() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());
        GameCharacter character = characterRepository.findCharacterByIdx(characterIdx);
        character.setLevel(LevelUp.LEVEL_02);

        String updateStatus = "exp";
        int updateValue = 10;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_02;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(characterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(8)
    @DisplayName("(레벨2, exp 0에서 시작) 캐릭터의 레벨만 +1 확인하는 테스트")
    void changeOnlyLevelFromLEVEL_TWO_Test() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());
        GameCharacter character = characterRepository.findCharacterByIdx(characterIdx);
        character.setLevel(LevelUp.LEVEL_02);

        String updateStatus = "exp";
        int updateValue = 80;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_03;
        int expectExp = 0;

        assertThat(characterRepository.findCharacterByIdx(characterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(8)
    @DisplayName("(레벨2, exp 0에서 시작) 캐릭터의 레벨+1 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelFrom_LEVEL_TWO_Test() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());
        GameCharacter character = characterRepository.findCharacterByIdx(characterIdx);
        character.setLevel(LevelUp.LEVEL_02);

        String updateStatus = "exp";
        int updateValue = 120;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_03;
        int expectExp = 40;

        assertThat(characterRepository.findCharacterByIdx(characterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(9)
    @DisplayName("(레벨1, exp 10에서 시작) 캐릭터의 레벨+1 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelFrom_LEVEL_ONE_EXP_10_Test() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());
        GameCharacter character = characterRepository.findCharacterByIdx(characterIdx);
        character.setExp(10);

        String updateStatus = "exp";
        int updateValue = 40;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_02;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(characterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(9)
    @DisplayName("(레벨1, exp 10에서 시작) 캐릭터의 레벨+2 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelFrom_LEVEL_ONE_EXP_10_Test_2() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());
        GameCharacter character = characterRepository.findCharacterByIdx(characterIdx);
        character.setExp(10);

        String updateStatus = "exp";
        int updateValue = 120;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_03;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(characterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(9)
    @DisplayName("(레벨2, exp 10에서 시작) 캐릭터의 레벨+2 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelFrom_LEVEL_TWO_EXP_10_Test_2() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long characterIdx = characterService.create(userGameInfo.getUserId());
        GameCharacter character = characterRepository.findCharacterByIdx(characterIdx);
        character.setExp(10);
        character.setLevel(LevelUp.LEVEL_02);

        String updateStatus = "exp";
        int updateValue = 490;

        // when
        characterService.changeCharacterStatus(userGameInfo.getUserId(), characterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_05;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(characterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(characterIdx).getExp()).isEqualTo(expectExp);
    }
}