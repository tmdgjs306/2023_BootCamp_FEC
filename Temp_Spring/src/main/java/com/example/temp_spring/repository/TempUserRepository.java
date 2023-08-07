package com.example.temp_spring.repository;

import com.example.temp_spring.domain.user.TempUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TempUserRepository extends JpaRepository<TempUser,Long> {
    Optional<TempUser> findById(Long aLong);
    void deleteTempUserByLoginId(String aString);
    @Query("select t from TempUser t")
    List<TempUser> findAllTempUser();

}
