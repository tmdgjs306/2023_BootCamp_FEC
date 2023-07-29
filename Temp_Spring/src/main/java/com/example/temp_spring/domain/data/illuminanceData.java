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
 * Description: 조도 데이터 저장시 필요한 객체
 */

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
