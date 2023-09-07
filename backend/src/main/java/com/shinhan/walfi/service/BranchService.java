package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.game.BranchListReqDto;
import com.shinhan.walfi.dto.game.BranchListResDto;

public interface BranchService {
    BranchListResDto getBranches(BranchListReqDto branchListReqDto);
}
