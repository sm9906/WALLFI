package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class User {
    @Id
    @Column(name = "user_id")
    private String id;

    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String name;

    @Column(name = "birth_date")
    private LocalDateTime birthDate;

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToMany(mappedBy = "user")
    private List<Account> accounts = new ArrayList<>();
}
