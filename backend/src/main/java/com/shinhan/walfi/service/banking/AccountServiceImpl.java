package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.banking.Account;
import com.shinhan.walfi.dto.banking.AccountDto;
import com.shinhan.walfi.dto.banking.AccountResDto;
import com.shinhan.walfi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AccountServiceImpl implements AccountService{

    private final UserRepository userRepository;

    public AccountResDto getAccounts(String userId, String userMainAccount) {

        // TODO: userId와 대표계좌가 다르면 exception

        User user = userRepository.find(userId);

        List<Account> accounts = user.getAccounts();
        List<AccountDto> accountDtoList = accounts.stream().map(account -> getAccountDto(account)).collect(Collectors.toList());
        AccountResDto accountResDto = getAccountResDto(userId, accountDtoList);


        return accountResDto;
    }

    /**
     * Account를 AccountDto로 변환하는 기능
     *
     * @param account
     * @return AccountDto
     */
    private AccountDto getAccountDto(Account account) {
        return AccountDto.builder()
                .계좌번호(account.get계좌번호())
                .구분(account.get구분())
                .상품명(account.get상품명())
                .잔액통화별(account.get잔액통화별())
                .평가금액통화별(account.get평가금액통화별())
                .신규일(account.get신규일())
                .만기일(account.get만기일())
                .관리점명(account.get관리점명())
                .금리수익률(account.get금리수익률())
                .통화(account.get통화())
                .과세(account.get과세())
                .잔액원화(account.get잔액원화())
                .평가금액원화(account.get평가금액원화())
                .자동해지여부(account.get자동해지여부())
                .build();
    }

    /**
     * AccountDto를 AccountResDto로 변환하는 기능
     *
     * @param userId
     * @param accountDtoList
     * @return AccountResDto
     */
    private AccountResDto getAccountResDto(String userId, List<AccountDto> accountDtoList) {
        return AccountResDto.builder()
                .userId(userId)
                .accountsLength(accountDtoList.size())
                .AccountDtoList(accountDtoList)
                .build();
    }
}
