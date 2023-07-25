package com.example.temp_spring.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TemperatureDataRepository extends JpaRepository<TemperatureData,Long> {

    @Override
    Optional<TemperatureData> findById(Long aLong);

    @Query("SELECT u FROM TemperatureData u WHERE u.id = (SELECT MAX(u2.id) FROM TemperatureData u2)")
    TemperatureData findLatestTemperatureDataData();
}
