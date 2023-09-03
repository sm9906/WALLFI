package com.shinhan.walfi.domain;

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
    private float characterPercent;
}
