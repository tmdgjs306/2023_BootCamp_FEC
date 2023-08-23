package com.example.FEC_Server.repository;

import com.example.FEC_Server.domain.user.TempUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TempUserRepository extends JpaRepository<TempUser,Long> {
    Optional<TempUser> findById(Long aLong);

    void deleteTempUserByLoginId(String aString);
    @Query("select t from TempUser t")
    List<TempUser> findAllTempUser();

    TempUser findByLoginId(String loginId);

    boolean existsByLoginId(String loginId);
}
