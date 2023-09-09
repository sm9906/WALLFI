package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.CharacterType;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.CharacterDto;
import com.shinhan.walfi.dto.game.CharacterResDto;
import com.shinhan.walfi.repository.CharacterRepository;
import com.shinhan.walfi.repository.UserGameInfoRepository;
import com.shinhan.walfi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CharacterServiceImpl implements CharacterService {

    private final CharacterRepository characterRepository;
    private final UserGameInfoRepository userGameInfoRepository;

    /**
     * 캐릭터 타입 랜덤 설정 후 캐릭터 생성
     *
     * @param userId
     * @return 생성한 캐릭터 idx 반환
     */
    @Override
    @Transactional
    public Long create(String userId) {
        UserGameInfo userGameInfo = userGameInfoRepository.findById(userId);

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
    @Override
    @Transactional
    public Long shop(String userId) {
        UserGameInfo userGameInfo = userGameInfoRepository.findById(userId);

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

    /**
     * 사용자가 가진 전체 캐릭터 조회
     *
     * @param userId
     * @return 캐릭터 DTO
     */
    @Override
    public CharacterResDto searchCharacters(String userId) {
        UserGameInfo userGameInfo = userGameInfoRepository.findById(userId);

        List<GameCharacter> characters = characterRepository.findCharactersByUserGameInfo(userGameInfo);

        List<CharacterDto> dtoList = characters.stream()
                .map(character -> CharacterDto.builder()
                            .characterIdx(character.getCharacterIdx())
                            .characterType(character.getCharacterType())
                            .color(character.getColor())
                            .level(character.getLevel())
                            .exp(character.getExp())
                            .hp(character.getHp())
                            .atk(character.getAtk())
                            .def(character.getDef())
                            .isMain(character.isMain())
                            .createdTime(character.getCreatedTime())
                            .build())
                .collect(Collectors.toList());

        CharacterResDto characterResDto = CharacterResDto.builder()
                .characterDtoList(dtoList)
                .userId(userId)
                .build();

        return characterResDto;
    }

}
