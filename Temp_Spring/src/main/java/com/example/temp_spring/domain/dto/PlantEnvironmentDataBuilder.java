package com.example.temp_spring.domain.dto;

import com.example.temp_spring.domain.data.PlantEnvironmentData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.NoSuchAlgorithmException;

@Getter
@Setter
@NoArgsConstructor
public class PlantEnvironmentDataBuilder {
    private String name;

    private Double minTemperature;
    private Double maxTemperature;

    private Double minHumidity;
    private Double maxHumidity;

    private Long illuminance;
    private Long carbonDioxide;

    public PlantEnvironmentData toEntity() {
        return PlantEnvironmentData.builder()
                .name(this.name)
                .minTemperature(this.minTemperature)
                .maxTemperature(this.maxTemperature)
                .minHumidity(this.minHumidity)
                .maxHumidity(this.maxHumidity)
                .illuminance(this.illuminance)
                .carbonDioxide(this.carbonDioxide)
                .build();
    }
}
