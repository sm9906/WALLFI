package com.shinhan.walfi.repository.banking;

import com.shinhan.walfi.domain.banking.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {
}
