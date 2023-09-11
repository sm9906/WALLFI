package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.banking.Account;
import com.shinhan.walfi.mapper.BankMapper;
import com.shinhan.walfi.repository.AccountRepo;
import com.shinhan.walfi.repository.UserRepo;
import org.apache.ibatis.javassist.NotFoundException;
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

    @Autowired
    BankMapper bankMapper;

    @Autowired
    UserRepo userRepo;

    @Autowired
    AccountRepo accountRepo;

    @BeforeAll
    void 테스트_데이터_넣기() {
        User userA = new User("ssafy", "ssafy@ssafy.com", "ssafy",
                "김싸피", LocalDateTime.now(), "010-1234-5678", "0001", new ArrayList<>());

        User userB = new User("ssafyA", "ssafyA@ssafy.com", "ssafyA",
                "박싸피", LocalDateTime.now(), "010-1234-5678", "0002", new ArrayList<>());

        userRepo.save(userA);
        userRepo.save(userB);

        Account accountA = new Account("1111", "KRW", 10000L, userA);
        Account accountB = new Account("2222", "KRW", 10000L, userB);

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
}
