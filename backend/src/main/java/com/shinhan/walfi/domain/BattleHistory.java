package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "battle_history")
public class BattleHistory {
    @Id
    @Column(name = "battle_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long battleIdx;

    @NotNull
    private String manager;

    @NotNull
    private String challenger;

    @Column(name = "start_time")
    @NotNull
    private LocalDateTime startTime;

    @Column(name = "occupy_time")
    private LocalDateTime occupyTime;

    @ManyToOne
    @JoinColumn(name = "branch_code")
    private Branch branch;
}
