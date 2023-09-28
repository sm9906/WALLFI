package com.shinhan.walfi.controller;


import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.service.banking.CryptoWalletService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@RestController
@RequestMapping("crypto/")
public class CryptoWalletController {
    @Autowired
    private CryptoWalletService cryptoWalletService;

    @PostMapping("/create")
    public ResponseEntity<Object> createCryptoWallet(@ApiIgnore @AuthenticationPrincipal User user){

        cryptoWalletService.createCryptoWallet(user.getUserId());
        HttpResult res = HttpResult.getSuccess();

        return ResponseEntity.status(res.getStatus()).body(res);
    }

}
