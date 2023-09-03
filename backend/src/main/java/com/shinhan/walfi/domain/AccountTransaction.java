package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.SpringApplication;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Table(name = "transaction_history")
public class AccountTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long txIdx;

    @NotNull
    private LocalDateTime issuedTime;

    @NotNull
    private String fromName;

    @NotNull
    private String toName;

    @NotNull
    private int money;

    @NotNull
    private String fromNumber;

    @NotNull
    private String toNumber;

    @NotNull
    private String fromBank;

    @NotNull
    private String toBank;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "account_number")
    private Account account;
}
