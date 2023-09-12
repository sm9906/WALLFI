package com.shinhan.walfi.service;

import com.shinhan.walfi.dto.banking.AccountResDto;

public interface AccountService {

    public AccountResDto getAccounts(String userId, String userMainAccount);

}
