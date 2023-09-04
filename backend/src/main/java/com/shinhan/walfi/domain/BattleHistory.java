package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;

@Entity
@Getter
public class BattleHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long battleIdx;

    @NotNull
    private String manager;

    @NotNull
    private String challenger;

    @NotNull
    @CreationTimestamp
    private LocalDateTime startTime;

    private LocalDateTime occupyTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "branch_code")
    private Branch branch;

}
