package com.example.temp_spring.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 로그인 기능 처리시 필요한 객체
 */
@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {

    private String loginId;
    private String password;

}