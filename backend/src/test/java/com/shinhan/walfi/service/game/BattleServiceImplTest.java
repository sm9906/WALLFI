package com.shinhan.walfi.service.game;

import com.shinhan.walfi.domain.game.Branch;
import com.shinhan.walfi.exception.BranchException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class BattleServiceImplTest {

    @PersistenceContext EntityManager em;
    @Autowired BattleService battleService;

    @BeforeEach
    void before() {
        Branch branch = new Branch();
        branch.setBranchIdx(1L);

        em.persist(branch);
    }

    @Test
    @DisplayName("getRank시 브랜치가 없는 예외 테스트")
    void getRankExceptionTest() {
        // given
        Long wrongIdx = 2L;

        // when
        BranchException e = Assertions.assertThrows(BranchException.class,
                () -> battleService.getRank(wrongIdx));

        // then
        assertThat(e.getBranchErrorCode().getMessage()).isEqualTo("해당 지점 정보가 존재하지 않습니다");
    }

}