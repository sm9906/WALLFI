package com.shinhan.walfi.repository.banking;


import com.shinhan.walfi.domain.banking.CryptoWallet;
import com.shinhan.walfi.domain.game.UserGameInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class CryptoWalletRepository {

    private final EntityManager em;

    public CryptoWallet save(CryptoWallet cryptoWallet) {
        em.persist(cryptoWallet);
        return cryptoWallet;
    }

}
