package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.dto.banking.ExchangeResDto;
import org.json.simple.parser.ParseException;

import java.util.List;

public interface CharacterService {

    Long create(String userId);

    Long shop(String userId);

    List<GameCharacter> searchCharacters(String userId);

}
