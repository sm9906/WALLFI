package com.shinhan.walfi.mapper;

import com.shinhan.walfi.dao.BranchListDao;
import com.shinhan.walfi.domain.game.Branch;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BranchMapper {
    List<Branch> getBranches(BranchListDao dao);
}
