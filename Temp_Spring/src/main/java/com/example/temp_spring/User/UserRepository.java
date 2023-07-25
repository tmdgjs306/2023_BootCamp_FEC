package com.example.temp_spring.User;

import com.example.temp_spring.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    @Override
    Optional<User> findById(Long aLong);

    //로그인 관련 기능 구현시 사용
    boolean existsByLoginId(String loginId);
    Optional<User> findByLoginId(String loginId);
}
