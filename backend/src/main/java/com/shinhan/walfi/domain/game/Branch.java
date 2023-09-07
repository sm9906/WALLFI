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
    private String branchCode;

    private String address;

    private String branchName;

    private String branchType;

    private float latitude;

    private float longitude;

    private int managerLevel;

    private int managerExp;

    private int managerHp;

    private int managerAtk;

    private int managerDef;

    @CreationTimestamp
    private LocalDateTime startTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;

    @OneToMany(mappedBy = "branch")
    private List<BattleHistory> battleHistories = new ArrayList<>();

}
