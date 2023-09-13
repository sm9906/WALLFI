package com.shinhan.walfi.service.game;

import com.shinhan.walfi.dto.game.CharacterListResDto;
import com.shinhan.walfi.dto.game.CharacterWithUserIdResDto;

public interface CharacterService {

    CharacterWithUserIdResDto create(String userId);

    CharacterWithUserIdResDto shop(String userId);

    CharacterListResDto searchCharacters(String userId);

    CharacterWithUserIdResDto searchMainCharacter(String userId);

    CharacterWithUserIdResDto changeCharacterColor(String userId, Long mainCharacterIdx);

    CharacterWithUserIdResDto changeCharacterStatus(String userId, Long characterIdx, String statusType, int statusValue);
}
