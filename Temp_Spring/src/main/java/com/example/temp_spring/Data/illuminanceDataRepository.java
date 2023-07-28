package com.example.temp_spring.Data;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface illuminanceDataRepository extends MongoRepository<illuminanceData, String> {

    public illuminanceData findByValue(double value);
}