package com.example.temp_spring.domain.user;
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
 * Description: 회원 가입, 로그인 기능에 필요한 유저 정보
 */
@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 기본키, 자동증가

    private String loginId;
    private String passwd;
    private String email;
    private UserRole role;
    private String salt;
}
