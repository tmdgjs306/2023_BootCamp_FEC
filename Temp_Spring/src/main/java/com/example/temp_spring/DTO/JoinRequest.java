package com.example.temp_spring.DTO;

import com.example.temp_spring.Security.SHA256;
import com.example.temp_spring.User.User;
import com.example.temp_spring.User.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.security.NoSuchAlgorithmException;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequest {

    SHA256 sha256 = new SHA256();
    @NotBlank(message = "로그인 아이디가 비어있습니다.")
    private String loginId;

    @NotBlank(message = "비밀번호가 비어있습니다.")
    @Size(min=8,message = "비밀번호는 적어도 8 자리 이상이어야 합니다")
    @Size(max=20, message = "비밀번호가 너무 깁니다.")
    private String password;
    private String passwordCheck;

    @NotBlank(message = "닉네임이 비어있습니다.")
    private String nickname;


    // 비밀번호 SHA256 해시 함수 이용하여 암호화 하여 보관
    public User toEntity(String salt) throws NoSuchAlgorithmException {
        return User.builder()
                .loginId(this.loginId)
                .passwd(sha256.encrypt(this.password+salt,3))
                .name(this.nickname)
                .role(UserRole.ADMIN)
                .salt(salt)
                .build();
    }
}