package com.shinhan.walfi.service.game;

import com.shinhan.walfi.domain.game.Goods;
import com.shinhan.walfi.dto.game.BuyReqDto;
import com.shinhan.walfi.dto.game.MarketReqDto;

import java.util.List;

public interface MarketService {

    List<Goods> getGoodsList();

    void sell(MarketReqDto marketReqDto);

    void buy(BuyReqDto buyReqDto);
}
