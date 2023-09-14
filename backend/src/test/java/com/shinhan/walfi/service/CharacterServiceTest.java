package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.enums.CharacterType;
import com.shinhan.walfi.domain.enums.LevelUp;
import com.shinhan.walfi.domain.enums.TierPerColor;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.CharacterListResDto;
import com.shinhan.walfi.dto.game.CharacterWithUserIdResDto;
import com.shinhan.walfi.exception.CharacterException;
import com.shinhan.walfi.repository.game.CharacterRepository;
import com.shinhan.walfi.repository.game.UserGameInfoRepository;
import com.shinhan.walfi.service.game.CharacterService;
import org.junit.Before;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.Random;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@Transactional
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class CharacterServiceTest {

    @PersistenceContext
    EntityManager em;

    @Autowired CharacterService characterService;
    @Autowired CharacterRepository characterRepository;
    @Autowired UserGameInfoRepository userGameInfoRepository;

    String userId = "ssafy";
    Long mainCharacterIdx;
    Long shopCharacterIdx_1;
    Long shopCharacterIdx_2;

    @BeforeEach
    void create() {

        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId(userId);
        em.persist(userGameInfo);

        GameCharacter main = GameCharacter.createCharacter(userGameInfo, CharacterType.LION, true);
        GameCharacter shop1 = GameCharacter.createCharacter(userGameInfo, CharacterType.TIGER, false);
        GameCharacter shop2 = GameCharacter.createCharacter(userGameInfo, CharacterType.SHIBA, false);

        em.persist(main);
        em.persist(shop1);
        em.persist(shop2);

        mainCharacterIdx = main.getCharacterIdx();
        shopCharacterIdx_1 = shop1.getCharacterIdx();
        shopCharacterIdx_2 = shop2.getCharacterIdx();

    }

    @Test
    @Order(3)
    @DisplayName("userId를 이용한 메인 캐릭터 조회 (searchHomeCharacter)")
    void searchMainCharacter() {
        // given

        // when
        CharacterWithUserIdResDto characterWithUserIdResDto = characterService.searchMainCharacter(userId);

        // then
        assertThat(characterWithUserIdResDto.getCharacterDto().isMain()).isEqualTo(true);
        assertThat(characterWithUserIdResDto.getCharacterDto().getCharacterIdx()).isEqualTo(mainCharacterIdx);
    }

    @Test
    @Order(4)
    @DisplayName("사용자가 전달한 메인 캐릭터의 색을 변경하는 기능 테스트 (변경이 되는건진 정확히 알 수 없음...)")
    void changeColorTest() {
        // given

        // when
        characterService.changeCharacterColor(userId, mainCharacterIdx);
    }

    @Test
    @Order(5)
    @DisplayName("atk를 변경하는 테스트")
    void changeAtkTest() {
        // given
        int defaultAtk = characterRepository.findCharacterByIdx(mainCharacterIdx).getAtk();

        int updateValue = 2;
        String updateStatus = "atk";
        String act = "밥먹기";

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue, act);

        // then
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getAtk())
                .isEqualTo(updateValue + defaultAtk);
    }

    @Test
    @Order(5)
    @DisplayName("def를 변경하는 테스트")
    void changeDefTest() {
        // given
        int defaultDef = characterRepository.findCharacterByIdx(mainCharacterIdx).getDef();

        int updateValue = 5;
        String updateStatus = "def";
        String act = "훈련하기";

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue, act);

        // then
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getDef())
                .isEqualTo(updateValue + defaultDef);
    }

    @Test
    @Order(5)
    @DisplayName("hp를 변경하는 테스트")
    void changeHpTest() {
        // given
        int defaultHp = characterRepository.findCharacterByIdx(mainCharacterIdx).getHp();

        int updateValue = 50;
        String updateStatus = "hp";

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getHp())
                .isEqualTo(updateValue + defaultHp);
    }

    @Test
    @Order(6)
    @DisplayName("메인이 아닌 캐릭터를 메인으로 변경하는 기능 테스트")
    void changeMainTest() {
        // given
        String updateStatus = "isMain";
        int updateValue = 0;

        // when
        characterService.updateCharacterStatus(userId, shopCharacterIdx_1, updateStatus, updateValue);

        // then

        // 메인이었던 캐릭터가 더이상 메인이 아닌지 확인
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).isMain()).isEqualTo(false);
        // 메인이 아니었던 캐릭터가 메인으로 변경되었는지 확인
        assertThat(characterRepository.findCharacterByIdx(shopCharacterIdx_1).isMain()).isEqualTo(true);
    }

    @Test
    @Order(7)
    @DisplayName("(레벨1, exp 0에서 시작) 캐릭터의 exp만 상승하는지 확인하는 테스트")
    void changeOnlyExpTest() {
        // given
        String updateStatus = "exp";
        int updateValue = 10;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_01;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(7)
    @DisplayName("(레벨1, exp 0에서 시작) 캐릭터의 레벨만 상승하는지 확인하는 테스트")
    void changeOnlyLevelTest() {
        // given
        String updateStatus = "exp";
        int updateValue = 40;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_02;
        int expectExp = 0;

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(7)
    @DisplayName("(레벨1, exp 0에서 시작) 캐릭터의 레벨과 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelTest() {
        // given
        String updateStatus = "exp";
        int updateValue = 50;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_02;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(8)
    @DisplayName("(레벨2, exp 0에서 시작) 캐릭터의 exp만 상승하는지 확인하는 테스트")
    void changeOnlyExpFromLEVEL_TWO_Test() {
        // given
        GameCharacter character = characterRepository.findCharacterByIdx(mainCharacterIdx);
        character.setLevel(LevelUp.LEVEL_02);

        String updateStatus = "exp";
        int updateValue = 10;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_02;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(8)
    @DisplayName("(레벨2, exp 0에서 시작) 캐릭터의 레벨만 +1 확인하는 테스트")
    void changeOnlyLevelFromLEVEL_TWO_Test() {
        // given
        GameCharacter character = characterRepository.findCharacterByIdx(mainCharacterIdx);
        character.setLevel(LevelUp.LEVEL_02);

        String updateStatus = "exp";
        int updateValue = 80;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_03;
        int expectExp = 0;

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(8)
    @DisplayName("(레벨2, exp 0에서 시작) 캐릭터의 레벨+1 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelFrom_LEVEL_TWO_Test() {
        // given
        GameCharacter character = characterRepository.findCharacterByIdx(mainCharacterIdx);
        character.setLevel(LevelUp.LEVEL_02);

        String updateStatus = "exp";
        int updateValue = 120;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_03;
        int expectExp = 40;

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(9)
    @DisplayName("(레벨1, exp 10에서 시작) 캐릭터의 레벨+1 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelFrom_LEVEL_ONE_EXP_10_Test() {
        // given
        GameCharacter character = characterRepository.findCharacterByIdx(mainCharacterIdx);
        character.setExp(10);

        String updateStatus = "exp";
        int updateValue = 40;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_02;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(9)
    @DisplayName("(레벨1, exp 10에서 시작) 캐릭터의 레벨+2 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelFrom_LEVEL_ONE_EXP_10_Test_2() {
        // given
        GameCharacter character = characterRepository.findCharacterByIdx(mainCharacterIdx);
        character.setExp(10);

        String updateStatus = "exp";
        int updateValue = 120;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_03;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(9)
    @DisplayName("(레벨2, exp 10에서 시작) 캐릭터의 레벨+2 exp가 같이 상승하는지 확인하는 테스트")
    void changeExpLevelFrom_LEVEL_TWO_EXP_10_Test_2() {
        // given
        GameCharacter character = characterRepository.findCharacterByIdx(mainCharacterIdx);
        character.setExp(10);
        character.setLevel(LevelUp.LEVEL_02);

        String updateStatus = "exp";
        int updateValue = 490;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_05;
        int expectExp = 10;

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @Order(9)
    @DisplayName("(레벨10, exp 10에서 시작) 캐릭터의 레벨과 exp가 고정되는지 확인하는 테스트")
    void changeExpLevelFrom_LEVEL_TEN_EXP_10_Test() {
        // given
        GameCharacter character = characterRepository.findCharacterByIdx(mainCharacterIdx);
        character.setExp(10);
        character.setLevel(LevelUp.LEVEL_10);

        String updateStatus = "exp";
        int updateValue = 50000;

        // when
        characterService.updateCharacterStatus(userId, mainCharacterIdx, updateStatus, updateValue);

        // then
        LevelUp expectLevel = LevelUp.LEVEL_10;
        int expectExp = expectLevel.getNeededExp();

        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getLevel()).isSameAs(expectLevel);
        assertThat(characterRepository.findCharacterByIdx(mainCharacterIdx).getExp()).isEqualTo(expectExp);
    }

    @Test
    @DisplayName("메인 캐릭터가 이미 존재하는데 캐릭터를 생성할 때의 예외 테스트")
    public void createExceptionTest()  {
        // given

        // when
        CharacterException e = Assertions.assertThrows(CharacterException.class,
                () -> characterService.create(userId));

        // then
        assertThat(e.getCharacterErrorCode().getMessage())
                .isEqualTo("이미 메인 캐릭터가 있는 사용자입니다");

    }

    @Test
    @DisplayName("색 변경시 공방 상승 테스트")
    public void updateAtkDefWhenChangeColor() {
        // TODO: 색 변경시 공방 상승 테스트
    }

    //TODO: 스테이터스 -1 시 예외 발생 테스트
    //TODO: 밥먹기를 보냈는데 atk를 +하지 않았을때 예외 발생 테스트
    //TODO: 훈련하기를 했는데 def를 +하지 않았을때 예외 발생 테스트
}