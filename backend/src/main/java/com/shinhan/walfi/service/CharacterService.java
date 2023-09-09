package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.game.CharacterResDto;
import com.shinhan.walfi.dto.game.MainCharacterResDto;

public interface CharacterService {

    Long create(String userId);

    Long shop(String userId);

    CharacterResDto searchCharacters(String userId);

    MainCharacterResDto searchMainCharacter(String userId);

}
