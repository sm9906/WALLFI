package com.shinhan.walfi.domain.quest;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.mapper.QuestMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;


@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class QuestAspect {

    private final QuestMapper questMapper;

    @Before("execution(* com.shinhan.walfi.controller.BankController.*(..))")
    public void before(JoinPoint join) {
        System.out.println("before");
    }

    @AfterReturning(
            pointcut = "execution(* com.shinhan.walfi.controller.BankController.*(..))",
            returning = "result"
    )
    public void conductTransferQuest(JoinPoint joinPoint, ResponseEntity<HttpResult> result) {
        String methodName = joinPoint.getSignature().getName();
        log.info("Bank Service : {}", methodName);

        String message = result.getBody().getMessage();
        log.info("{}, {}", message, result.getBody().getData());

        String mainAccountNumber = (String) result.getBody().getData();
        String userId = questMapper.findUserIdByMainAccount(mainAccountNumber);

        questMapper.increaseSpecificPerformedQuest(userId, 1L);
        boolean isCompleted = questMapper.checkIFQuestIsComplete(userId, 1L);

        if (isCompleted) {
            log.info("{} completed {} quest", userId, 1L);
            questMapper.updateQuestStatus(userId, 1L, 1);
        }
    }
}
