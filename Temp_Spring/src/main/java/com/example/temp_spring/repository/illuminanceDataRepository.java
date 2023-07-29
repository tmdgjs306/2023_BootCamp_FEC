package com.example.temp_spring.repository;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 조도센서 데이터베이스 관련 로직
 */
import com.example.temp_spring.domain.data.illuminanceData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface illuminanceDataRepository extends JpaRepository<illuminanceData,Long> {

    @Override
    Optional<illuminanceData> findById(Long aLong);

    @Query("SELECT u FROM illuminanceData u WHERE u.id = (SELECT MAX(u2.id) FROM illuminanceData u2)")
    illuminanceData findLatestPhotoData();
}
