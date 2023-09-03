package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "battle_history")
public class BattleHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "battle_idx")
    private String battleIdx;

    private String manager;

    private String challenger;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "occupy_time")
    private LocalDateTime occupyTime;

    @ManyToOne
    @JoinColumn(name = "branch_code")
    private Branch branch;
}
