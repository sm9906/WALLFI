package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "color_probability")
public class ColorProbability {
    @Id
    @Enumerated(EnumType.STRING)
    private Color color;

    @Column(name = "color_percent")
    @NotNull
    private Float colorPercent;
}
