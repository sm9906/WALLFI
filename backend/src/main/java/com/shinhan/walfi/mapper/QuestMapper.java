package com.shinhan.walfi.mapper;

import com.shinhan.walfi.dao.DailyQuestDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface QuestMapper {

    List<DailyQuestDao> readRandomDailyQuestByLimit(int limit);
}
