package com.example.temp_spring;

import com.example.temp_spring.Data.TemperatureData;
import com.example.temp_spring.Data.TemperatureDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.util.Arrays;
import java.util.List;


@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class TempSpringApplication implements CommandLineRunner {

    @Autowired
    private TemperatureDataRepository temperatureDataRepository;

    public static void main(String[] args) {
        SpringApplication.run(TempSpringApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        TemperatureData temperatureData1 = new TemperatureData("j", 33.0, "99");
        TemperatureData temperatureData2 = new TemperatureData("j", 34.0, "88");

        // insert
        temperatureDataRepository.insert(Arrays.asList(temperatureData1, temperatureData2));

        // get
        List<TemperatureData> result = temperatureDataRepository.findBySensor("j");
        System.out.println(result);
    }
}