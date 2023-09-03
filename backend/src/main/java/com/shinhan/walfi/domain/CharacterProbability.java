package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "character_probability")
public class CharacterProbability {
    @Id
    @Column(name = "character_type")
    @Enumerated(EnumType.STRING)
    private CharacterType characterType;

    @Column(name = "character_percent")
    @NotNull
    private Float characterPercent;
}
