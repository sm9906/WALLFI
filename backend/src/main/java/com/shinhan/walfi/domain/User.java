package com.shinhan.walfi.domain;

import com.shinhan.walfi.domain.banking.Account;
<<<<<<< HEAD
import com.shinhan.walfi.domain.game.UserGameInfo;
=======
import lombok.AllArgsConstructor;
>>>>>>> Transfer-BE-minsu
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
<<<<<<< HEAD
=======
@NoArgsConstructor
@AllArgsConstructor
>>>>>>> Transfer-BE-minsu
public class User implements Serializable {

    @Id
    private String userId;

    private String email;

    private String password;

    private String name;

    private LocalDateTime birthDate;

    private String phoneNumber;

<<<<<<< HEAD
    @Column(name = "대표계좌")
    private String 대표계좌;

    @OneToMany(mappedBy = "user")
    private List<Account> accounts = new ArrayList<>();
=======
    @Column(name = "대표계좌", unique=true)
    private String mainAccount;
>>>>>>> Transfer-BE-minsu

    @OneToMany(mappedBy = "대표계좌")
    private List<Account> accounts = new ArrayList<>();
}
