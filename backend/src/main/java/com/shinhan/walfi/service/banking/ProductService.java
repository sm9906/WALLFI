package com.shinhan.walfi.service.banking;

import java.math.BigDecimal;

public interface ProductService {

     void createTimeDeposit(String userId, String 통화코드, String 상품명, String 만기일, BigDecimal 금리);

}
