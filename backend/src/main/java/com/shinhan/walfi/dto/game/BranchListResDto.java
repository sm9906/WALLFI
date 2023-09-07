package com.shinhan.walfi.dto.game;

import com.shinhan.walfi.domain.game.Branch;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class BranchListResDto {

    private List<Branch> branchList = new ArrayList<>();
}
