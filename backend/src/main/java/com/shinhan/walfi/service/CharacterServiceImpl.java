package com.shinhan.walfi.service;

import com.shinhan.walfi.domain.CharacterType;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.CharacterDto;
import com.shinhan.walfi.dto.game.CharacterResDto;
import com.shinhan.walfi.dto.game.MainCharacterResDto;
import com.shinhan.walfi.repository.CharacterRepository;
import com.shinhan.walfi.repository.UserGameInfoRepository;
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


        // TODO: 만약 메인 캐릭터가 존재하면 create가 아닌 shop으로 캐릭터를 뽑아야 함으로 예외처리

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
                .map(character -> getCharacterDto(character))
                .collect(Collectors.toList());

        CharacterResDto characterResDto = CharacterResDto.builder()
                .characterDtoList(dtoList)
                .userId(userId)
                .build();

        return characterResDto;
    }

    /**
     * 사용자의 홈 캐릭터 조회
     *
     * @param userId
     * @return 홈 캐릭터 DTO
     */
    @Override
    public MainCharacterResDto searchMainCharacter(String userId) {
        UserGameInfo userGameInfo = userGameInfoRepository.findById(userId);
        GameCharacter mainCharacter = characterRepository.findHomeCharacter(userGameInfo);

        CharacterDto characterDto = getCharacterDto(mainCharacter);

        MainCharacterResDto mainCharacterResDto = MainCharacterResDto.builder()
                .userId(userId)
                .characterDto(characterDto)
                .build();

        return mainCharacterResDto;
    }

    private CharacterDto getCharacterDto(GameCharacter gameCharacter) {
        return CharacterDto.builder()
                .characterIdx(gameCharacter.getCharacterIdx())
                .characterType(gameCharacter.getCharacterType())
                .color(gameCharacter.getColor())
                .level(gameCharacter.getLevel())
                .exp(gameCharacter.getExp())
                .hp(gameCharacter.getHp())
                .atk(gameCharacter.getAtk())
                .def(gameCharacter.getDef())
                .isMain(gameCharacter.isMain())
                .createdTime(gameCharacter.getCreatedTime())
                .build();
    }


}
