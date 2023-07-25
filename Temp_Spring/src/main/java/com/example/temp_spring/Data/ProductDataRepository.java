package com.example.temp_spring.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProductDataRepository extends JpaRepository<ProductData,Long> {

    @Override
    Optional<ProductData> findById(Long aLong);

    @Query("SELECT u FROM ProductData u WHERE u.id = (SELECT MAX(u2.id) FROM ProductData u2)")
    ProductData findLatestCountData();
}
