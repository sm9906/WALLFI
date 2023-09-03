package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "color_probability")
public class ColorProbability {
    @Id
    @Enumerated(EnumType.STRING)
    private Color color;

    private Float colorPercent;
}
