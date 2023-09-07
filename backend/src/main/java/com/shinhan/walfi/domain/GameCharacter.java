package com.shinhan.walfi.domain;

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

    private Integer level;

    private Integer exp;

    private Integer hp;

    private Integer atk;

    private Integer def;

    private String istypical;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserGameInfo userGameInfo;

}
