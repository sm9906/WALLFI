package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Quest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quest_idx")
    private Long questIdx;

    @Column(name = "quest_type")
    private String questType;

    private String title;

    @Column(name = "quest_exp")
    private Integer questExp;

    @Column(name = "due_date")
    private Integer dueDate;
}
