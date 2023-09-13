package com.shinhan.walfi.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;


@Getter
@AllArgsConstructor
public enum CharacterErrorCode {

    HAS_MAIN_CHARACTER(BAD_REQUEST, "이미 메인 캐릭터가 있는 사용자입니다");

    private final HttpStatus httpStatus;

    private final String message;
}
