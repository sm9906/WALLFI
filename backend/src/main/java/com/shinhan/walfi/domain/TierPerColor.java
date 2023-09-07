package com.shinhan.walfi.domain;

import static com.shinhan.walfi.domain.ProbabilityPerTier.*;

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
