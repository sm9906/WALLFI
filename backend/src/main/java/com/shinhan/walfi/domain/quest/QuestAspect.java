package com.shinhan.walfi.domain.quest;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.mapper.QuestMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import static java.util.Objects.isNull;


@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class QuestAspect {

    private final QuestMapper questMapper;

    /**
     * 유저 퀘스트 수행 횟수를 증가한 뒤,
     * 퀘스트를 완료했는지 판단
     *
     * @param userId
     * @param questId
     */
    private void increaseUserPerformedQuest(String userId, long questId) {

        questMapper.increaseSpecificPerformedQuest(userId, questId);
        boolean isCompleted = questMapper.checkIFQuestIsComplete(userId, questId);

        if (isCompleted) {
            log.info("{} completed {} quest", userId, questId);
            questMapper.updateQuestStatus(userId, questId, 1);
        }
    }

    /**
     * 게임 서비스 혹은, 금융 서비스가 정상적으로 완료됐으면,
     * 그 Service Method 끝난 뒤에, 이 Method가 작동
     * 각 서비스마다 연관된 퀘스트 Idx를 찾음
     * 
     * @param joinPoint
     * @param result
     */
    @AfterReturning(
            pointcut = "execution(* com.shinhan.walfi.controller.BankController.*(..)) || " +
                    "execution(* com.shinhan.walfi.controller.CharacterController.*(..)) || " +
                    "execution(* com.shinhan.walfi.controller.BattleController.record(*))",
            returning = "result"
    )
    public void conductTransferQuest(JoinPoint joinPoint, ResponseEntity<HttpResult> result) {

        final String methodName = joinPoint.getSignature().getName();
        final String action = result.getBody().getAction();
        final String userId = result.getBody().getUserId();

        log.info("Method Name : {}", methodName);
        log.info("Action : {}", action);

        if (isNull(action)) {
            log.info("Action Is Null!");
        }

        switch (action) {
            case "밥먹기":
                increaseUserPerformedQuest(userId, 3);
                break;
            case "훈련하기":
                increaseUserPerformedQuest(userId, 4);
                break;
            case "이체하기":
                increaseUserPerformedQuest(userId, 1);
                break;
            case "배틀하기":
                increaseUserPerformedQuest(userId, 7);
                break;
        }
    }
}
