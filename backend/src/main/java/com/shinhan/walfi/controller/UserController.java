package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.dto.banking.SignupReqDto;
import com.shinhan.walfi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<HttpResult> signup(@RequestBody SignupReqDto signupReqDto){
        User user = signupReqDto.dtoToEntity();
        userService.signup(user);

        HttpResult res;
        res = HttpResult.getSuccess();
        return ResponseEntity.status(res.getStatus()).body(res);
    }
}
