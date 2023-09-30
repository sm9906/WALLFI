package com.shinhan.walfi.domain.enums;

import lombok.Getter;

@Getter
public enum CoinType {
    ETHEREUM("ETH"),
    KOREAN("KRW"),
    SEPOLIA("SEP");

    final String coinSymbol;

    CoinType(String coinSymbol) {this.coinSymbol = coinSymbol;}
}
