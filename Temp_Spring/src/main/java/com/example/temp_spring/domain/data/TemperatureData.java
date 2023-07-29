package com.example.temp_spring.domain.data;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 온도 정보 저장시 필요한 객체
 */
@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TemperatureData {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sensor;
    private Double value;
    private String time;
}
