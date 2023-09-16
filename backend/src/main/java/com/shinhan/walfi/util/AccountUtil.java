package com.shinhan.walfi.util;

import com.shinhan.walfi.repository.banking.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class AccountUtil {

    public String createAccountNum(List<String> accountsNum) {
        String defaultAccountNum = "110001";

        String lastAccountNum = accountsNum.get(accountsNum.size() - 1);

        Long subLastAccountNum = Long.parseLong(lastAccountNum.substring(defaultAccountNum.length())) + 1;

        return defaultAccountNum + subLastAccountNum;
    }
}
