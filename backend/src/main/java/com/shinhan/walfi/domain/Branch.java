package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;

@Entity
@Getter
public class Branch {
    @Id
    @Column(name = "branch_code")
    private String branchCode;

    @Column(name = "branch_name")
    @NotNull
    private String branchName;

    @NotNull
    private String address;

    @Column(name = "branch_type")
    @NotNull
    private String branchType;

    @Column(name = "manager_level")
    @NotNull
    private Integer managerLevel;

    @Column(name = "manager_hp")
    @NotNull
    private Integer managerHp;

    @Column(name = "manager_atk")
    @NotNull
    private Integer managerAtk;

    @Column(name = "manager_def")
    @NotNull
    private Integer managerDef;

    @NotNull
    private Integer exp;

    @NotNull
    private Float latitude;

    @NotNull
    private Float longitude;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;

    @OneToMany(mappedBy = "branch")
    private List<BattleHistory> battleHistories = new ArrayList<>();
}
