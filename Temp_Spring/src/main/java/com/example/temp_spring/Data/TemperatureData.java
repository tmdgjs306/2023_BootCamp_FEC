package com.example.temp_spring.Data;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
