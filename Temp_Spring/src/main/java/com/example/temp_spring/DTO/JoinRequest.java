package com.example.temp_spring.DTO;

import com.example.temp_spring.User.User;
import com.example.temp_spring.User.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequest {

    @NotBlank(message = "로그인 아이디가 비어있습니다.")
    private String loginId;

    @NotBlank(message = "비밀번호가 비어있습니다.")
    private String password;
    private String passwordCheck;

    @NotBlank(message = "닉네임이 비어있습니다.")
    private String nickname;


    // 비밀번호 암호화 X 추후 해시나, Spring security 적용
    public User toEntity() {
        return User.builder()
                .loginId(this.loginId)
                .passwd(this.password)
                .name(this.nickname)
                .role(UserRole.ADMIN)
                .build();
    }
}