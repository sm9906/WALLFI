package com.shinhan.walfi.repository;

import com.shinhan.walfi.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final EntityManager em;

    public String join(User user) {
        em.persist(user);
        return user.getId();
    }

    public User findUserById(String userId) {
        return em.find(User.class, userId);
    }

}
