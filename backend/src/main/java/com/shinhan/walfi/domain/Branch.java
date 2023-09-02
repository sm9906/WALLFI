package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
public class Branch {
    @Id
    private String branch_code;

    private String branch_name;

    private String address;

    private String type;

    private int level;

    private int exp;

    private int hp;

    private int atk;

    private int def;

    private float latitude;

    private float longitude;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;
}
