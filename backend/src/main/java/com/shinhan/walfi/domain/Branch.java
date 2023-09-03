package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Branch {
    @Id
    @Column(name = "branch_code")
    private String branchCode;

    @Column(name = "branch_name")
    private String branchName;

    private String address;

    @Column(name = "branch_type")
    private String branchType;

    @Column(name = "manager_level")
    private int managerLevel;

    @Column(name = "manager_hp")
    private int managerHp;

    @Column(name = "manager_atk")
    private int managerAtk;

    @Column(name = "manager_def")
    private int managerDef;

    private int exp;

    private float latitude;

    private float longitude;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;
}
