package com.shinhan.walfi.service.game;

import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.UserGameInfoDto;
import com.shinhan.walfi.exception.UserException;
import com.shinhan.walfi.repository.game.UserGameInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.shinhan.walfi.exception.UserErrorCode.NO_MATCHING_USER;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserGameInfoServiceImpl implements UserGameInfoService{

    private final UserGameInfoRepository userGameInfoRepository;

    /**
     * 유저의 게임 포인트, 게임 내 타이틀을 반환하는 기능
     *
     * @exception 'NO_MATCHING_USER' - 존재하지 않는 사용자의 경우 예외 발생
     * @param userId
     * @return UserGameInfoDto
     */
    @Override
    public UserGameInfoDto getUserGameInfo(String userId) {

        UserGameInfo findUserGameInfo = userGameInfoRepository.findById(userId);

        if (findUserGameInfo == null) {
            log.error("틀린 비밀번호이거나 존재하지 않는 회원");
            throw new UserException(NO_MATCHING_USER);
        }

        return getUserGameInfoDto(findUserGameInfo);

    }

    /**
     * 유저의 게임 포인트를 상승 시키는 기능
     *
     * @exception 'NO_MATCHING_USER' - 존재하지 않는 사용자의 경우 예외 발생
     * @param userId
     * @param updatePoint
     * @return UserGameInfoDto
     */
    @Override
    @Transactional
    public UserGameInfoDto updatePoint(String userId, int updatePoint) {

        UserGameInfo findUserGameInfo = userGameInfoRepository.findById(userId);

        if (findUserGameInfo == null) {
            log.error("틀린 비밀번호이거나 존재하지 않는 회원");
            throw new UserException(NO_MATCHING_USER);
        }
        int defaultPoint = findUserGameInfo.getPoint();
        int newPoint = defaultPoint + updatePoint;

        findUserGameInfo.setPoint(newPoint);
        UserGameInfo updateUserGameInfo = userGameInfoRepository.save(findUserGameInfo);

        log.info("=== " + userId + "사용자: 포인트 " + defaultPoint + " -> " + newPoint + "===");
        return getUserGameInfoDto(updateUserGameInfo);
    }

    /**
     * userGameInfo 정보를 UserGameInfoDto로 변환하는 기능
     *
     * @param userGameInfo
     * @return UserDto
     */
    private UserGameInfoDto getUserGameInfoDto(UserGameInfo userGameInfo) {
        return UserGameInfoDto.builder()
                .userId(userGameInfo.getUserId())
                .point(userGameInfo.getPoint())
                .status(userGameInfo.getStatus())
                .build();
    }

}
