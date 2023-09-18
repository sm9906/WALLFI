package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.dto.UserDto;
import com.shinhan.walfi.dto.LoginReqDto;
import com.shinhan.walfi.dto.UserReqDto;
import com.shinhan.walfi.dto.game.UserGameInfoDto;
import com.shinhan.walfi.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @ApiOperation(value = "사용자 목록 조회")
    public ResponseEntity<HttpResult> getUserList(){
        List<UserDto> userList = userService.getUserList();

        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(userList);
        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public ResponseEntity<HttpResult> login(@RequestBody LoginReqDto loginReqDto){
        UserDto userDto = userService.login(loginReqDto.getUserId(), loginReqDto.getPassword());

        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(userDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }



}
