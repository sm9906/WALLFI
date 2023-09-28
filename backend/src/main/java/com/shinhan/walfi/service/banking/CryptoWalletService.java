package com.shinhan.walfi.service.banking;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.banking.CryptoWallet;
import com.shinhan.walfi.domain.enums.CoinType;
import com.shinhan.walfi.repository.UserRepository;
import com.shinhan.walfi.repository.banking.CryptoWalletRepository;
import com.shinhan.walfi.util.CryptoCreateUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.web3j.crypto.*;
import org.web3j.protocol.Web3j;

import javax.transaction.Transactional;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CryptoWalletService {

    private final CryptoWalletRepository cryptoWalletRepository;

    private final UserRepository userRepository;

    private final Web3j web3j;

    /**
     * 가상화폐 계좌 생성
     * @param userId
     * @throws IOException
     */
    public void createCryptoWallet(String userId){

        User user = userRepository.find(userId);

        Map<String, Object> map = new HashMap<>();
        map = createCredentials();

        String jsonWalletString = (String) map.get("jsonWalletString");
        String encPwd = (String) map.get("encPwd");
        String passwordKey = (String) map.get("passwordKey");
        String address = (String) map.get("address");

        CryptoWallet cryptoWallet = CryptoWallet.createCryptoWallet(jsonWalletString, encPwd, passwordKey, address, user, CoinType.SEPOLIA);
        cryptoWalletRepository.save(cryptoWallet);
        log.info("=== {} 코인에 대한 {} 계좌 생성", CoinType.SEPOLIA, address);

    }

    private Map<String, Object> createCredentials() {
        Map<String, Object> map = new HashMap<>();
        try {
            // 랜덤한 UUID를 생성하여 비밀번호로 사용
            String password = UUID.randomUUID().toString().replaceAll("-", "");

            // 새로운 ECKeyPair(타원 곡선 암호화 키 쌍)을 생성
            ECKeyPair ecKeyPair = Keys.createEcKeyPair();

            // 생성된 키 쌍과 비밀번호를 이용하여 WalletFile 객체 생성
            WalletFile walletFile = Wallet.createStandard(password, ecKeyPair);

            // 비밀번호 안호화하는데 사용하는 키
            String passwordKey = CryptoCreateUtil.getSecretKey();

            // 비밀번호 암호화
            String encPwd = CryptoCreateUtil.encrypt(password, passwordKey);

            ObjectMapper objectMapper = new ObjectMapper();

            String jsonWalletString = objectMapper.writeValueAsString(walletFile);

            //ECKeyPair 객체로 Credentials 객체 생성, 거래를 생성하거나 서명할 때 사용
            String address = Credentials.create(ecKeyPair).getAddress();

            log.info("=== jsonWallet: {} ===", jsonWalletString);
            log.info("=== encPwd: {} ===", encPwd);
            log.info("=== passwordKey: {} ===", password);

            map.put("jsonWalletString", jsonWalletString);
            map.put("encPwd", encPwd);
            map.put("passwordKey", passwordKey);
            map.put("address", address);


        } catch (InvalidAlgorithmParameterException e) {
        } catch (CipherException e) {
        } catch (NoSuchAlgorithmException e) {
        } catch (NoSuchProviderException e) {
        } catch (JsonProcessingException e) {
        }
        return map;

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
