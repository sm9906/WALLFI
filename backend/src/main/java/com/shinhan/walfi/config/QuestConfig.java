package com.shinhan.walfi.config;

import com.shinhan.walfi.dao.DailyQuestDao;
import com.shinhan.walfi.mapper.QuestMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;

import java.sql.Timestamp;
import java.util.List;


@Slf4j
@Configuration
@RequiredArgsConstructor
public class QuestConfig {

    private final QuestMapper questMapper;

//    @EventListener(ApplicationReadyEvent.class)
//    @Scheduled(cron = "10 * * * * *", zone = "Asia/Seoul")
//    public void test() {
//        log.info("Current Time: {}", new Timestamp(System.currentTimeMillis()));
//        List<DailyQuestDao> dailyQuests = questMapper.readRandomDailyQuestByLimit(3);
//        for (DailyQuestDao dailyQuest : dailyQuests) {
//            System.out.println("dailyQuestDao = " + dailyQuest);
//        }
//    }

    @EventListener(ApplicationReadyEvent.class)
    @Scheduled(cron = "0 0 9 * * *", zone = "Asia/Seoul")
    public void updateDailyQuest() {
        log.info("Current Time: {}", new Timestamp(System.currentTimeMillis()));
        List<DailyQuestDao> dailyQuests = questMapper.readRandomDailyQuestByLimit(3);
        for (DailyQuestDao dailyQuest : dailyQuests) {
            System.out.println("dailyQuestDao = " + dailyQuest);
        }
    }
}
