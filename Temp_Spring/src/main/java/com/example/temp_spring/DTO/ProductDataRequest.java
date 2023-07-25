package com.example.temp_spring.DTO;

import com.example.temp_spring.Data.ProductData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductDataRequest {
    private String sensor;
    private Long value;
    private String time;
    public ProductData toEntity(Long val){
        return ProductData.builder()
                .sensor("Ultrasonic sensor")
                .value(val)
                .time(this.time)
                .build();
    }
}
