package com.shinhan.walfi.domain;

public enum ProbabilityPerTier {

    NORMAL(2),
    EPIC(5),
    UNIQUE(92.999),
    LEGENDARY(0.001);

    final double percent;

    ProbabilityPerTier(double percent){
        this.percent = percent;
    }
}
