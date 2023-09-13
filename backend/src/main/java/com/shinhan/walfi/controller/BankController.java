package com.shinhan.walfi.controller;

import com.shinhan.walfi.dto.transfer.LocalTransferDTO;
import com.shinhan.walfi.service.banking.BankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("/bank")
@RequiredArgsConstructor
public class BankController {

    private final BankService bankService;

    @PostMapping("/localtransfer")
    public LocalTransferDTO localTransfer(@RequestBody LocalTransferDTO localTransferDTO) {

        log.debug("원화 이체 Request: {}", localTransferDTO);

        bankService.localCurrencyTransferDTO(localTransferDTO);

        return localTransferDTO;
    }
}
