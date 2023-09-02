package com.shinhan.walfi.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;

@Entity
@Getter
public class User {
    @Id
    @Column(name = "user_id")
    private String id;

    private String email;

    private String password;

    private String name;

    private LocalDateTime birth_date;

    private String phone_number;
}
