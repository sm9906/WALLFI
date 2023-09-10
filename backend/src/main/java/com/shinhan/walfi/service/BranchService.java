package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.game.Branch;
import com.shinhan.walfi.dto.game.BranchListReqDto;
import com.shinhan.walfi.dto.game.BranchListResDto;
import com.shinhan.walfi.dto.game.BranchResDto;

import java.util.List;

public interface BranchService {

    List<BranchListResDto> getBranches(BranchListReqDto branchListReqDto);

    BranchResDto getBranch(long idx);
}
