package com.shinhan.walfi.repository;

import com.shinhan.walfi.domain.game.GameCharacter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class CharacterRepository {

    private final EntityManager em;

    public void save(GameCharacter gameCharacter) {
        em.persist(gameCharacter);
    }
}
