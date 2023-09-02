package com.shinhan.walfi.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Account {
    @Id
    private String account_number;

    private int balance;

    private LocalDateTime created_time;

    private int account_password;

    private String currency;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
