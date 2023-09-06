package com.shinhan.walfi.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class ExchangeDto {

    private String 통화코드; //"USD"

    private String 통화명; //"미국 달러"

//    String 전신환매입환율 = "1275.20";
//    String 전신환매도환율 = "1299.80";
//    String 지폐매입환율 = "1264.97";
//    String 지폐매도환율 = "1310.03";
//    String TC매입환율 = "1272.05";
//    String TC매도환율 = "1302.95";

    private double 매매기준환율; //"1287.50"

    private double 전일대비 = 0;

//    String 대미환산환율 = "1.0000";
}
