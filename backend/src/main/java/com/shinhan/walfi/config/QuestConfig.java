package com.shinhan.walfi.config;

import com.shinhan.walfi.mapper.QuestMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;

import java.sql.Timestamp;


@Slf4j
@Configuration
@RequiredArgsConstructor
public class QuestConfig {

    private final QuestMapper questMapper;

    @EventListener(ApplicationReadyEvent.class)
    @Scheduled(cron = "0 0 9 * * *", zone = "Asia/Seoul")
    public void updateDailyQuest() {

        log.info("initialize Daily Quest Time : {}", new Timestamp(System.currentTimeMillis()));
        questMapper.initializeDailyQuest();
    }
}
