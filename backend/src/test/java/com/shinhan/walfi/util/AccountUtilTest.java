package com.shinhan.walfi.util;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.banking.Account;
import com.shinhan.walfi.repository.banking.AccountRepository;
import org.assertj.core.api.AssertionInfo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class AccountUtilTest {

    @PersistenceContext EntityManager em;
    @Autowired AccountRepository accountRepository;

    String userId = "ssafy";
    String userMainAccount = "1234";
    String userBasicAccount1 = "110001611111";
    String userBasicAccount2 = "110001622222";
    String userBasicAccount3 = "110001633333";
    String userBasicAccount4 = "110001644444";


    @BeforeEach
    void before() {
        User user = new User();
        user.setUserId(userId);
        user.set대표계좌(userMainAccount);
        em.persist(user);

//        Account account1 = Account.createBasicAccount(userBasicAccount1, "KRW", user);
//        Account account2 = Account.createBasicAccount(userBasicAccount2, "KRW", user);
//        Account account3 = Account.createBasicAccount(userBasicAccount3, "KRW", user);
//        Account account4 = Account.createBasicAccount(userBasicAccount4, "KRW", user);

//        em.persist(account1);
//        em.persist(account2);
//        em.persist(account3);
//        em.persist(account4);
    }
//
//    @Test
//    @DisplayName("계좌번호 가져오는 테스트")
//    void getAccountNumRepoTest() {
//        // given
//
//        // when
//        List<String> accountsNum = accountRepository.findAccountsWithOnlyAccountNum();
//
//        // then
//        Assertions.assertThat(accountsNum.size()).isEqualTo(4);
//    }
//
//    @Test
//    @DisplayName("계좌 번호 생성 테스트")
//    void test() {
//        // given
//        String targetAccountNum = String.valueOf(Long.parseLong(userBasicAccount4) + 1);
//
//        List<String> accountsNum = accountRepository.findAccountsWithOnlyAccountNum();
//
//
//        // when
//        AccountUtil accountUtil = new AccountUtil();
//        String accountNum = accountUtil.createAccountNum(accountsNum);
//
//        // then
//        System.out.println("accountNum = " + accountNum);
//        Assertions.assertThat(accountNum).isEqualTo(targetAccountNum);
//
//    }
}