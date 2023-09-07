package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.TierPerColor;
import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.game.GameCharacter;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
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
    @DisplayName("캐릭터 생성 확인 테스트 (색, 레벨, hp, exp, atk, def, ismain)")
    public void createCharacter() {
        // given
        User user = new User();
        user.setUserId("ssafy");

        // when
        Long findGameIdx = characterService.create(user.getUserId());
        GameCharacter findGameCharacter = em.find(GameCharacter.class, findGameIdx);

        // then
        Assertions.assertThat(findGameCharacter.getColor()).isEqualTo(TierPerColor.BASIC);
        Assertions.assertThat(findGameCharacter.getLevel()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.getHp()).isEqualTo(100);
        Assertions.assertThat(findGameCharacter.getExp()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.getAtk()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.getDef()).isEqualTo(0);
        Assertions.assertThat(findGameCharacter.isMain()).isEqualTo(true);
    }

}