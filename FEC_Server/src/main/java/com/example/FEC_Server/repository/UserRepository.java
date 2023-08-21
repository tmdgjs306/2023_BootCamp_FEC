package com.example.FEC_Server.repository;

import com.example.FEC_Server.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 회원 가입, 로그인 기능에 필요한 유저 정보
 */

public interface UserRepository extends JpaRepository<User,Long> {

    @Override
    Optional<User> findById(Long aLong);

    //로그인 관련 기능 구현시 사용
    boolean existsByLoginId(String loginId);
    Optional<User> findByLoginId(String loginId);
}
