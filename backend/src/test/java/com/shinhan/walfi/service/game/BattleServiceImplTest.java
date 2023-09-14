package com.shinhan.walfi.service.game;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.enums.CharacterType;
import com.shinhan.walfi.domain.game.Branch;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.BattleReqDto;
import com.shinhan.walfi.dto.game.CharacterReqDto;
import com.shinhan.walfi.exception.BranchException;
import com.shinhan.walfi.exception.UserException;
import com.shinhan.walfi.mapper.BattleMapper;
import com.shinhan.walfi.repository.game.BranchRepository;
import com.shinhan.walfi.repository.game.CharacterRepository;
import com.shinhan.walfi.repository.game.UserGameInfoRepository;
import org.junit.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.nio.ByteBuffer;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class BattleServiceImplTest {

    @PersistenceContext EntityManager em;
    @Autowired BattleService battleService;
    @Autowired CharacterService characterService;
    @Autowired CharacterRepository characterRepository;
    @Autowired UserGameInfoRepository userGameInfoRepository;
    @Autowired BranchRepository branchRepository;


    String userId = "ssafy";
    Long characterIdx;
    Long branchIdx = 1L;

    @BeforeEach
    void before() {

        User user = new User();
        user.setUserId(userId);
        em.persist(user);

        UserGameInfo userGameInfo = new UserGameInfo();
        userGameInfo.setUserId(userId);
        em.persist(userGameInfo);

        Branch branch = new Branch();
        branch.setBranchIdx(branchIdx);
        branch.setUserGameInfo(userGameInfo);
        em.persist(branch);

        characterIdx = GameCharacter.createCharacter(userGameInfo, CharacterType.LION, true).getCharacterIdx();
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

    // TODO: 사용자 exp +50 확인
    @Test
    @DisplayName("배틀 기록시 exp +50 테스트")
    void battleHistoryExpTest() {
        // given
        BattleReqDto battleReqDto = new BattleReqDto();
        battleReqDto.setBranchIdx(branchIdx);
        battleReqDto.setUserId(userId);

        UserGameInfo userGameInfo = userGameInfoRepository.findById(userId);

//         when
        battleService.write(battleReqDto);

        GameCharacter mainCharacter = characterRepository.findMainCharacter(userGameInfo);

//         then
        assertThat(mainCharacter.getExp()).isEqualTo(10);

    }
    // TODO: 사용자 point + 50 확인
     // TODO: 지점장 이름 확인
}