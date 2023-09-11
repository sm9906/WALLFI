package com.shinhan.walfi.service;

import com.shinhan.walfi.dao.BattleDao;
import com.shinhan.walfi.domain.LevelUp;
import com.shinhan.walfi.domain.game.Branch;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.BattleRankResDto;
import com.shinhan.walfi.dto.game.BattleReqDto;
import com.shinhan.walfi.mapper.BattleMapper;
import com.shinhan.walfi.repository.BranchRepository;
import com.shinhan.walfi.repository.CharacterRepository;
import com.shinhan.walfi.repository.UserGameInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BattleServiceImpl implements BattleService{

    private final BranchRepository branchRepository;

    private final BattleMapper battleMapper;

    private final CharacterRepository characterRepository;

    private final UserGameInfoRepository userGameInfoRepository;

    @Override
    public void write(BattleReqDto battleReqDto) {

        // branch 정보 불러옴
        Optional<Branch> oBranch = branchRepository.findById(battleReqDto.getBranchIdx());

        if(oBranch.isEmpty()){
            // Exception
        } else{
            // Todo : manager인 경우 기록하지 않도록 한다. (임시 지점장이 초기 상태인 경우)

            // battle 기록
            Branch branch = oBranch.get();
            LocalDateTime start = branch.getStartTime(); // 패배한 임시 지점장이 지점을 먹기 시작한 시간
            BattleDao dao = new BattleDao();
            dao.setBranchIdx(branch.getBranchIdx());
            dao.setUserId(branch.getUserGameInfo().getUserId());
            dao.setStartTime(start);
            battleMapper.write(dao); // start 시간을 기준으로 occupyTime을 계산하여 저장

            String loser = branch.getUserGameInfo().getUserId();

            // user_game_info update
            // 이긴사람 정보 불러와서 업데이트
            UserGameInfo userGameInfo = userGameInfoRepository.findById(battleReqDto.getUserId());
            userGameInfo.setStatus("지점장");
            userGameInfoRepository.save(userGameInfo);

            // branch update
            // 이긴 사람의 메인 캐릭터 불러와서 브랜치 업데이트
            GameCharacter winner = characterRepository.findMainCharacter(userGameInfo);
            branch.setManagerLevel(winner.getLevel());
            branch.setManagerExp(winner.getExp());
            branch.setManagerHp(winner.getHp());
            branch.setManagerAtk(winner.getAtk());
            branch.setManagerDef(winner.getDef());
            branch.setStartTime(LocalDateTime.now());
            branch.setUserGameInfo(userGameInfo);
            branchRepository.save(branch);

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
        }
    }

    @Override
    public List<BattleRankResDto> getRank(Long idx) {
        return battleMapper.getRank(idx);
    }
}
