package com.example.temp_spring.repository;

import com.example.temp_spring.domain.data.FarmPlantData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FarmPlantDataRepository extends JpaRepository<FarmPlantData,Long> {

    @Override
    Optional<FarmPlantData> findById(Long aLong);

    @Query("SELECT f FROM FarmPlantData f WHERE f.farmId = :farmId")
    List<FarmPlantData> findFarmPlantDataByFarmId(@Param("farmId") Long farmId);
}
