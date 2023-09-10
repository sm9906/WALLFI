package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.game.CharacterListResDto;
import com.shinhan.walfi.dto.game.CharacterWithUserIdResDto;

public interface CharacterService {

    Long create(String userId);

    Long shop(String userId);

    CharacterListResDto searchCharacters(String userId);

    CharacterWithUserIdResDto searchMainCharacter(String userId);

    CharacterWithUserIdResDto changeCharacterColor(String userId, Long mainCharacterIdx);
}
