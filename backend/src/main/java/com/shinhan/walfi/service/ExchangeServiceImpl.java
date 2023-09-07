package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.banking.ExchangeDto;
import com.shinhan.walfi.dto.banking.ExchangeResDto;
import com.shinhan.walfi.util.ExchangeUtil;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExchangeServiceImpl implements ExchangeService {

    private final ExchangeUtil util;

    @Override
    public ExchangeResDto getTodayExchange() throws ParseException {
        List<ExchangeDto> exchangeDtoList = util.getTodayExchange();

        // 전일대비 증감 계산
        List<ExchangeDto> yesterDayList = util.getYesterdayExchange();
        // Todo : 추후 환율 정보를 DB에 저장하고 불러오도록 구현
        
        for (int i = 0; i < exchangeDtoList.size(); i++) {
            exchangeDtoList.get(i).set전일대비(
                    Math.round((yesterDayList.get(i).get매매기준환율() - exchangeDtoList.get(i).get매매기준환율()) * 100) / 100F
            );
        }

        ExchangeResDto dto = new ExchangeResDto();
        dto.setExchangeDtoList(exchangeDtoList);
        return dto;
    }

}
