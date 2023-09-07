package com.shinhan.walfi.domain.game;

import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
public class GameCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long characterIdx;

    private String characterType;

    private String color;

    private int level;

    private int exp;

    private int hp;

    private int atk;

    private int def;

    private boolean isMain;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserGameInfo userGameInfo;

}
