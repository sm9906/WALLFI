package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
public class UserGameInfo {
    @Id
    private String userCode;

    @NotNull
    private Integer point;

    @NotNull
    @ColumnDefault("'C'") //challenger or manager
    private String status;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "userGameInfo")
    private List<Branch> branches = new ArrayList<>();

    @OneToMany(mappedBy = "userGameInfo")
    private List<GameCharacter> gameCharacters = new ArrayList<>();
}
