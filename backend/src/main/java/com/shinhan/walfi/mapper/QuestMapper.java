package com.shinhan.walfi.mapper;

import com.shinhan.walfi.dao.DailyQuestDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface QuestMapper {

    List<DailyQuestDao> readRandomDailyQuestByLimit(int limit);

    void increaseSpecificPerformedQuest(@Param("user_id") String user_id,
                                        @Param("quest_id") long quest_id);

    boolean checkIFQuestIsComplete(@Param("user_id") String user_id,
                                   @Param("quest_id") long quest_id);

    String findUserIdByMainAccount(String MainAccountNumber);

    void updateQuestStatusTrue(@Param("user_id") String user_id,
                               @Param("quest_id") long quest_id);
}
