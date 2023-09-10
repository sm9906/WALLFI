package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;

import com.shinhan.walfi.dto.game.*;
import com.shinhan.walfi.service.CharacterService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/character")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

    @PostMapping("/create")
    public ResponseEntity<HttpResult> createRandomCharacter(@RequestBody CharacterReqDto characterReqDto) {
        String userId = characterReqDto.getUserId();
        characterService.create(userId);

        HttpResult res;

        res = HttpResult.getSuccess();
        
        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/shop")
    public ResponseEntity<HttpResult> shopRandomCharacter(@RequestBody CharacterReqDto characterReqDto) {
        String userId = characterReqDto.getUserId();
        characterService.shop(userId);

        HttpResult res;

        res = HttpResult.getSuccess();

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/getcharacters")
    public ResponseEntity<HttpResult> getCharacters(@RequestBody CharacterReqDto characterReqDto) {
        String userId = characterReqDto.getUserId();
        CharacterListResDto characterListResDto = characterService.searchCharacters(userId);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(characterListResDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/getmain")
    public ResponseEntity<HttpResult> getMainCharacter(@RequestBody CharacterReqDto characterReqDto) {
        String userId = characterReqDto.getUserId();
        CharacterWithUserIdResDto characterWithUserIdResDto = characterService.searchMainCharacter(userId);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(characterWithUserIdResDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PutMapping("/change/color")
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
    public ResponseEntity<HttpResult> changeCharacterStatus(@RequestBody CharacterStatusReqDto characterStatusReqDto) {
        String userId = characterStatusReqDto.getUserId();
        Long characterIdx = characterStatusReqDto.getCharacterIdx();
        String statusType = characterStatusReqDto.getStatusType();
        int statusValue = characterStatusReqDto.getValue();

        CharacterWithUserIdResDto characterWithUserIdResDto
                = characterService.changeCharacterStatus(userId, characterIdx, statusType, statusValue);

        HttpResult res;

        res = HttpResult.getSuccess();
        res.setData(characterWithUserIdResDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }
}
