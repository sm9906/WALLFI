package com.shinhan.walfi.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "character_probability")
public class CharacterProbability {
    @Id
    @Enumerated(EnumType.STRING)
    private CharacterType character_type;

    private float character_percent;
}
