package com.example.temp_spring.Data;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TemperatureDataRepository extends MongoRepository<TemperatureData, String> {

    public TemperatureData findByValue(double value);
}