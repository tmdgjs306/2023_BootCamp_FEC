package com.example.temp_spring.domain.dto;

import com.example.temp_spring.domain.user.TempUser;
import com.example.temp_spring.domain.user.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class TempUserJoinRequest {
    private String loginId;
    private String password;
    private String email;

    private Long farmId;
    public TempUser toEntity() {
        return TempUser.builder()
                .loginId(this.loginId)
                .password(this.password)
                .email(this.email)
                .role(UserRole.USER)
                .farmId(this.farmId)
                .build();
    }
}
