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
    private Integer managerLevel;

    @Column(name = "manager_hp")
    private Integer managerHp;

    @Column(name = "manager_atk")
    private Integer managerAtk;

    @Column(name = "manager_def")
    private Integer managerDef;

    private Integer exp;

    private Float latitude;

    private Float longitude;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;
}
