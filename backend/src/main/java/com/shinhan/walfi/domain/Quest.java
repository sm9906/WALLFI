package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class Quest {
    @Id
    @Column(name = "quest_idx")
    private String questIdx;

    @Column(name = "quest_type")
    private String questType;

    private String title;

    @Column(name = "quest_exp")
    private Integer questExp;

    @Column(name = "due_date")
    private Integer dueDate;
}
