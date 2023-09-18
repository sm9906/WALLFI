package com.shinhan.walfi.domain.enums;

import lombok.Getter;

@Getter
public enum ProbabilityPerTier {

    NORMAL(10),
    EPIC(5),
    UNIQUE(84.9),
    LEGENDARY(0.1);

    final double percent;

    ProbabilityPerTier(double percent){
        this.percent = percent;
    }
}
