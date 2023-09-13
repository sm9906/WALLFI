package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.dto.UserReqDto;
import com.shinhan.walfi.dto.game.UserGameInfoDto;
import com.shinhan.walfi.dto.game.UserGamePointReqDto;
import com.shinhan.walfi.service.game.UserGameInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class UserGameInfoController {

    private final UserGameInfoService userGameInfoService;

    @PostMapping("/getinfo")
    public ResponseEntity<HttpResult> getUserGameInfo(@RequestBody UserReqDto userReqDto){
        UserGameInfoDto userGameInfoDto = userGameInfoService.getUserGameInfo(userReqDto.getUserId());

        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(userGameInfoDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/pointup")
    public ResponseEntity<HttpResult> updatePoint(@RequestBody UserGamePointReqDto userGamePointReqDto){
        UserGameInfoDto userGameInfoDto = userGameInfoService.getUserGameInfo(userGamePointReqDto.getUserId());

        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(userGameInfoDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }
}
