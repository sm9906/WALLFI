package com.shinhan.walfi.dto.banking;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class ExchangeDto {

    public ExchangeDto(float 매매기준환율) {
        this.매매기준환율 = 매매기준환율;
    }

    private String 통화코드; // "USD"

    private String 통화명; // "미국 달러"

    private float 전신환매입환율; // 송금

    private float 전신환매도환율;

    private float 지폐매입환율; // 현찰

    private float 지폐매도환율;

//    String TC매입환율 = "1272.05";
//    String TC매도환율 = "1302.95";

    private float 매매기준환율; //"1287.50"

    private float 전일대비 = 0;

//    String 대미환산환율 = "1.0000";
}
