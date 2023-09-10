package com.shinhan.walfi.domain.game;

import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
public class Branch {

    @Id
    private Long branchIdx;

    private String address;

    private String branchName;

    private String branchType;

    private String branchPhoneNumber;

    private double latitude;

    private double longitude;

    private int managerLevel;

    private int managerExp;

    private int managerHp;

    private int managerAtk;

    private int managerDef;

    @CreationTimestamp
    private LocalDateTime startTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserGameInfo userGameInfo;

    @OneToMany(mappedBy = "branch")
    private List<BattleHistory> battleHistories = new ArrayList<>();

    public void setManagerLevel(int managerLevel) {
        this.managerLevel = managerLevel;
    }

    public void setManagerExp(int managerExp) {
        this.managerExp = managerExp;
    }

    public void setManagerHp(int managerHp) {
        this.managerHp = managerHp;
    }

    public void setManagerAtk(int managerAtk) {
        this.managerAtk = managerAtk;
    }

    public void setManagerDef(int managerDef) {
        this.managerDef = managerDef;
    }
}
