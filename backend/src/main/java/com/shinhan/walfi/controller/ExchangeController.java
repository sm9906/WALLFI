package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.dto.banking.ExchangeResDto;
import com.shinhan.walfi.dto.banking.UserExchangeReqDto;
import com.shinhan.walfi.service.banking.ExchangeService;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exchange")
@RequiredArgsConstructor
public class ExchangeController {

    private final ExchangeService exchangeService;

    @GetMapping("/info")
    public ResponseEntity<HttpResult> todayExchange() {
        //신한 api 환율 조회하기
        HttpResult res;

        try {
            res = HttpResult.getSuccess();
            ExchangeResDto dto = exchangeService.getTodayExchange();
            res.setData(dto);
        } catch (ParseException e) {
            res = new HttpResult(HttpStatus.FORBIDDEN, HttpResult.Result.ERROR, "환율 조회 실패");
        }

        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/do")
    public ResponseEntity<HttpResult> userExchange(@RequestBody UserExchangeReqDto userExchangeReqDto) {

        exchangeService.userExchange(userExchangeReqDto.getUserId(),
                userExchangeReqDto.get사용자대표계좌(),
                userExchangeReqDto.get통화코드(),
                userExchangeReqDto.get금액(),
                userExchangeReqDto.get전신환매도환율());

        HttpResult res = HttpResult.getSuccess();

        return ResponseEntity.status(res.getStatus()).body(res);
    }
}