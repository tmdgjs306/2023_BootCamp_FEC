package com.example.temp_spring.repository;

import com.example.temp_spring.domain.data.FarmInformationData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FarmInformationDataRepository extends JpaRepository<FarmInformationData,Long> {

    @Override
    Optional<FarmInformationData> findById(Long aLong);

    @Query("SELECT u FROM FarmInformationData u WHERE u.id = (SELECT MAX(u2.id) FROM FarmInformationData u2 WHERE u2.farmId = :farmId)")
    FarmInformationData findLatestFarmInformationData(@Param("farmId") Long farmId);
}
