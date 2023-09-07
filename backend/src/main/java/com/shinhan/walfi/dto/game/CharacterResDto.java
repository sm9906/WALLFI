package com.shinhan.walfi.dto.game;

import com.shinhan.walfi.domain.game.GameCharacter;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CharacterResDto {

    List<CharacterDto> characterDtoList;

}
