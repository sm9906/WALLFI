package com.shinhan.walfi.domain.game;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
public class Game_Item {

    @Id
    private Long itemIdx;

    private String itemName;

    private int y;

    private int x;

    private double rotation;

    private double size;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserGameInfo userGameInfo;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "characterIdx")
    private GameCharacter gameCharacter;
}
