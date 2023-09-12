package com.shinhan.walfi.dto.banking;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class AccountResDto {

    private String userId;

    private int accountsLength;

    private List<AccountDto> AccountDtoList;

}
