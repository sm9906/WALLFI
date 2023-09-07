package com.shinhan.walfi.dto.game;

import com.shinhan.walfi.domain.CharacterType;
import com.shinhan.walfi.domain.TierPerColor;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
public class CharacterDto {

    private Long characterIdx;

    private CharacterType characterType;

    private TierPerColor color;

    private int level;

    private int exp;

    private int hp;

    private int atk;

    private int def;

    private boolean isMain;

    private LocalDateTime createdTime;

}
