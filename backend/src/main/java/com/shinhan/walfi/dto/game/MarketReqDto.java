package com.shinhan.walfi.dto.game;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MarketReqDto {

    private String goodsType;

    private int price;

    private Long itemIdx;

    private Long characterIdx;
}
