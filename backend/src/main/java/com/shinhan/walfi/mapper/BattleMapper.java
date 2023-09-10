package com.shinhan.walfi.mapper;

import com.shinhan.walfi.dao.BattleDao;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BattleMapper {

    void write(BattleDao dao);
}
