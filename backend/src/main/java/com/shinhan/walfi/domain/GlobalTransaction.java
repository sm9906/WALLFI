package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Time;
import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
public class GlobalTransaction {

    @Id
    private Long 글로벌거래번호;

    private Date 거래일자;

    private Time 거래시각;

    private String 거래종류;

    private String 적요;

    private Float 지급금액;

    private Float 입금금액;

    private Float 계좌잔액;

    private String 정정취소구분;

    private Long 거래원화금액;

    private Float 거래환율;

    private String 입금의뢰인명;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "계좌번호")
    private Account account;
}
