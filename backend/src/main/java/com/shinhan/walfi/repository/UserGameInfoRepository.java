package com.shinhan.walfi.repository;

import com.shinhan.walfi.domain.game.UserGameInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class UserGameInfoRepository {

    private final EntityManager em;

    public UserGameInfo findByUserId(String userId) {
        return em.createQuery("select u from UserGameInfo u " +
                "where u.userId=userId ", UserGameInfo.class).getSingleResult();
    }

}
