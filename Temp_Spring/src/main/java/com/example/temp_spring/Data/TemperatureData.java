package com.example.temp_spring.Data;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "TemperatureData")
@Getter
@Setter

public class TemperatureData {
    @Id
    private ObjectId id;
    private double value;
    private String sensor;
    private String time;

    public TemperatureData(String sensor, double value, String time) {
        this.sensor = sensor;
        this.value = value;
        this.time = time;
    }

    @Override
    public String toString() {
        return "TemperatureData{" +
                "id=" + id +
                ", value=" + value +
                ", sensor='" + sensor + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}