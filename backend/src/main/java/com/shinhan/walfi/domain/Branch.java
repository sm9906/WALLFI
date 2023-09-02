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

    private String branch_type;

    private int manager_level;

    private int manager_hp;

    private int manager_atk;

    private int manager_def;

    private int exp;

    private float latitude;

    private float longitude;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;
}
