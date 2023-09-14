package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.dto.transfer.LocalTransferDTO;
import com.shinhan.walfi.service.banking.BankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.shinhan.walfi.domain.HttpResult.Result.SUCCESS;
import static org.springframework.http.HttpStatus.OK;


@Slf4j
@RestController
@RequestMapping("/bank")
@RequiredArgsConstructor
public class BankController {

    private final BankService bankService;

    @PostMapping("/localtransfer")
    public ResponseEntity<HttpResult> localTransfer(@RequestBody LocalTransferDTO localTransferDTO) {

        log.debug("원화 이체 Request: {}", localTransferDTO);

        bankService.localCurrencyTransferDTO(localTransferDTO);

        HttpResult res = new HttpResult(OK, SUCCESS, "이체 성공");
        return ResponseEntity.status(200).body(res);
    }
}
