package com.shinhan.walfi.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.SpringApplication;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "transaction_history")
public class AccountTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tx_idx")
    private Long txIdx;

    @Column(name = "issued_time")
    private LocalDateTime issuedTime;

    @Column(name = "from_name")
    private String fromName;

    @Column(name = "to_name")
    private String toName;

    private int money;

    @Column(name = "from_number")
    private String fromNumber;

    @Column(name = "to_number")
    private String toNumber;

    @Column(name = "from_bank")
    private String fromBank;

    @Column(name = "to_bank")
    private String toBank;

    @ManyToOne
    @JoinColumn(name = "account_number")
    private Account account;
}
