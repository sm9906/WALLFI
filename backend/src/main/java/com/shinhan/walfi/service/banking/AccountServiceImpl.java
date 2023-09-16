package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.banking.Account;
import com.shinhan.walfi.dto.banking.AccountDto;
import com.shinhan.walfi.dto.banking.AccountResDto;
import com.shinhan.walfi.exception.AccountErrorCode;
import com.shinhan.walfi.exception.AccountException;
import com.shinhan.walfi.exception.UserErrorCode;
import com.shinhan.walfi.exception.UserException;
import com.shinhan.walfi.repository.UserRepository;
import com.shinhan.walfi.util.AccountUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccountServiceImpl implements AccountService{

    private final UserRepository userRepository;

    /**
     * 유저와 연관된 계좌들을 조회 하는 기능
     *
     * @exception 'NO_MATCHING_USER' - 해당 유저를 조회할 수 없을때 예외 발생
     * @exception 'AccountResDto' - 전송한 대표계좌가 유저의 계좌가 아니면 예외 발생
     * @param userId
     * @param userMainAccount
     * @return AccountResDto
     */
    public AccountResDto getAccounts(String userId, String userMainAccount) {

        User user = userRepository.find(userId);

        if (user == null) {
            throw new UserException(UserErrorCode.NO_MATCHING_USER);
        }

        if (!user.get대표계좌().equals(userMainAccount)) {
            log.error("=== " + userMainAccount + "은 " + userId + "의 계좌가 아닌 예외 " +" ===");
            throw new AccountException(AccountErrorCode.NOT_A_USER_ACCOUNT);
        }

        List<Account> accounts = user.getAccounts();
        List<AccountDto> accountDtoList = accounts.stream()
                .map(account -> getAccountDto(account))
                .collect(Collectors.toList());
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
