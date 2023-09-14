package com.shinhan.walfi.dto.game;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Id;

@Getter
@Setter
public class BranchResDto {

    @Id
    private Long 지점번호;

    private String 지점명;

    private String 지점주소;

    private String 지점대표전화번호;

    private double 지점위도;

    private double 지점경도;

    private int managerLevel;

    private int managerExp;

    private int managerHp;

    private int managerAtk;

    private int managerDef;

    public BranchResDto(Long 지점번호, String 지점명, String 지점주소, String 지점대표전화번호, double 지점위도, double 지점경도, int managerLevel, int managerExp, int managerHp, int managerAtk, int managerDef) {
        this.지점번호 = 지점번호;
        this.지점명 = 지점명;
        this.지점주소 = 지점주소;
        this.지점대표전화번호 = 지점대표전화번호;
        this.지점위도 = 지점위도;
        this.지점경도 = 지점경도;
        this.managerLevel = managerLevel;
        this.managerExp = managerExp;
        this.managerHp = managerHp;
        this.managerAtk = managerAtk;
        this.managerDef = managerDef;
    }
}
