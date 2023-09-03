package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class GameCharacter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_idx")
    private Long characterIdx;

    @Column(name = "character_type")
    private String characterType;

    private Integer level;

    private Integer exp;

    private Integer hp;

    private Integer atk;

    private Integer def;

    private String istypical;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;
}
