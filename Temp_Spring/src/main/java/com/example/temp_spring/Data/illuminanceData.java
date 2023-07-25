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
public class illuminanceData {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 기본키 값 자등 증가 하여 저장

    private String sensor;
    private Long value;
    private String time;
}
