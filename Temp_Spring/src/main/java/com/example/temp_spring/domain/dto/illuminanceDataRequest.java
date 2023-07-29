package com.example.temp_spring.domain.dto;

import com.example.temp_spring.domain.data.illuminanceData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: Device에서 측정된 조도 센서 값을 DB에 저장할 수 있도록 Entity로 바꿔주는 로직
 */
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