package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
public class Account {

    @Id
    private String 계좌번호;

    private String 구분;

    private String 상품명;

    @Column(name = "잔액(통화별)")
    private Long 잔액통화별;

    @Column(name = "평가금액(통화별)")
    private Long 평가금액통화별;

    private Date 신규일;

    private Date 만기일;

    private String 관리점명;

    @Column(name = "금리(수익률)")
    private BigDecimal 금리수익률;

    private String 통화;

    private String 과세;

    @Column(name = "잔액(원화)")
    private Long 잔액원화;

    @Column(name = "평가금액(원화)")
    private Long 평가금액원화;

    private Byte 자동해지여부;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "account", fetch = LAZY)
    private List<KrwTransaction> krwTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "account", fetch = LAZY)
    private List<GlobalTransaction> globalTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "account", fetch = LAZY)
    private List<KrwAccountTransaction> krwAccountTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "account", fetch = LAZY)
    private List<GlobalAccountTransaction> globalAccountTransactions = new ArrayList<>();
}
