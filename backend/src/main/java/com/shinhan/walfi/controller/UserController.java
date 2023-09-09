package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.dto.banking.LoginReqDto;
import com.shinhan.walfi.dto.banking.SignupReqDto;
import com.shinhan.walfi.service.AccountService;
import com.shinhan.walfi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final AccountService accountService;

    @PostMapping("/signup")
    public ResponseEntity<HttpResult> signup(@RequestBody SignupReqDto signupReqDto){
        User user = signupReqDto.dtoToEntity();
        userService.signup(user);

        accountService.makeSix(user.getUserId());

        HttpResult res;
        res = HttpResult.getSuccess();
        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<HttpResult> login(@RequestBody LoginReqDto loginReqDto){
        int loginResult = userService.login(loginReqDto.getUserId(), loginReqDto.getPassword());

        HttpResult res;
        if(loginResult == 1 ){
            res = HttpResult.getSuccess();

        } else{
            res = new HttpResult(HttpStatus.FORBIDDEN, HttpResult.Result.FAIL, "로그인 실패");
        }
        return ResponseEntity.status(res.getStatus()).body(res);
    }
}
