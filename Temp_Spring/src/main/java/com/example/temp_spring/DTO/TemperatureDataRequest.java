package com.example.temp_spring.DTO;

import com.example.temp_spring.Data.TemperatureData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TemperatureDataRequest {
    private String sensor;
    private Double value;
    private String time;
    public TemperatureData toEntity(Double val, String time){
        return TemperatureData.builder()
                .sensor("Temperature Sensor")
                .value(val)
                .time(time)
                .build();
    }
}
