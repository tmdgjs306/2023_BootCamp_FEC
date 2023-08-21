package com.example.FEC_Server.domain.user;

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
public class TempUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 기본키, 자동증가

    private String loginId; // ID 정보
    private String password;
    private String email;
    private UserRole role;
    private int farmId;
}
