package com.shinhan.walfi.dao;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;


@Getter
@Setter
@ToString
public class QuestTypeDao {

    private String type;

    List<QuestDao> questList;
}
