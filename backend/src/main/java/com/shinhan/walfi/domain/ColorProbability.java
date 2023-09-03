package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ColorProbability {
    @Id
    @Enumerated(EnumType.STRING)
    private Color color;

    @NotNull
    private Float colorPercent;
}
