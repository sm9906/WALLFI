package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "battle_history")
public class BattleHistory {
    @Id
    private String battle_idx;

    private String manager;

    private String challenger;

    private LocalDateTime start_time;

    private LocalDateTime occupy_time;

    @ManyToOne
    @JoinColumn(name = "branch_code")
    private Branch branch;


}
