package com.shinhan.walfi.domain.enums;

import lombok.Getter;

@Getter
public enum CoinType {
    ETHEREUM("ETH", 1),
    KOREAN("KRW", -1),
    SEPOLIA("SEP", 11155111);

    final String coinSymbol;

    final int chainId;

    CoinType(String coinSymbol, int chainId) {
        this.chainId = chainId;
        this.coinSymbol = coinSymbol;
    }
}
