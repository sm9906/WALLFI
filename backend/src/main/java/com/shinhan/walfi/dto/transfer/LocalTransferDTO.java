package com.shinhan.walfi.dto.transfer;

import lombok.Getter;
import lombok.ToString;


@Getter
@ToString
public class LocalTransferDTO {

    private String 출금계좌번호;

    private String 입금은행코드;

    private long 이체금액;

    private String 입금계좌번호;

    private String 입금계좌통장메모;

    private String 출금계좌통장메모;
}
