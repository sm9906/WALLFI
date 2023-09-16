package com.shinhan.walfi.domain.game;

import com.shinhan.walfi.domain.enums.CharacterType;
import com.shinhan.walfi.repository.game.CharacterRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class GameCharacterTest {

    @PersistenceContext
    EntityManager em;

    @Autowired CharacterRepository characterRepository;

    @Test
    @DisplayName("연관관계 생성자 테스트")
    public void constructorTest() throws Exception {
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("123");
        em.persist(userGameInfo);

        // when
        GameCharacter.createCharacter(userGameInfo, CharacterType.LION, true);

        // then
        assertThat(userGameInfo.getGameCharacters().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("레포지토리에서 연관관계 테스트")
    public void repositoryRelationTest() throws Exception {
        // given
        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId("123");
        em.persist(userGameInfo);

        // when
        GameCharacter gameCharacter = GameCharacter.createCharacter(userGameInfo, CharacterType.LION, true);
        characterRepository.save(gameCharacter);

        em.flush();
        em.clear();

        // then
        assertThat(userGameInfo.getGameCharacters().size()).isEqualTo(1);

    }
}