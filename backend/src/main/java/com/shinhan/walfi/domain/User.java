package com.shinhan.walfi.domain;

import com.shinhan.walfi.domain.banking.Account;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
public class User implements Serializable {

    @Id
    private String userId;

    private String email;

    private String password;

    private String name;

    private LocalDateTime birthDate;

    private String phoneNumber;

    @Column(name = "대표계좌")
    private String 대표계좌;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Account> accounts = new ArrayList<>();
}
