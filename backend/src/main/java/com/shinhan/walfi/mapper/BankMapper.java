package com.shinhan.walfi.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface BankMapper {

    /** =============================
     *  ===== 이체 관련 Method ======
     *  =============================
     */

    // 대표 계좌 번호 조회
    int findMainAccountNumber(String mainWithdrawalAccountNumber);

    // 세부 계좌 번호 통화 코드로 조회
    String findSubAccountNumberByCurrencyCode(String mainWithdrawalAccountNumber, String currencyCode);

    // 출금 계좌에 이체 금액 이상의 돈이 있는지 확인
    int checkSufficientMoneyForTransfer(@Param("subAccountNumber") String subAccountNumber,
                                        @Param("transferMoney") int transferMoney);

    // 출금 계좌에 이체 금액만큼 차감
    int decreaseMoneyFromWithdrawalAccount(int money);

    // 입금 계좌에 이체 금액만큼 입금
    int increaseMoneyToDepositAccount(int money);
}
