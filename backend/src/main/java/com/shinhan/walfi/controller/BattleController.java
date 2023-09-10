package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.dto.game.BattleReqDto;
import com.shinhan.walfi.repository.BranchRepository;
import com.shinhan.walfi.service.BattleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/battle")
@RequiredArgsConstructor
public class BattleController {

    private final BattleService battleService;

    @PostMapping
    public ResponseEntity<HttpResult> record(BattleReqDto battleReqDto){

        //기록 및 update
        battleService.write(battleReqDto);

        HttpResult res = HttpResult.getSuccess();
        return ResponseEntity.status(res.getStatus()).body(res);
    }
}
