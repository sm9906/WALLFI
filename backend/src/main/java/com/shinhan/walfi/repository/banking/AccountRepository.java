package com.shinhan.walfi.repository.banking;

import com.shinhan.walfi.domain.banking.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountRepository extends JpaRepository<Account, String> {
    @Query(value = "select * from account where 계좌번호 = ?1", nativeQuery = true)
    Account findAccount(String account);

}
