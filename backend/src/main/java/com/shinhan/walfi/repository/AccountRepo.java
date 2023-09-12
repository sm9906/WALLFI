package com.shinhan.walfi.repository;

import com.shinhan.walfi.domain.banking.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account, String> {
}
