package com.example.temp_spring.repository;

import com.example.temp_spring.domain.data.ProductData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 초음파 센서 데이터 관련 로직
 */
public interface ProductDataRepository extends JpaRepository<ProductData,Long> {

    @Override
    Optional<ProductData> findById(Long aLong);

    @Query("SELECT u FROM ProductData u WHERE u.id = (SELECT MAX(u2.id) FROM ProductData u2)")
    ProductData findLatestCountData();
}
