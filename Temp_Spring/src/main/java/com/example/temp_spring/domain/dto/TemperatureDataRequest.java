package com.example.temp_spring.domain.dto;

import com.example.temp_spring.domain.data.TemperatureData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: Device에서 측정된 온도 센서 값을 DB에 저장할 수 있도록 Entity로 바꿔주는 로직
 */
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
