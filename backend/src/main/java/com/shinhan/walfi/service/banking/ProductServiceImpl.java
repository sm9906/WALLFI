package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.banking.Account;
import com.shinhan.walfi.dto.banking.ExchangeDto;
import com.shinhan.walfi.exception.UserErrorCode;
import com.shinhan.walfi.exception.UserException;
import com.shinhan.walfi.repository.UserRepository;
import com.shinhan.walfi.repository.banking.AccountRepository;
import com.shinhan.walfi.util.AccountUtil;
import com.shinhan.walfi.util.DateConversionUtil;
import com.shinhan.walfi.util.ExchangeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final AccountRepository accountRepository;

    private final DateConversionUtil dateConversionUtil;

    private final UserRepository userRepository;

    private final ExchangeUtil exchangeUtil;

    private final AccountUtil accountUtil;


    /**
     * 정기적금 상품 가입
     *
     * @exception 'NO_MATCHING_USER' - 비밀번호가 틀리거나 존재하지 않는 사용자의 경우 예외 발생
     * @param userId
     * @param 통화코드
     * @param 상품명
     * @param 만기일
     * @param 금리
     */
    @Override
    public void createTimeDeposit(String userId, String 통화코드, String 상품명, String 만기일, BigDecimal 금리, long 입금금액) {

        User user = userRepository.find(userId);
        if (user == null) {
            log.error("=== id: " + user.getUserId() + " 틀린 비밀번호이거나 존재하지 않는 회원 ===");
            throw new UserException(UserErrorCode.NO_MATCHING_USER);
        }

        // 만기일 계산
        Date 변환된만기일;
        try {
            변환된만기일 = dateConversionUtil.convertStringToDate(만기일);
        } catch (ParseException e) {
            log.error("=== 만기일 변환시 에러 발생 ===");
            throw new RuntimeException(e);
        }

        List<String> accounts = accountRepository.findAccountsWithOnlyAccountNum();
        String accountNum = accountUtil.createAccountNum(accounts);

        // 상품 만들기
        Account productAccount = null;
        if (통화코드.equals("KRW")) {
            productAccount = Account.createKrwProductAccount(accountNum, 상품명, 변환된만기일, 금리, 통화코드, user, 입금금액);
        } else {
            long 원화환산금액 = 0;
            List<ExchangeDto> todayExchanges;

            try {
                todayExchanges = exchangeUtil.getTodayExchange();
            } catch (org.json.simple.parser.ParseException e) {
                throw new RuntimeException(e);
            }

            for (ExchangeDto todayExchange : todayExchanges) {
                if (todayExchange.get통화코드().equals(통화코드)) {
                    원화환산금액 = (long) (Math.floor(todayExchange.get매매기준환율() * 입금금액));
                }
            }

            productAccount = Account.createGlobalProductAccount(accountNum, 상품명, 변환된만기일, 금리, 통화코드, user, 입금금액, 원화환산금액);
        }
        accountRepository.save(productAccount);

        log.info("=== " + 상품명 + " " + 통화코드 + " " + " 생성 ===");

    }
}
