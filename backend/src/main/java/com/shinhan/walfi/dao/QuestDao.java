package com.shinhan.walfi.dao;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class QuestDao {

    private long idx;

    private String title;

    private int count;

    private int total;

    private int status;
}
