package com.shinhan.walfi.service;

import com.shinhan.walfi.dao.BranchListDao;
import com.shinhan.walfi.domain.game.Branch;
import com.shinhan.walfi.dto.game.BranchListReqDto;
import com.shinhan.walfi.dto.game.BranchListResDto;
import com.shinhan.walfi.mapper.BranchMapper;
import com.shinhan.walfi.repository.BranchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchMapper branchMapper;

    private final BranchRepository branchRepository;

    @Override
    public List<BranchListResDto> getBranches(BranchListReqDto branchListReqDto) {

        // 입력 받은 위도 경도에 +- 1km 거리에 해당하는 지점 모두 조회하기

        // 입력 받은 위도, 경도의 +- 50m에 해당하는 값 계산
//        double latitudeDiff = 1 / (6371 * (Math.PI / 180)); // 미터 / ( 단위변환 * 지구반지름 * 라디안 )
        double latitudeDiff = 0.008993216059187306;
//        double longitudeDiff = 1 / (6371 * (Math.PI / 180) * Math.cos(Math.toRadians(35.8448)));
        double longitudeDiff = 0.011094433016828236;

        BranchListDao dao = new BranchListDao();
        dao.setMinLatitude(branchListReqDto.getLatitude()-latitudeDiff);
        dao.setPlusLatitude(branchListReqDto.getLatitude()+latitudeDiff);
        dao.setMinLongitude(branchListReqDto.getLongitude()-longitudeDiff);
        dao.setPlusLongitude(branchListReqDto.getLongitude()+longitudeDiff);
        List<BranchListResDto> branchList = branchMapper.getBranches(dao);

        return branchList;
    }

    @Override
    public Branch getBranch(long id) {
        Optional<Branch> branch = branchRepository.findById(id);
        if(!branch.isPresent()){
            return null;
        }
        return branch.get();
    }
}
