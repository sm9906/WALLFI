package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.banking.Account;

import java.util.ArrayList;
import java.util.List;

public class AccountServiceImpl implements AccountService {
    @Override
    public void makeSix(String userId) {
        // 계좌 6개 생성 // 필드 생각해서 한국 / 미 중 일 호주 영국
        // 계좌 번호를 어떻게 생성할 것인가?
            // 100 - 9자리 랜덤
        List<Account> accountList = new ArrayList<>();
        Account account = new Account();
        account.set계좌번호(account.makeRandomAccountNumber("410"));
        accountList.add(account);
        account = new Account();
        account.set계좌번호(account.makeRandomAccountNumber("410"));

        // Todo : 계좌 생성 어떻게 할지 멘토링 해보고 구현
    }

}
