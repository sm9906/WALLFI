package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.dto.banking.ExchangeResDto;
import org.json.simple.parser.ParseException;

public interface ExchangeService {

    ExchangeResDto getTodayExchange() throws ParseException;

    void userExchange(String userId, String 사용자대표계좌, String 통화코드, long 금액, float 전신환매도환율);

}
