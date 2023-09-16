package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;

import com.shinhan.walfi.dto.game.*;
import com.shinhan.walfi.service.game.CharacterService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/character")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

    @PostMapping("/create")
    @ApiOperation(value = "사용자의 계정으로 새로운 캐릭터를 랜덤한 타입으로 생성")
    public ResponseEntity<HttpResult> createRandomCharacter(@RequestBody CharacterReqDto characterReqDto) {
        String userId = characterReqDto.getUserId();
        CharacterWithUserIdResDto characterWithUserIdResDto = characterService.create(userId);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(characterWithUserIdResDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/shop")
    @ApiOperation(value = "사용자의 계정으로 캐릭터 뽑기")
    public ResponseEntity<HttpResult> shopRandomCharacter(@RequestBody CharacterReqDto characterReqDto) {
        String userId = characterReqDto.getUserId();
        CharacterWithUserIdResDto characterWithUserIdResDto = characterService.shop(userId);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(characterWithUserIdResDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/getcharacters")
    @ApiOperation(value = "사용자가 보유하고 있는 캐릭터 목록을 조회")
    public ResponseEntity<HttpResult> getCharacters(@RequestBody CharacterReqDto characterReqDto) {
        String userId = characterReqDto.getUserId();
        CharacterListResDto characterListResDto = characterService.searchCharacters(userId);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(characterListResDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/getmain")
    @ApiOperation(value = "사용자가 보유하고 있는 메인 캐릭터를 조회")
    public ResponseEntity<HttpResult> getMainCharacter(@RequestBody CharacterReqDto characterReqDto) {
        String userId = characterReqDto.getUserId();
        CharacterWithUserIdResDto characterWithUserIdResDto = characterService.searchMainCharacter(userId);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(characterWithUserIdResDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PutMapping("/change/color")
    @ApiOperation(value = "색을 랜덤으로 골라 사용자의 메인 캐릭터의 색을 변화시키는 기능",
    notes = "act='밥먹기'와 atk를 같이 보내야 함" +
            "act='훈련하기'와 def를 같이 보내야 함")
    public ResponseEntity<HttpResult> changeCharacterColor(@RequestBody MainCharacterReqDto mainCharacterReqDto) {
        String userId = mainCharacterReqDto.getUserId();
        Long mainCharacterIdx = mainCharacterReqDto.getMainCharacterIdx();

        CharacterWithUserIdResDto characterWithUserIdResDto = characterService.changeCharacterColor(userId, mainCharacterIdx);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(characterWithUserIdResDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PutMapping("/change/status")
    @ApiOperation(value = "사용자가 보유하고 있는 캐릭터의 스텟(atk, def, exp, isMain, point)를 상승/변화 시킴")
    public ResponseEntity<HttpResult> changeCharacterStatus(@RequestBody CharacterStatusReqDto characterStatusReqDto) {
        String userId = characterStatusReqDto.getUserId();
        Long characterIdx = characterStatusReqDto.getCharacterIdx();
        String statusType = characterStatusReqDto.getStatusType();
        int statusValue = characterStatusReqDto.getValue();
        String act = characterStatusReqDto.getAct();

        CharacterWithUserIdResDto characterWithUserIdResDto
                = characterService.updateCharacterStatus(userId, characterIdx, statusType, statusValue, act);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(characterWithUserIdResDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/maxcharacter")
    @ApiOperation(value = "사용자가 보유하고 MAX 레벨 캐릭터 수 반환")
    public ResponseEntity<HttpResult> getMaxLevelCharacterNum(@RequestBody CharacterReqDto characterReqDto) {
        String userId = characterReqDto.getUserId();

        MaxCharacterNumResDto maxLevelCharacterNumDto = characterService.getMaxLevelCharacterNum(userId);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(maxLevelCharacterNumDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }
}
