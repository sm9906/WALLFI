package com.shinhan.walfi.dto.game;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MainCharacterResDto {

    String userId;

    CharacterDto characterDto;

}
