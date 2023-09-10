package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.TierPerColor;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.CharacterListResDto;
import com.shinhan.walfi.dto.game.CharacterWithUserIdResDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@SpringBootTest
@Transactional
class CharacterServiceTest {
    @PersistenceContext
    EntityManager em;

    @Autowired CharacterService characterService;

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
        Assertions.assertThat(findGameCharacter.getColor()).isEqualTo(TierPerColor.BASIC);
        Assertions.assertThat(findGameCharacter.getLevel()).isEqualTo(1);
        Assertions.assertThat(findGameCharacter.getHp()).isEqualTo(50);
        Assertions.assertThat(findGameCharacter.getExp()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.getAtk()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.getDef()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.isMain()).isEqualTo(true);
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
        Assertions.assertThat(findGameCharacter.getColor()).isEqualTo(TierPerColor.BASIC);
        Assertions.assertThat(findGameCharacter.getLevel()).isEqualTo(1);
        Assertions.assertThat(findGameCharacter.getHp()).isEqualTo(50);
        Assertions.assertThat(findGameCharacter.getExp()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.getAtk()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.getDef()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.isMain()).isEqualTo(false);
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
        Assertions.assertThat(characterListResDto.getCharacterDtoList().size()).isEqualTo(3);
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
        Assertions.assertThat(characterWithUserIdResDto.getCharacterDto().isMain()).isEqualTo(true);
        Assertions.assertThat(characterWithUserIdResDto.getCharacterDto().getCharacterIdx()).isEqualTo(mainCharacterIdx);
    }

    @Test
    @DisplayName("사용자가 전달한 메인 캐릭터의 색을 변경하는 기능 테스트 (변경이 되는건진 정확히 알 수 없음...)")
    void changeColorTest() throws Exception{
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("1234");
        em.persist(userGameInfo);

        Long mainCharacterIdx = characterService.create(userGameInfo.getUserId());

        // when
        characterService.changeCharacterColor(userGameInfo.getUserId(), mainCharacterIdx);

        // then
    }
}