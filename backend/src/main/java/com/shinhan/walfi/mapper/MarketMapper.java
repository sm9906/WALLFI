package com.shinhan.walfi.mapper;

import com.shinhan.walfi.dao.GoodsDao;
import com.shinhan.walfi.dto.game.MarketReqDto;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MarketMapper {

    void sell(MarketReqDto marketReqDto);

    GoodsDao findById(Long goodsIdx);
}
