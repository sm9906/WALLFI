package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.transfer.LocalTransferDTO;
import com.shinhan.walfi.mapper.BankMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.stereotype.Service;


@Log4j
@Service
@RequiredArgsConstructor
public class BankServiceImpl implements BankService {

    private final BankMapper bankMapper;

    /**
     * 1. 출금 계좌 번호 조회
     * 2. 입금 대표 계좌 번호 조회
     * 3. 입금 세부 계좌 번호 조회
     * 4. 출금 계좌에 이체 금액 이상의 돈이 있는지 확인
     * 5. 출금 계좌에 이체 금액만큼 차감
     * 6. 입금 계좌에 이체 금액만큼 입금
     *
     * @param localTransferDTO
     */
    @Override
    public void localCurrencyTransferDTO(LocalTransferDTO localTransferDTO) {
        
    }
}
