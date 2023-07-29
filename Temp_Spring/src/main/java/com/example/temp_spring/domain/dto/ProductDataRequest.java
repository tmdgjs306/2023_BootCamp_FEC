package com.example.temp_spring.domain.dto;

import com.example.temp_spring.domain.data.ProductData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: Device에서 측정된 초음파 센서를 지나간 물체의 개수 정보를 DB에 저장할 수 있도록 Entity로 바꿔주는 로직
 */
@Getter
@Setter
@NoArgsConstructor
public class ProductDataRequest {
    private String sensor;
    private Long value;
    private String time;
    public ProductData toEntity(Long val, String time){
        return ProductData.builder()
                .sensor("Ultrasonic sensor")
                .value(val)
                .time(time)
                .build();
    }
}
