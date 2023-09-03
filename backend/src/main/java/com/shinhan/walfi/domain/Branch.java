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
    private String branchCode;

    @NotNull
    private String branchName;

    @NotNull
    private String address;

    @NotNull
    private String branchType;

    @NotNull
    private Integer managerLevel;

    @NotNull
    private Integer managerHp;

    @NotNull
    private Integer managerAtk;

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
