package com.shinhan.walfi.service.game;

import com.shinhan.walfi.dto.game.BattleRankResDto;
import com.shinhan.walfi.dto.game.BattleReqDto;

import java.util.List;

public interface BattleService {

    void write(BattleReqDto battleReqDto);

    List<BattleRankResDto> getRank(Long idx);

    List<BattleRankResDto> getAllRank();
}
