package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Quest {
    @Id
    @Column(name = "quest_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questIdx;

    @Column(name = "quest_type")
    @NotNull
    private String questType;

    @NotNull
    private String title;

    @Column(name = "quest_exp")
    @NotNull
    private Integer questExp;

    @Column(name = "due_date")
    @NotNull
    private Integer dueDate;
}
