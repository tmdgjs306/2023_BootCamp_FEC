package com.example.FEC_Server.repository;

import com.example.FEC_Server.domain.data.PlantEnvironmentData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlantEnvironmentDataRepository extends JpaRepository<PlantEnvironmentData,Long> {

    @Query("select p from PlantEnvironmentData p")
    List<PlantEnvironmentData> getAllPlantEnvironmentData();

    PlantEnvironmentData getPlantEnvironmentDataByName(String name);

    PlantEnvironmentData getPlantEnvironmentDataById(Long aLong);

    boolean existsPlantEnvironmentDataByName(String name);
}
