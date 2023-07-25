package com.example.temp_spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class TempSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(TempSpringApplication.class, args);
    }

}
