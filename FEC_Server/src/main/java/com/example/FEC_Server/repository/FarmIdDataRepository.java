package com.example.FEC_Server.repository;


import com.example.FEC_Server.domain.data.FarmIdData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FarmIdDataRepository extends JpaRepository<FarmIdData, Long> {

    @Override
    Optional<FarmIdData> findById(Long aLong);


    boolean existsByFarmId(int farmId);
}
