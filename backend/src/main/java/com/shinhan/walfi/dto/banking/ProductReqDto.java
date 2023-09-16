package com.shinhan.walfi.dto.banking;

import lombok.Getter;

@Getter
public class ProductReqDto {

    private String userId;

    private String 통화코드;

    private String 상품명;

    private String 만기일;

    private String 금리;

}
