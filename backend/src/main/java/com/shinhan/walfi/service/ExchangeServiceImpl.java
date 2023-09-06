package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.ExchangeDto;
import com.shinhan.walfi.dto.ExchangeResDto;
import com.shinhan.walfi.util.ExchangeUtil;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExchangeServiceImpl implements ExchangeService{

    private final ExchangeUtil util;

    @Override
    public ExchangeResDto getTodayExchange() throws ParseException {
        List<ExchangeDto> exchangeDtoList = util.getTodayExchange();

        // 전일대비 증감 계산

        ExchangeResDto dto = new ExchangeResDto();
        dto.setExchangeDtoList(exchangeDtoList);
        return dto;
    }

}
