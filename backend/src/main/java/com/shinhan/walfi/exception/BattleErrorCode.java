package com.shinhan.walfi.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;


@Getter
@AllArgsConstructor
public enum BattleErrorCode {

    NOT_A_USER_ACCOUNT(BAD_REQUEST, "유저 정보와 대표계좌가 일치하지 않습니다");

    private final HttpStatus httpStatus;

    private final String message;
}
