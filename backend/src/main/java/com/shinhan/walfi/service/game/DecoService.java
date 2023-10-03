package com.shinhan.walfi.service.game;

import com.shinhan.walfi.domain.game.Game_Item;
import com.shinhan.walfi.dto.game.ItemReqDto;
import com.shinhan.walfi.dto.game.ItemResDto;

import java.util.List;

public interface DecoService {

    ItemResDto getList(String userId);

    void update(ItemReqDto itemReqDto);

    Game_Item create(String userId);

    List<Game_Item> getItemList(String userId);
}
