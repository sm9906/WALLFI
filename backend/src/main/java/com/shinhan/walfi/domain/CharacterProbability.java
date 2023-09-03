package com.shinhan.walfi.domain;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class CharacterProbability {
    @Id
    @Enumerated(EnumType.STRING)
    private CharacterType characterType;

    @NotNull
    private Float characterPercent;
}
