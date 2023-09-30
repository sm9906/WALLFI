package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.dto.banking.GasResDto;
import com.shinhan.walfi.repository.banking.CryptoWalletRepository;
import com.shinhan.walfi.util.CryptoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CryptoServiceImpl implements CryptoService{

    private final CryptoWalletRepository cryptoWalletRepository;

    private final CryptoUtil cryptoUtil;

    @Override
    public GasResDto getGasFee() {

        String ethGasFee = cryptoUtil.getGasFeeInEth();
        String krwGasPrice = cryptoUtil.convertEthToKrw(ethGasFee);

        log.info("=== krwGasPrice: {} ===", krwGasPrice);
        log.info("=== safeGasPriceInEth: {} ==== ", ethGasFee);
        return GasResDto.getGasResDto(ethGasFee, krwGasPrice);
    }



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
