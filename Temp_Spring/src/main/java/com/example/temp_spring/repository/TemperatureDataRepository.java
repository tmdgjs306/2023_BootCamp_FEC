package com.example.temp_spring.repository;

import com.example.temp_spring.domain.data.TemperatureData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 온도 센서 데이터 관련 로직
 */
public interface TemperatureDataRepository extends JpaRepository<TemperatureData,Long> {

    @Override
    Optional<TemperatureData> findById(Long aLong);

    @Query("SELECT u FROM TemperatureData u WHERE u.id = (SELECT MAX(u2.id) FROM TemperatureData u2)")
    TemperatureData findLatestTemperatureDataData();
}
