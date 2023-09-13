package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.dto.UserDto;
import com.shinhan.walfi.dto.banking.LoginReqDto;
import com.shinhan.walfi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<HttpResult> getUserList(){
        List<User> userList = userService.getUserList();

        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(userList);
        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<HttpResult> login(@RequestBody LoginReqDto loginReqDto){
        UserDto userDto = userService.login(loginReqDto.getUserId(), loginReqDto.getPassword());

        HttpResult res;
        res = HttpResult.getSuccess();
        res.setData(userDto);

        return ResponseEntity.status(res.getStatus()).body(res);
    }

}




    //    @PostMapping("/signup")
//    public ResponseEntity<HttpResult> signup(@RequestBody SignupReqDto signupReqDto){
//        User user = signupReqDto.dtoToEntity();
//        userService.signup(user);
//
//        HttpResult res;
//        res = HttpResult.getSuccess();
//        return ResponseEntity.status(res.getStatus()).body(res);
//    }
