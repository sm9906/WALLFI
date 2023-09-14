package com.shinhan.walfi.util;

import com.shinhan.walfi.dto.banking.ExchangeDto;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class ExchangeUtil {

    private final String baseUrl = "https://shbhack.shinhan.com";

    private final String apikey = "2023_Shinhan_SSAFY_Hackathon";

    private final RestTemplate restTemplate = new RestTemplate();

    public List<ExchangeDto> getTodayExchange() throws ParseException { //오늘의 환율정보 리스트 반환
        String url = baseUrl + "/v1/search/fxrate/number"; // 요청 url
        Date now = new Date(); // 오늘 날짜 6자리
        SimpleDateFormat format = new SimpleDateFormat("YYMMdd");
        String today = format.format(now);

        HttpHeaders headers = new HttpHeaders(); // 헤더 생성
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Todo : 가능하면 String 대신 Json 객체로 body 구성
        // 바디 생성
        StringBuilder body = new StringBuilder();
        body.append("{\n    \"dataHeader\": {\n     \"apikey\": \"");
        body.append(apikey);
        body.append("\"\n    },\n    \"dataBody\": {\n        \"조회일자\": \"");
        body.append(today);
        body.append("\"\n    }\n}");
        HttpEntity<?> requestMessage = new HttpEntity<>(body.toString(), headers);
        HttpEntity<String> response = restTemplate.postForEntity(url, requestMessage, String.class);

        String responseBody = response.getBody(); // response를 파싱하여 환율 정보만 추출
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(responseBody);
        JSONObject jsonDataBody = (JSONObject) jsonBody.get("dataBody");
        JSONArray jsonExchangeList = (JSONArray) jsonDataBody.get("환율리스트"); // 환율 리스트 json 객체 뽑아냄

        List<ExchangeDto> list = new ArrayList<>(); // json 객체를 Exchange list 객체로 파싱
        int[] countryIdx = {0,1,2,4,10}; // 5개국에 대해서만 (미국 일본 유럽 호주 중국)
        for (int c = 0; c < countryIdx.length; c++) {
            JSONObject item = (JSONObject) jsonExchangeList.get(countryIdx[c]);
            list.add(this.makeExchangeDto(item)); // json 객체를 ExchangeDto로 파싱
        }
        return list;
    }

    private ExchangeDto makeExchangeDto(JSONObject item) { // json 객체를 ExchangeDto로 파싱
        ExchangeDto dto = ExchangeDto.builder().
                통화명((String) item.get("통화CODE_DISPLAY")).
                매매기준환율(Float.parseFloat(((String) item.get("매매기준환율")))).
                통화코드((String) item.get("통화CODE")).
                전신환매도환율(Float.parseFloat(((String) item.get("전신환매도환율")))).
                전신환매입환율(Float.parseFloat(((String) item.get("전신환매입환율")))).
                지폐매도환율(Float.parseFloat(((String) item.get("지폐매도환율")))).
                지폐매입환율(Float.parseFloat(((String) item.get("지폐매입환율")))).
                build();
        return dto;
    }

    public List<ExchangeDto> getYesterdayExchange() {
        List<ExchangeDto> list = new ArrayList<>();
        list.add(new ExchangeDto(1286.5F));
        list.add(new ExchangeDto(902.05F));
        list.add(new ExchangeDto(1411.3F));
        list.add(new ExchangeDto(1647.85F));
        list.add(new ExchangeDto(851.68F));
        return list;
    }
}
