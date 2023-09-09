package com.shinhan.walfi.dto.game;

import com.shinhan.walfi.domain.game.GameCharacter;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@Builder
public class CharacterResDto {

    String userId;
    List<CharacterDto> characterDtoList;

}
