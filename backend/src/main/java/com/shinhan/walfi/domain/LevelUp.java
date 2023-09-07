package com.shinhan.walfi.domain;

public enum LevelUp {

    LEVEL_01(40),
    LEVEL_02(80),
    LEVEL_03(160),
    LEVEL_04(250),
    LEVEL_05(500),
    LEVEL_06(700),
    LEVEL_07(1400),
    LEVEL_08(3200),
    LEVEL_09(4000),
    LEVEL_10(5000);

    final int neededExp;

    LevelUp(int neededExp) {
        this.neededExp = neededExp;
    }
}
