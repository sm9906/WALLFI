package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "user_game_info")
public class UserGameInfo {
    @Id
    private String user_code;

    private int point;

    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
