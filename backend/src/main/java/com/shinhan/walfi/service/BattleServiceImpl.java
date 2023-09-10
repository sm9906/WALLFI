package com.shinhan.walfi.service;

import com.shinhan.walfi.dao.BattleDao;
import com.shinhan.walfi.domain.game.Branch;
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

        //branch 정보 불러옴
        Optional<Branch> oBranch = branchRepository.findById(battleReqDto.getBranchIdx());

        if(oBranch.isEmpty()){
            //Exception
        } else{
            Branch branch = oBranch.get();
            LocalDateTime start = branch.getStartTime();
            BattleDao dao = new BattleDao();
            dao.setBranchIdx(battleReqDto.getBranchIdx());
            dao.setUserId(battleReqDto.getUserId());
            dao.setStartTime(start);

            battleMapper.write(dao);
        }
    }
}
