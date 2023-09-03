package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
public class GameCharacter {
    @Id
    private String character_idx;

    private String character_type;

    private int level;

    private int exp;

    private int hp;

    private int atk;

    private int def;

    private String istypical;

    private LocalDateTime created_time;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;
}
