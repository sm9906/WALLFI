package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class GameCharacter {
    @Id
    @Column(name = "character_idx")
    private String characterIdx;

    @Column(name = "character_type")
    private String characterType;

    private int level;

    private int exp;

    private int hp;

    private int atk;

    private int def;

    private String istypical;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;
}
