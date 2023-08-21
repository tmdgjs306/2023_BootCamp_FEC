package com.example.FEC_Server.repository;

import com.example.FEC_Server.domain.data.FarmInformationData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FarmInformationDataRepository extends JpaRepository<FarmInformationData,Long> {

    @Override
    Optional<FarmInformationData> findById(Long aLong);

    //가장 최근 데이터 반환 쿼리
    @Query("SELECT u FROM FarmInformationData u WHERE u.id = (SELECT MAX(u2.id) FROM FarmInformationData u2 WHERE u2.farmId = :farmId)")
    FarmInformationData findLatestFarmInformationData(@Param("farmId") int farmId);

    //온도 평균 반환 쿼리
    @Query("SELECT AVG(u.TemperatureValue) FROM FarmInformationData u WHERE u.farmId = :farmId AND u.time >= :startTime AND u.time IS NOT NULL AND u.time <> 'nullnullnullnullnull'")
    Double findAverageTemperatureValue(@Param("farmId") int farmId, @Param("startTime") String startTime);

    //습도 평균 반환 쿼리
    @Query("SELECT AVG(u.humidityValue) FROM FarmInformationData u WHERE u.farmId = :farmId AND u.time >= :startTime AND u.time IS NOT NULL AND u.time <> 'nullnullnullnullnull'")
    Double findAverageHumidityValue(@Param("farmId") int farmId, @Param("startTime") String startTime);

    //CO2 평균 반환 쿼리
    @Query("SELECT AVG(u.carbonDioxideValue) FROM FarmInformationData u WHERE u.farmId = :farmId AND u.time >= :startTime AND u.time IS NOT NULL AND u.time <> 'nullnullnullnullnull'")
    Double findAverageCarbonDioxideValue(@Param("farmId") int farmId, @Param("startTime") String startTime);

}
