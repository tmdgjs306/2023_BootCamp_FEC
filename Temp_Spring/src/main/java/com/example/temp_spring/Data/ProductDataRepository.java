package com.example.temp_spring.Data;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductDataRepository extends MongoRepository<ProductData, String> {

    public ProductData findByValue(double value);
    public ProductData findByPlant_id(String plant_id);
}