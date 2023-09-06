package com.shinhan.walfi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;

@Getter
@Setter
public class ExchangeReqDto {

    private HashMap<String,String> dataHeader;

    private HashMap<String,String> dataBody;

}
