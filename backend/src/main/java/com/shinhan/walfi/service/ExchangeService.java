package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.ExchangeResDto;
import org.json.simple.parser.ParseException;

public interface ExchangeService {

    ExchangeResDto getTodayExchange() throws ParseException;

}
