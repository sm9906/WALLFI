package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.transfer.LocalTransferDTO;
import com.shinhan.walfi.exception.TransferErrorCode;
import com.shinhan.walfi.exception.TransferException;
import com.shinhan.walfi.mapper.BankMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static com.shinhan.walfi.exception.TransferErrorCode.*;
import static java.util.Objects.isNull;


@Slf4j
@Service
@RequiredArgsConstructor
public class BankServiceImpl implements BankService {

    private final BankMapper bankMapper;

    /**
     * 원화 이체 Logic
     * <p>
     * 1. 출금 계좌 번호 조회 <p>
     * 2. 입금 대표 계좌 번호 조회 <p>
     * 3. 입금 세부 계좌 번호 조회 <p>
     * 4. 출금 계좌에 이체 금액 이상의 돈이 있는지 확인 <p>
     * 5. 출금 계좌에 이체 금액만큼 차감 <p>
     * 6. 입금 계좌에 이체 금액만큼 입금 <p>
     *
     * @param localTransferDTO
     */
    @Override
    @Transactional
    public void localCurrencyTransferDTO(LocalTransferDTO localTransferDTO) {

        boolean result;
        final String CURRENCY_CODE = "KRW";

        final long TRANSFER_MONEY = localTransferDTO.get이체금액();
        final String DEPOSIT_MAIN_ACCOUNT_NUMBER = localTransferDTO.get입금계좌번호();
        final String WITHDRAWAL_MAIN_ACCOUNT_NUMBER = localTransferDTO.get출금계좌번호();

        log.debug("=== 출금 대표 계좌 번호 조회 중 ===");
        result = bankMapper.findMainAccountNumber(WITHDRAWAL_MAIN_ACCOUNT_NUMBER);
        if (!result) {
            log.error("출금 대표 계좌가 조회 불가");
            throw new TransferException(NOT_FOUND_WITHDRAWAL_MAIN_ACCOUNT_NUMBER);
        }

        log.debug("=== 입금 대표 계좌 번호 조회 중 ===");
        result = bankMapper.findMainAccountNumber(DEPOSIT_MAIN_ACCOUNT_NUMBER);
        if (!result) {
            log.error("입금 대표 계좌가 조회 불가");
            throw new TransferException(NOT_FOUND_DEPOSIT_MAIN_ACCOUNT_NUMBER);
        }

        log.debug("=== 출금 세부 계좌 번호 조회 중 ===");
        final String WITHDRAWAL_SUB_ACCOUNT_NUMBER = bankMapper.findSubAccountNumberByCurrencyCode(
                WITHDRAWAL_MAIN_ACCOUNT_NUMBER,
                CURRENCY_CODE
        );
        if (isNull(WITHDRAWAL_SUB_ACCOUNT_NUMBER)) {
            log.error("출금 세부 계좌 번호 조회 불가");
            throw new TransferException(NOT_FOUND_WITHDRAWAL_SUB_ACCOUNT_NUMBER);
        }


        log.debug("=== 입금 세부 계좌 번호 조회 중 ===");
        final String DEPOSIT_SUB_ACCOUNT_NUMBER = bankMapper.findSubAccountNumberByCurrencyCode(
                DEPOSIT_MAIN_ACCOUNT_NUMBER,
                CURRENCY_CODE
        );
        if (isNull(DEPOSIT_SUB_ACCOUNT_NUMBER)) {
            log.error("입금 세부 계좌 번호 조회 불가");
            throw new TransferException(NOT_FOUND_DEPOSIT_SUB_ACCOUNT_NUMBER);
        }

        log.debug("=== 출금 계좌에 이체 금액 이상의 돈이 있는지 확인 ===");
        result = bankMapper.checkSufficientMoneyForTransfer(
                WITHDRAWAL_SUB_ACCOUNT_NUMBER,
                TRANSFER_MONEY
        );
        if (!result) {
            log.error("잔액 부족");
            throw new TransferException(OVERDRAWN);
        }

        log.debug("{}원 송금 진행: {} -> {}", TRANSFER_MONEY, WITHDRAWAL_SUB_ACCOUNT_NUMBER, DEPOSIT_SUB_ACCOUNT_NUMBER);
        bankMapper.withdrawTransferMoneyFromAccount(WITHDRAWAL_SUB_ACCOUNT_NUMBER, TRANSFER_MONEY);
        bankMapper.depositTransferMoneyFromAccount(DEPOSIT_SUB_ACCOUNT_NUMBER, TRANSFER_MONEY);
    }
}
