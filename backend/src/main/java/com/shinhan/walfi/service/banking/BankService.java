package com.shinhan.walfi.service.banking;

import com.shinhan.walfi.dto.transfer.LocalTransferDTO;

public interface BankService {

    void localCurrencyTransferDTO(LocalTransferDTO localTransferDTO);
}
