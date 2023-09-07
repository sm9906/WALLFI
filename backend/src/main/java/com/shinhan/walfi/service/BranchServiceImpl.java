package com.shinhan.walfi.service;

import com.shinhan.walfi.dao.BranchListDao;
import com.shinhan.walfi.domain.game.Branch;
import com.shinhan.walfi.dto.game.BranchListReqDto;
import com.shinhan.walfi.dto.game.BranchListResDto;
import com.shinhan.walfi.mapper.BranchMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchMapper branchMapper;

    @Override
    public BranchListResDto getBranches(BranchListReqDto branchListReqDto) {

        // Todo : 입력 받은 위도 경도에 +- 50m 거리에 해당하는 지점 모두 조회하기

        // 입력 받은 위도, 경도의 +- 50m에 해당하는 값 계산
        double latitudeDiff = 50 / (1000 * 6371 * (Math.PI / 180)); // 미터 / ( 단위변환 * 지구반지름 * 라디안 )
        double longitudeDiff = 50 / (1000 * 6371 * (Math.PI / 180) * Math.cos(Math.toRadians(35.8448)));
        BranchListDao dao = new BranchListDao();
        dao.setMinLatitude(branchListReqDto.getLatitude()-latitudeDiff);
        dao.setPlusLatitude(branchListReqDto.getLatitude()+latitudeDiff);
        dao.setMinLongitude(branchListReqDto.getLongitude()-longitudeDiff);
        dao.setPlusLongitude(branchListReqDto.getLongitude()+longitudeDiff);
        List<Branch> branchList = branchMapper.getBranches(dao);
        // resources/mapper/branch.xml 구현 필요

        BranchListResDto branchListResDto = new BranchListResDto();
        branchListResDto.setBranchList(branchList);
        return branchListResDto;
    }
}
