package com.shinhan.walfi.dto.game;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CharacterStatusReqDto {

    private String userId;

    private Long characterIdx;

    private String statusType;

    private int value;

}
