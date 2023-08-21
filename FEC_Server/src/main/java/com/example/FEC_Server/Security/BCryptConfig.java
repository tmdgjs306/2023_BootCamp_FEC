package com.example.FEC_Server.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: Spring Security 관련 클래스, 패스워드 암호화 기능 제공
 */

@Configuration
public class BCryptConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
