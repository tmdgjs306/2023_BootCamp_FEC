package com.example.temp_spring.Data;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TemperatureDataRepository extends MongoRepository<TemperatureData, String> {
    public List<TemperatureData> findBySensor(String sensor);
}