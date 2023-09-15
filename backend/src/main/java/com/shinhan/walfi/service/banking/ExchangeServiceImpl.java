package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.domain.User;
import com.shinhan.walfi.domain.banking.Account;
import com.shinhan.walfi.dto.banking.ExchangeDto;
import com.shinhan.walfi.dto.banking.ExchangeResDto;
import com.shinhan.walfi.exception.TransferErrorCode;
import com.shinhan.walfi.exception.TransferException;
import com.shinhan.walfi.exception.UserErrorCode;
import com.shinhan.walfi.exception.UserException;
import com.shinhan.walfi.mapper.BankMapper;
import com.shinhan.walfi.repository.UserRepository;
import com.shinhan.walfi.repository.banking.AccountRepository;
import com.shinhan.walfi.util.ExchangeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ExchangeServiceImpl implements ExchangeService {

    private final ExchangeUtil util;

    private final BankMapper bankMapper;

    private final UserRepository userRepository;

    private final AccountRepository accountRepository;

    List<String> currency = Arrays.asList("USD", "JPY", "EUR", "CNY", "AUD");

    @Override
    public ExchangeResDto getTodayExchange() throws ParseException {
        List<ExchangeDto> exchangeDtoList = util.getTodayExchange();

        // 전일대비 증감 계산
        List<ExchangeDto> yesterDayList = util.getYesterdayExchange();
        // Todo : 추후 환율 정보를 DB에 저장하고 불러오도록 구현
        
        for (int i = 0; i < exchangeDtoList.size(); i++) {
            exchangeDtoList.get(i).set전일대비(
                    Math.round((yesterDayList.get(i).get매매기준환율() - exchangeDtoList.get(i).get매매기준환율()) * 100) / 100F
            );
        }

        ExchangeResDto dto = new ExchangeResDto();
        dto.setExchangeDtoList(exchangeDtoList);
        return dto;
    }

    /**
     * 원화 -> 외화로의 환전
     *
     * < 로직 >
     * 1. 사용자 원화 계좌 조회
     * 2. 사용자 통화코드 계좌 조회
     * 3. 원화 계좌에서 금액 * 전신환매도환율 만큼 차감
     * 4. 외화 계좌로 금액 만큼 입금
     *
     * @exception 'NO_MATCHING_USER' - 사용자를 찾을 수 없을 때 예외 발생
     * @exception 'NOT_USERS_MAIN_ACCOUNT' - 사용자의 대표 계좌와 일치하지 않을 경우 예외 발생
     * @exception 'NOT_FOUND_KRW_ACCOUNT' - 원화 계좌가 존재하지 않을 때 예외 발생
     * @exception 'NOT_FOUND_GLOBAL_ACCOUNT' - 외화 계좌가 존재하지 않을 때 예외 발생
     * @exception 'OVERDRAWN' - 원화 계좌 잔액 부족
     * @param userId
     * @param 사용자대표계좌
     * @param 통화코드
     * @param 금액
     * @param 전신환매도환율
     */
    @Override
    public void userExchange(String userId, String 사용자대표계좌, String 도착계좌통화코드, long 금액, float 전신환매도환율) {

        // 도착계좌의 통화코드가 원화면 안됨
        if (도착계좌통화코드.equals("KRW")) {
            throw new TransferException(TransferErrorCode.NOT_FOR_BUY);
        }

        if (!currency.contains(도착계좌통화코드)) {
            log.error("=== " + 도착계좌통화코드 + "는 존재하지 않는 통화 코드입니다 ===");
            throw new TransferException(TransferErrorCode.NOT_FOUND_CURRENCY);
        }

        User user = userRepository.find(userId);

        if (user == null) {
            log.error("=== 틀린 비밀번호이거나 존재하지 않는 회원 ===");
            throw new UserException(UserErrorCode.NO_MATCHING_USER);
        }

        if (!user.get대표계좌().equals(사용자대표계좌)) {
            log.error("=== 대표계좌: " + 사용자대표계좌 + "는 id: " + userId + "의 계좌가 아님 ===");
            throw new TransferException(TransferErrorCode.NOT_USERS_MAIN_ACCOUNT);
        }

        String krwAccountNum = bankMapper.findSubAccountNumberByCurrencyCode(사용자대표계좌, "KRW");
        if (krwAccountNum == null) {
            log.error("=== id: " + userId + "에게는 KRW 계좌가 존재하지 않음");
            throw new TransferException(TransferErrorCode.NOT_FOUND_KRW_ACCOUNT);
        }

        String globalAccountNum = bankMapper.findSubAccountNumberByCurrencyCode(사용자대표계좌, 도착계좌통화코드);
        if (globalAccountNum == null) {
            log.error("=== id: " + userId + "에게는 " + 도착계좌통화코드 + " 계좌가 존재하지 않음");
            throw new TransferException(TransferErrorCode.NOT_FOUND_GLOBAL_ACCOUNT);
        }

        long kwrConvertPrice = (long) Math.ceil(전신환매도환율 * 금액);
        Account krwAccount = accountRepository.findAccount(krwAccountNum);

        if (krwAccount.get잔액원화() < kwrConvertPrice) {
            log.error("=== id: " + userId + "의 원화 계좌 잔액이 부족합니다");
            throw new TransferException(TransferErrorCode.OVERDRAWN);
        }

        bankMapper.withdrawTransferMoneyFromAccount(krwAccountNum, kwrConvertPrice);
        bankMapper.globalDepositTransferMoneyFromAccount(globalAccountNum, 금액, kwrConvertPrice);

        log.info("=== id: " + userId + "의 요청에 따라 " + 금액 + 도착계좌통화코드 + " 환전 완료 ===" );

    }

}
