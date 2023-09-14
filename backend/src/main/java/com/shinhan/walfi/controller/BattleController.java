package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.dto.game.BattleRankResDto;
import com.shinhan.walfi.dto.game.BattleReqDto;
import com.shinhan.walfi.service.game.BattleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/battle")
@RequiredArgsConstructor
public class BattleController {

    private final BattleService battleService;

    @PostMapping
    public ResponseEntity<HttpResult> record(BattleReqDto battleReqDto){

        // 기록 및 update
        battleService.write(battleReqDto);

        HttpResult res = HttpResult.getSuccess();
        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @GetMapping
    public ResponseEntity<HttpResult> getRank(@RequestParam Long idx){
        // 특정 idx 브랜치의 랭킹 정보를 반환한다.

        List<BattleRankResDto> list = battleService.getRank(idx);

        HttpResult res = HttpResult.getSuccess();
        res.setData(list);
        return ResponseEntity.status(res.getStatus()).body(res);
    }
}
