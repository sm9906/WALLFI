package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.banking.Account;
import com.shinhan.walfi.mapper.BankMapper;
import com.shinhan.walfi.repository.AccountRepo;
import com.shinhan.walfi.repository.UserRepo;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;


@SpringBootTest
@Transactional
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class BankServiceImplTest {

    // 테스트 시, 필요한 변수들
    final String WITHDRAWAL_MAIN_ACCOUNT_NUMBER = "0001";
    final String WITHDRAWAL_SUB_ACCOUNT_NUMBER = "1111";
    final String DEPOSIT_MAIN_ACCOUNT_NUMBER = "0002";
    final String DEPOSIT_SUB_ACCOUNT_NUMBER = "2222";
    final String CURRENCY_CODE = "KRW";
    final int TRANSFER_MONEY = 2000;

    // 테스트 시, 필요한 Component 주입
    @Autowired
    BankMapper bankMapper;

    @Autowired
    UserRepo userRepo;

    @Autowired
    AccountRepo accountRepo;

    @BeforeAll
    void 테스트_데이터_넣기() {
        User userA = new User("ssafy", "ssafy@ssafy.com", "ssafy",
                "김싸피", LocalDateTime.now(), "010-1234-5678",
                WITHDRAWAL_MAIN_ACCOUNT_NUMBER, new ArrayList<>());

        User userB = new User("ssafyA", "ssafyA@ssafy.com", "ssafyA",
                "박싸피", LocalDateTime.now(), "010-1234-5678",
                DEPOSIT_MAIN_ACCOUNT_NUMBER, new ArrayList<>());

        userRepo.save(userA);
        userRepo.save(userB);

        Account accountA = new Account(WITHDRAWAL_SUB_ACCOUNT_NUMBER, "KRW", 10000L, userA);
        Account accountB = new Account(DEPOSIT_SUB_ACCOUNT_NUMBER, "KRW", 10000L, userB);

        userA.getAccounts().add(accountA);
        userB.getAccounts().add(accountB);

        accountRepo.save(accountA);
        accountRepo.save(accountB);
    }

    @Test
    @Order(1)
    public void 테스트_데이터_확인() {

        Optional<User> findUserA = userRepo.findById("ssafy");
        Optional<User> findUserB = userRepo.findById("ssafyA");

        Optional<Account> findAccountA = accountRepo.findById("1111");

        findUserA.ifPresent(user -> {
            Assertions.assertEquals(user.getName(), "김싸피");
            Assertions.assertEquals(user.getMainAccount(), "0001");
        });

        findUserB.ifPresent(user -> {
            Assertions.assertEquals(user.getName(), "박싸피");
        });

        findAccountA.ifPresentOrElse(account -> {
            Assertions.assertEquals(account.get대표계좌().getUserId(), "ssafy");
        }, () -> {
            throw new EntityNotFoundException("AccountA를 찾을 수 없습니다.");
        });
    }

    @Test
    @Order(2)
    public void 출금_대표_계좌_번호_조회() {
        boolean result = bankMapper.findMainAccountNumber(WITHDRAWAL_MAIN_ACCOUNT_NUMBER);
        Assertions.assertEquals(result, true);
    }

    @Test
    @Order(3)
    public void 출금_세부_계좌_번호_조회() {
        String result = bankMapper.findSubAccountNumberByCurrencyCode(
                WITHDRAWAL_MAIN_ACCOUNT_NUMBER,
                CURRENCY_CODE
        );
        Assertions.assertEquals(result, WITHDRAWAL_SUB_ACCOUNT_NUMBER);
    }

    @Test
    @Order(4)
    public void 입금_대표_계좌_번호_조회() {
        boolean result = bankMapper.findMainAccountNumber(DEPOSIT_MAIN_ACCOUNT_NUMBER);
        Assertions.assertEquals(result, true);
    }

    @Test
    @Order(5)
    public void 입금_세부_계좌_번호_조회() {
        String result = bankMapper.findSubAccountNumberByCurrencyCode(
                DEPOSIT_MAIN_ACCOUNT_NUMBER,
                CURRENCY_CODE
        );

        Assertions.assertEquals(result, DEPOSIT_SUB_ACCOUNT_NUMBER);
    }

    @Test
    @Order(6)
    public void 출금_계좌에_이체_금액_이상의_돈이_있는지_확인() {

        boolean result = bankMapper.checkSufficientMoneyForTransfer(
                WITHDRAWAL_SUB_ACCOUNT_NUMBER,
                TRANSFER_MONEY
        );

        Assertions.assertEquals(result, true);
    }

    @Test
    @Order(7)
    public void 출금_계좌에_이체_금액만큼_차감() {

        int result = bankMapper.withdrawTransferMoneyFromAccount(
                WITHDRAWAL_SUB_ACCOUNT_NUMBER,
                TRANSFER_MONEY
        );

        Assertions.assertEquals(result, 1);
    }

    @Test
    @Order(8)
    public void 입금_계좌에_이체_금액만큼_입금() {

        int result = bankMapper.depositTransferMoneyFromAccount(
                DEPOSIT_SUB_ACCOUNT_NUMBER,
                TRANSFER_MONEY
        );

        Assertions.assertEquals(result, 1);
    }
}
