package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.dto.game.BranchListReqDto;
import com.shinhan.walfi.dto.game.BranchListResDto;
import com.shinhan.walfi.dto.game.BranchDto;
import com.shinhan.walfi.dto.game.BranchResDto;
import com.shinhan.walfi.service.game.BranchService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/branch")
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

    @PostMapping
    @ApiOperation(value = "입력한 좌표를 기준으로 반경 1km 이내의 신한은행 지점 목록을 조회")
    public ResponseEntity<HttpResult> getBranches(@RequestBody BranchListReqDto branchListReqDto){

        List<BranchListResDto> branchList = branchService.getBranches(branchListReqDto);

        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(branchList);
        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @GetMapping
    @ApiOperation(value = "branch_idx를 입력하면 해당 지점의 상세 정보를 조회")
    public ResponseEntity<HttpResult> getBranch(@RequestParam long idx){

        BranchResDto branch = branchService.getBranch(idx);
        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(branch);
        return ResponseEntity.status(res.getStatus()).body(res);
    }

}
