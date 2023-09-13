package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.game.Branch;
import com.shinhan.walfi.dto.game.BranchListReqDto;
import com.shinhan.walfi.dto.game.BranchListResDto;
import com.shinhan.walfi.dto.game.BranchResDto;
import com.shinhan.walfi.mapper.BranchMapper;
import com.shinhan.walfi.service.BranchService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/branch")
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

    private final BranchMapper branchMapper;

    @PostMapping
    public ResponseEntity<HttpResult> getBranches(@RequestBody BranchListReqDto branchListReqDto){

        List<BranchListResDto> branchList = branchService.getBranches(branchListReqDto);

        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(branchList);
        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @GetMapping
    public ResponseEntity<HttpResult> getBranch(@RequestParam long idx){

        BranchResDto branch = branchService.getBranch(idx);
        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(branch);
        return ResponseEntity.status(res.getStatus()).body(res);
    }

}
