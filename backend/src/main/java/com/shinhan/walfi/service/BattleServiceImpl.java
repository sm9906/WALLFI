package com.shinhan.walfi.service;

import com.shinhan.walfi.dao.BattleDao;
import com.shinhan.walfi.domain.game.Branch;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.BattleReqDto;
import com.shinhan.walfi.mapper.BattleMapper;
import com.shinhan.walfi.repository.BranchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BattleServiceImpl implements BattleService{

    private final BranchRepository branchRepository;

    private final BattleMapper battleMapper;

    @Override
    public void write(BattleReqDto battleReqDto) {

        // branch 정보 불러옴
        Optional<Branch> oBranch = branchRepository.findById(battleReqDto.getBranchIdx());

        if(oBranch.isEmpty()){
            // Exception
        } else{
            Branch branch = oBranch.get();
            LocalDateTime start = branch.getStartTime();
            BattleDao dao = new BattleDao();
            dao.setBranchIdx(branch.getBranchIdx());
            dao.setUserId(branch.getUserGameInfo().getUserId());
            dao.setStartTime(start);
            battleMapper.write(dao);

            // branch update
            // 게임 케릭터 불러와서 브랜치 업데이트

            // user_game_info update
            // 이긴사람 정보 불러와서 업데이트

            /* 진 사람의 정보 업데이트
                user_id가 진 사람의 아이디와 브랜치를 조회하여 count한 수가 0과 같으면
                진 사람의 user_game_info status를 "도전자"로 변경
            */
        }
    }
}
