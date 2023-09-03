package com.shinhan.walfi.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Account {
    @Id
    @Column(name = "account_number")
    private String accountNumber;

    private Long balance;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "account_password")
    private Integer accountPassword;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
