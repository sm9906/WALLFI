package com.shinhan.walfi.util;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JWTUtilTest {

    @Autowired
    JWTUtil jwtUtil;

    @Test
    void getAccessToken(){
        String token = jwtUtil.createAccessToken("ssafy", "ssafy");
        System.out.println("AccessToken : "+token);
    }
}