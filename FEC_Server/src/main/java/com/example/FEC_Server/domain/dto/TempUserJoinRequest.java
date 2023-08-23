package com.example.FEC_Server.domain.dto;

import com.example.FEC_Server.domain.user.TempUser;
import com.example.FEC_Server.domain.user.UserRole;
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

    private int farmId;
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
