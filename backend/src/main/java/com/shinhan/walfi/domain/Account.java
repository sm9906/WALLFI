package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Account {
    @Id
    @Column(name = "account_number")
    private String accountNumber;

    @NotNull
    private Long balance;

    @Column(name = "created_time")
    @NotNull
//    @ColumnDefault("CURRENT_TIMESTAMP")
    private LocalDateTime createdTime;

    @Column(name = "account_password")
    @NotNull
    private Integer accountPassword;

    @NotNull
    private String currency;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
