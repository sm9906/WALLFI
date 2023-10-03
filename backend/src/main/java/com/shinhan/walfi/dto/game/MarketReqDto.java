package com.shinhan.walfi.dto.game;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MarketReqDto {

    private Long goodsIdx;

    private String goodsType;

    private int price;

    private LocalDateTime createTime;

    private Long itemIdx;

    private Long characterIdx;
}
