package com.example.temp_spring.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface illuminanceDataRepository extends JpaRepository<illuminanceData,Long> {

    @Override
    Optional<illuminanceData> findById(Long aLong);

    @Query("SELECT u FROM illuminanceData u WHERE u.id = (SELECT MAX(u2.id) FROM illuminanceData u2)")
    illuminanceData findLatestPhotoData();
}
