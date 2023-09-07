package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.game.CharacterResDto;

public interface CharacterService {

    Long create(String userGameId);

    Long shop(String userGameId);

    CharacterResDto searchCharacters(String userGameId);

}
