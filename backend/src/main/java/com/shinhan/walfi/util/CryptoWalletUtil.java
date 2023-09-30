package com.shinhan.walfi.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.utils.Convert;

import java.math.BigDecimal;
import java.math.BigInteger;

@Slf4j
@Component
@RequiredArgsConstructor
public class CryptoWalletUtil {

    private final Web3j web3j;

    public String checkBalance(String address) {

        String balanceInEther = null;

        try {
            EthGetBalance ethGetBalance = web3j.ethGetBalance(address, DefaultBlockParameterName.LATEST).send();
            BigInteger balanceInWei = ethGetBalance.getBalance();
            balanceInEther = convertWeiToEth(balanceInWei);

        } catch (Exception e) {
            e.printStackTrace();
        }

        log.info("=== 잔액 {} ===", balanceInEther);
        return balanceInEther;
    }

    public String convertWeiToEth(BigInteger wei) {
        return Convert.fromWei(new BigDecimal(wei), Convert.Unit.ETHER).toPlainString();
    }
}
