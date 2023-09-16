package com.shinhan.walfi.service.game;

import com.shinhan.walfi.dao.BattleDao;
import com.shinhan.walfi.domain.game.Branch;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.BattleRankResDto;
import com.shinhan.walfi.dto.game.BattleReqDto;
import com.shinhan.walfi.exception.BranchErrorCode;
import com.shinhan.walfi.exception.BranchException;
import com.shinhan.walfi.mapper.BattleMapper;
import com.shinhan.walfi.repository.game.BranchRepository;
import com.shinhan.walfi.repository.game.CharacterRepository;
import com.shinhan.walfi.repository.game.UserGameInfoRepository;
import com.shinhan.walfi.util.CharacterStatusUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BattleServiceImpl implements BattleService{

    private final BranchRepository branchRepository;

    private final BattleMapper battleMapper;

    private final CharacterRepository characterRepository;

    private final UserGameInfoRepository userGameInfoRepository;

    private final CharacterStatusUtil util;

    /**
     *
     * @exception 'NO_MATCHING_BRANCH' - 지점 정보가 없을 때 예외 발생
     * @param battleReqDto
     */
    @Override
    @Transactional
    public void write(BattleReqDto battleReqDto) {

        // branch 정보 불러옴
        Optional<Branch> oBranch = branchRepository.findById(battleReqDto.getBranchIdx());

        if(oBranch.isEmpty()){
            log.error("=== idx: "+ battleReqDto.getBranchIdx() + " 지점 정보를 찾을 수 없습니다 ===");
            throw new BranchException(BranchErrorCode.NO_MATCHING_BRANCH);
        } else{
            // battle 기록
            Branch branch = oBranch.get();
            String loser = branch.getUserGameInfo().getUserId();

            if(!"manager".equals(loser)){ // 패배한 임시 지점장이 두더지인(userId=manager) 경우에는 기록하지 않는다. 따라서 manager가 아닐때만 기록
                LocalDateTime start = branch.getStartTime(); // 패배한 임시 지점장이 지점을 먹기 시작한 시간
                BattleDao dao = new BattleDao();
                dao.setBranchIdx(branch.getBranchIdx());
                dao.setUserId(branch.getUserGameInfo().getUserId());
                dao.setStartTime(start);
                battleMapper.write(dao); // start 시간을 기준으로 occupyTime을 계산하여 저장
            }

            UserGameInfo winnerUserGameInfo = userGameInfoRepository.findById(battleReqDto.getUserId());

            // 이긴 사람의 메인 캐릭터 불러와서 브랜치 업데이트
            GameCharacter winner = characterRepository.findMainCharacter(winnerUserGameInfo);
            branch.setManagerLevel(winner.getLevel());
            branch.setManagerExp(winner.getExp());
            branch.setManagerHp(winner.getHp());
            branch.setManagerAtk(winner.getAtk());
            branch.setManagerDef(winner.getDef());
            branch.setStartTime(LocalDateTime.now());
            branch.setUserGameInfo(winnerUserGameInfo);
            branchRepository.save(branch);

            // 이긴 사람의 캐릭터 exp +50, point +50
            GameCharacter updateGameCharacter = util.updateExp(50, winner);
            UserGameInfo updateUserGameInfo = util.updatePoint(50, winnerUserGameInfo);

            characterRepository.save(updateGameCharacter);
            userGameInfoRepository.save(updateUserGameInfo);

            // 이긴사람의 title 만들어주기 (점유 시작이 가장 옛날인 브랜치명 기준)
            StringBuilder title = new StringBuilder();

            //이긴 사람이 지금 먹고 있는 지점 중에 점유 시작이 가장 옛날인 브랜치명 조회
            String branchName = branchRepository.getOldestStart(winnerUserGameInfo.getUserId());
            title.append(branchName);
            title.append(" 지점장");
            winnerUserGameInfo.setStatus(title.toString());
            userGameInfoRepository.save(winnerUserGameInfo);

            /* 진 사람의 정보 업데이트
                user_id가 진 사람의 아이디인 브랜치를 조회하여 count한 수가 0과 같으면
                진 사람의 user_game_info status를 "도전자"로 변경
            */
            int occupiedBranchCnt = branchRepository.countOccupiedBranch(loser);

            if(occupiedBranchCnt == 0){
                UserGameInfo loserGameInfo = userGameInfoRepository.findById(loser);
                loserGameInfo.setStatus("도전자");
                userGameInfoRepository.save(loserGameInfo);
            }

            log.info("=== 유저: " + battleReqDto.getUserId() + " 의 " + branch.getBranchName() + "지점에서의 전투 기록 ===");
        }
    }

    /**
     * 임시 지점장의 점유 기간을 기준으로 정렬하여 반환하는 기능
     *
     * @exception 'NO_MATCHING_BRANCH' - 지점 정보가 없을 때 예외 발생
     * @param idx
     * @return List<BattleRankResDto>
     */
    @Override
    public List<BattleRankResDto> getRank(Long idx) {

        Optional<Branch> branch = branchRepository.findById(idx);

        if (branch.isEmpty()) {
            log.error("=== idx: "+ idx + " 지점 정보를 찾을 수 없습니다 ===");
            throw new BranchException(BranchErrorCode.NO_MATCHING_BRANCH);
        }

        List<BattleRankResDto> rankList = battleMapper.getRank(idx);

        log.info("=== 지점 조회 ===");
        return rankList;
    }

    @Override
    public List<BattleRankResDto> getAllRank() {
        List<BattleRankResDto> rankList = battleMapper.getAllRank();
        return rankList;
    }

    @Override
    public double getRate(String userId) {
        int toptenCnt = battleMapper.cntTop(userId);
        if(toptenCnt == 0){
            return 0;
        } else{
            double rate = battleMapper.getRate(userId);
            return rate;
        }
    }
}
