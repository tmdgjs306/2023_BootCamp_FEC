package com.example.temp_spring.DTO;

import com.example.temp_spring.Data.illuminanceData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class illuminanceDataRequest {
    private String sensor;
    private Long value;
    private String time;
    public illuminanceData toEntity(Long val, String time){
        return illuminanceData.builder()
                .sensor("Photoresistor Sensor")
                .value(val)
                .time(time)
                .build();
    }
}