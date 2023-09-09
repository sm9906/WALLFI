package com.shinhan.walfi.repository;

import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CharacterRepository {

    private final EntityManager em;

    public void save(GameCharacter gameCharacter) {
        em.persist(gameCharacter);
    }

    public List<GameCharacter> findCharactersByUserGameInfo(UserGameInfo userGameInfo) {
        List characterList = em.createQuery("select g from GameCharacter g where g.userGameInfo=userGameInfo")
                .getResultList();
        return characterList;
    }

    public GameCharacter findHomeCharacter(UserGameInfo userGameInfo) {
        GameCharacter result = (GameCharacter) em.createQuery(
                "select g from GameCharacter g " +
                        "where g.userGameInfo=userGameInfo " +
                        "and g.isMain=true")
                .getSingleResult();

        return result;
    }
}
