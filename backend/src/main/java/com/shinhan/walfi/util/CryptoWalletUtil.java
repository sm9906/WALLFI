package com.shinhan.walfi.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.utils.Convert;

import java.math.BigDecimal;
import java.math.BigInteger;

@Slf4j
@RequiredArgsConstructor
public class CryptoWalletUtil {

    private final Web3j web3j;

    public BigDecimal checkBalance(String address) {

        BigDecimal balanceInEther = null;

        try {
            EthGetBalance ethGetBalance = web3j.ethGetBalance(address, DefaultBlockParameterName.LATEST).send();
            System.out.println("ethGetBalance = " + ethGetBalance);
            BigInteger balanceInWei = ethGetBalance.getBalance();
            balanceInEther = Convert.fromWei(new BigDecimal(balanceInWei), Convert.Unit.ETHER);

        } catch (Exception e) {
            e.printStackTrace();
        }

        log.info("=== 잔액 {} ===", balanceInEther);
        return balanceInEther;
    }
}
