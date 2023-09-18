package com.shinhan.walfi.dto.game;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserGameInfoDto {

    private String userId;

    private String username;

    private int point;

    private String status;

}
