package com.shinhan.walfi.domain.game;

import com.shinhan.walfi.domain.CharacterType;
import com.shinhan.walfi.domain.TierPerColor;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.awt.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

import java.util.Random;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long characterIdx;

    @Enumerated(EnumType.STRING)
    private CharacterType characterType;

    @Enumerated(EnumType.STRING)
    private TierPerColor color;

    private int level;

    private int exp;

    private int hp;

    private int atk;

    private int def;

    private boolean isMain;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_game_id")
    private UserGameInfo userGameInfo;

    /**
     * 게임 캐릭터 생성, enum은 service에서 설정
     * @param userGameInfo
     */
    public static GameCharacter createCharacter(UserGameInfo userGameInfo, CharacterType characterType, Boolean isMain) {
        GameCharacter gameCharacter = new GameCharacter();

        gameCharacter.characterType = characterType;
        gameCharacter.color = TierPerColor.BASIC;
        gameCharacter.level = 1;
        gameCharacter.exp = 0;
        gameCharacter.hp = 50;
        gameCharacter.atk = 0;
        gameCharacter.def = 0;
        gameCharacter.isMain = isMain;
        gameCharacter.userGameInfo = userGameInfo;

        gameCharacter.addCharacterToUserGameInfo(userGameInfo);

        return gameCharacter;
    }

    private void addCharacterToUserGameInfo(UserGameInfo userGameInfo) {
        userGameInfo.getGameCharacters().add(this);
    }
}
