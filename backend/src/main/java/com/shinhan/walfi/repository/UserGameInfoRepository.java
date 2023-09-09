package com.shinhan.walfi.repository;

import com.shinhan.walfi.domain.game.UserGameInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGameInfoRepository extends JpaRepository<UserGameInfo, String> {
}
