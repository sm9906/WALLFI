package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.dto.banking.ExchangeResDto;
import org.json.simple.parser.ParseException;

public interface ExchangeService {

    ExchangeResDto getTodayExchange() throws ParseException;

}
