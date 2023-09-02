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
    private String tx_idx;

    private LocalDateTime issued_time;

    private String from_name;

    private String to_name;

    private int money;

    private String from_number;

    private String to_number;

    private String from_bank;

    private String to_bank;

    @ManyToOne
    @JoinColumn(name = "account_number")
    private Account account;
}
