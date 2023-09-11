package com.shinhan.walfi.mapper;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface BankMapper {

    /** =============================
     *  ===== 이체 관련 Method ======
     *  =============================
     */

    // 출금 대표 계좌 번호 조회
    int findMainWithdrawalAccountNumber(String mainWithdrawalAccountNumber);

    // 출금 세부 계좌 번호 조회
    int findSubWithdrawalAccountNumber();

    // 입금 대표 계좌 번호 조회
    int findMainDepositAccountNumber(String mainDepositAccountNumber);

    // 입금 세부 계좌 번호 조회
    int findSubDepositAccountNumber();

    // 출금 계좌에 이체 금액 이상의 돈이 있는지 확인
    boolean checkSufficientMoneyForTransfer();

    // 출금 계좌에 이체 금액만큼 차감
    int decreaseMoneyFromWithdrawalAccount(int money);

    // 입금 계좌에 이체 금액만큼 입금
    int increaseMoneyToDepositAccount(int money);
}
