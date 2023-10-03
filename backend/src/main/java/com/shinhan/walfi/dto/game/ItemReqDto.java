package com.shinhan.walfi.dto.game;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemReqDto {

    private Long itemIdx;

    private int y;

    private int x;

    private double rotation;

    private double size;

    private Long characterIdx;
}
