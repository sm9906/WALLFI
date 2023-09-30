package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.banking.CryptoWallet;
import com.shinhan.walfi.domain.enums.CoinType;
import com.shinhan.walfi.repository.UserRepository;
import com.shinhan.walfi.repository.banking.CryptoWalletRepository;
import com.shinhan.walfi.util.CryptoCreateUtil;
import com.shinhan.walfi.util.CryptoWalletUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CryptoWalletService {

    private final CryptoWalletRepository cryptoWalletRepository;

    private final CryptoWalletUtil cryptoWalletUtil;



    /*
    void getCredential() {
        // DB에서 필요한 정보 가져오기
        String jsonWalletString = ...;  // DB에서 가져온 값
        String encPwd = ...;  // DB에서 가져온 값
        String passwordKey = ...;  // DB에서 가져온 값

        // JSON 문자열을 WalletFile 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        WalletFile walletFile = objectMapper.readValue(jsonWalletString, WalletFile.class);

        // 암호화된 비밀번호 복호화
        String password = CryptoUtil.decrypt(encPwd, passwordKey);

        // Credentials 객체 생성
        ECKeyPair ecKeyPair = ECKeyPair.create(walletFile.getKey().decrypt(password));
        Credentials credentials = Credentials.create(ecKeyPair);

        // 거래 생성 및 서명...

    }

     */


}
