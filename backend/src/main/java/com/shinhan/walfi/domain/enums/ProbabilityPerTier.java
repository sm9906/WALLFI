package com.shinhan.walfi.domain.enums;

import lombok.Getter;

@Getter
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
