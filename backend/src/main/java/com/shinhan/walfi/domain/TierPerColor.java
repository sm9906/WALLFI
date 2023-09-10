package com.shinhan.walfi.domain;

import lombok.Getter;

import static com.shinhan.walfi.domain.ProbabilityPerTier.*;

@Getter
public enum TierPerColor {

    BASIC(NORMAL),
    WHITE(EPIC),
    MINT(UNIQUE),
    LED(LEGENDARY);

    final ProbabilityPerTier grade;

    TierPerColor(ProbabilityPerTier grade) {
        this.grade = grade;
    }
}
