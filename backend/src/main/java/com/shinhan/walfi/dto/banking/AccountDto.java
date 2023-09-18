package com.shinhan.walfi.dto.banking;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

@Getter
@Builder
public class AccountDto {


    @Id
    private String 계좌번호;

    private String 구분;

    private String 상품명;

    private long 잔액통화별;

    private long 평가금액통화별;

    private Date 신규일;

    private Date 만기일;

    private String 관리점명;

    private BigDecimal 금리수익률;

    private String 통화;

    private String 과세;

    private long 잔액원화;

    private long 평가금액원화;

    private byte 자동해지여부;


}
