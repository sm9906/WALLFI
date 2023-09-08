package com.shinhan.walfi.mapper;

import com.shinhan.walfi.dao.BranchListDao;
import com.shinhan.walfi.dto.game.BranchListResDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BranchMapperTest {

    @Autowired
    BranchMapper branchMapper;

    @Test
    void getBranches() {
        BranchListDao dao = new BranchListDao();
        dao.setMinLatitude(36);
        List<BranchListResDto> branchListResDtos = branchMapper.getBranches(dao);

        System.out.println("hello");
        System.out.println(branchListResDtos.size());
        Assertions.assertNull(branchListResDtos);
    }
}