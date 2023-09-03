package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "account")
    private List<AccountTransaction> accountTransactions = new ArrayList<>();
}
