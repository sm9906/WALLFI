package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;

@Entity
@Getter
public class GameCharacter {

    @Id
    @Column(name = "character_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long characterIdx;

    @Column(name = "character_type")
    @NotNull
    private String characterType;

    @NotNull
    private Integer level;

    @NotNull
    private Integer exp;

    @NotNull
    private Integer hp;

    @NotNull
    private Integer atk;

    @NotNull
    private Integer def;

    @NotNull
    private String istypical;

    @Column(name = "created_time")
    @NotNull
    @CreationTimestamp
    private LocalDateTime createdTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_code")
    private UserGameInfo userGameInfo;

}
