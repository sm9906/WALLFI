package com.shinhan.walfi.controller;

import com.shinhan.walfi.domain.HttpResult;
import com.shinhan.walfi.dto.transfer.TransferDTO;
import com.shinhan.walfi.service.banking.BankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @PostMapping("/transfer")
    public ResponseEntity<HttpResult> localTransfer(@RequestBody TransferDTO transferDTO) {

        String currencyCode = transferDTO.get통화코드();
        String transferType = "";

        if (currencyCode.equals("KRW")) {
            bankService.localCurrencyTransfer(transferDTO);
            transferType = "원화 이체 성공";
        } else {
            bankService.globalCurrencyTransfer(transferDTO);
            transferType = "외화 이체 성공";
        }

        HttpResult res = new HttpResult(OK, SUCCESS, transferType);
        res.setData(transferDTO.get출금계좌번호());

        return ResponseEntity.status(200).body(res);
    }
}
