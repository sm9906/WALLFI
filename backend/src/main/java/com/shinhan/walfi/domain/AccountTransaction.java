package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
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
    @Column(name = "tx_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long txIdx;

    @Column(name = "issued_time")
    @NotNull
    private LocalDateTime issuedTime;

    @Column(name = "from_name")
    @NotNull
    private String fromName;

    @Column(name = "to_name")
    @NotNull
    private String toName;

    @NotNull
    private int money;

    @Column(name = "from_number")
    @NotNull
    private String fromNumber;

    @Column(name = "to_number")
    @NotNull
    private String toNumber;

    @Column(name = "from_bank")
    @NotNull
    private String fromBank;

    @Column(name = "to_bank")
    @NotNull
    private String toBank;

    @ManyToOne
    @JoinColumn(name = "account_number")
    private Account account;
}
