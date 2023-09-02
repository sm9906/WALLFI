package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class Quest {
    @Id
    private String quest_idx;

    private String quest_type;

    private String title;

    private int quest_exp;

    private int due_date;
}
