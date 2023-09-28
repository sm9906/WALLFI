package com.shinhan.walfi.domain.banking;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.enums.CoinType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CryptoWallet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String jsonWallet;

    private String encpwd;

    private String passwordKey;

    private String address;

    @Enumerated(EnumType.STRING)
    private CoinType coinType;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;


    public CryptoWallet createCryptoWallet(String jsonWallet, String encpwd, String passwordKey, String address, CoinType coinType) {
        CryptoWallet cryptoWallet = new CryptoWallet();
        cryptoWallet.jsonWallet = jsonWallet;
        cryptoWallet.encpwd = encpwd;
        cryptoWallet.passwordKey = passwordKey;
        cryptoWallet.address = address;
        cryptoWallet.coinType = coinType;

        return cryptoWallet;
    }
}