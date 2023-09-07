package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.CharacterType;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.repository.CharacterRepository;
import com.shinhan.walfi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final UserRepository userRepository;

    /**
     * 캐릭터 타입 랜덤 설정 후 캐릭터 생성
     *
     * @param userId
     * @return 생성한 캐릭터 idx 반환
     */
    @Transactional
    public Long create(String userId) {
        UserGameInfo userGameInfo = userRepository.findUserGameInfo(userId);

        Random random = new Random();

        // 캐릭터 타입 랜덤 생성
        CharacterType[] characterTypes = CharacterType.values();
        int typesRandomNum = random.nextInt(characterTypes.length);
        CharacterType randomCharacterType = characterTypes[typesRandomNum];

        // 캐릭터 생성
        Boolean isMain = true;
        GameCharacter gameCharacter = GameCharacter.createCharacter(userGameInfo, randomCharacterType, isMain);

        // db에 저장
        characterRepository.save(gameCharacter);

        return gameCharacter.getCharacterIdx();
    }

    /**
     * 캐릭터 뽑기
     *
     * @param userId
     * @return 뽑은 캐릭터 idx 반환
     */
    @Transactional
    public Long shop(String userId) {
        UserGameInfo userGameInfo = userRepository.findUserGameInfo(userId);

        Random random = new Random();

        // 캐릭터 타입 랜덤 생성
        CharacterType[] characterTypes = CharacterType.values();
        int typesRandomNum = random.nextInt(characterTypes.length);
        CharacterType randomCharacterType = characterTypes[typesRandomNum];

        // 캐릭터 생성
        Boolean isMain = false;
        GameCharacter gameCharacter = GameCharacter.createCharacter(userGameInfo, randomCharacterType, isMain);

        // db에 저장
        characterRepository.save(gameCharacter);

        return gameCharacter.getCharacterIdx();
    }
}
