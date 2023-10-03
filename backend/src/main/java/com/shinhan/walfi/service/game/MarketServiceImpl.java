package com.shinhan.walfi.service.game;

import com.shinhan.walfi.dao.GoodsDao;
import com.shinhan.walfi.domain.game.GameCharacter;
import com.shinhan.walfi.domain.game.GameItem;
import com.shinhan.walfi.domain.game.Goods;
import com.shinhan.walfi.domain.game.UserGameInfo;
import com.shinhan.walfi.dto.game.BuyReqDto;
import com.shinhan.walfi.dto.game.GoodsCharacterResDto;
import com.shinhan.walfi.dto.game.GoodsItemResDto;
import com.shinhan.walfi.dto.game.MarketReqDto;
import com.shinhan.walfi.exception.MarketErrorCode;
import com.shinhan.walfi.exception.MarketException;
import com.shinhan.walfi.mapper.DecoMapper;
import com.shinhan.walfi.mapper.MarketMapper;
import com.shinhan.walfi.repository.game.CharacterRepository;
import com.shinhan.walfi.repository.game.UserGameInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {

    private final MarketMapper marketMapper;

    private final UserGameInfoRepository userGameInfoRepository;

    private final CharacterRepository characterRepository;

    private final DecoMapper decoMapper;

    @Override
    public List<GoodsItemResDto> getItemList() {
        return null;
    }

    @Override
    public List<GoodsCharacterResDto> getCharacterList() {
        return null;
    }

    @Override
    public void sell(MarketReqDto marketReqDto) {
        marketMapper.sell(marketReqDto);
    }

    @Override
    @Transactional
    public void buy(String userId, BuyReqDto buyReqDto) {
        // userId로 현재 보유하고 있는 포인트 조회
        UserGameInfo userGameInfo = userGameInfoRepository.findById(userId);
        int point = userGameInfo.getPoint();
        if (point < buyReqDto.getPrice()) {
            // 돈이 부족하면 error 발생
            throw new MarketException(MarketErrorCode.LACK_OF_POINT);
        }

        GoodsDao goods = marketMapper.findById(buyReqDto.getGoodsIdx());

        // 돈 차감
        userGameInfo.setPoint(point - buyReqDto.getPrice());
        userGameInfoRepository.save(userGameInfo);
        // 해당 아이템 또는 캐릭터를 사용자의 명의로 이동

        if (goods.getGoodsType() == "c") { // Character Type
            GameCharacter gameCharacter = characterRepository.findCharacterByIdx(goods.getCharacterIdx());
            UserGameInfo owner = new UserGameInfo();
            owner.setUserId(userId);
            gameCharacter.setUserGameInfo(owner);
        } else { // Item Type
            decoMapper.changeOwner(userId, goods.getItemIdx());
        }
        // goods 판매 목록에서 삭제
    }
}
