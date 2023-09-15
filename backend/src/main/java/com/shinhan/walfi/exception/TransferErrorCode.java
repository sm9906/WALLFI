package com.shinhan.walfi.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;


@Getter
@AllArgsConstructor
public enum TransferErrorCode {

    NOT_FOUND_DEPOSIT_MAIN_ACCOUNT_NUMBER(BAD_REQUEST, "입금 대표 계좌 번호를 조회할 수 없습니다."),
    NOT_FOUND_WITHDRAWAL_MAIN_ACCOUNT_NUMBER(BAD_REQUEST, "출금 대표 계좌 번호를 조회할 수 없습니다."),
    NOT_FOUND_DEPOSIT_SUB_ACCOUNT_NUMBER(BAD_REQUEST, "입금 세부 계좌 번호를 조회할 수 없습니다."),
    NOT_FOUND_WITHDRAWAL_SUB_ACCOUNT_NUMBER(BAD_REQUEST, "출금 세부 계좌 번호를 조회할 수 없습니다."),
    OVERDRAWN(BAD_REQUEST, "잔액이 부족합니다."),
    NOT_FOUND_KRW_ACCOUNT(BAD_REQUEST, "원화 계좌를 조회 할 수 없습니다"),
    NOT_FOUND_GLOBAL_ACCOUNT(BAD_REQUEST, "외화 계좌를 조회 할 수 없습니다"),
    NOT_USERS_MAIN_ACCOUNT(BAD_REQUEST, "사용자의 대표 계좌가 아닙니다");

    private final HttpStatus httpStatus;

    private final String message;
}
