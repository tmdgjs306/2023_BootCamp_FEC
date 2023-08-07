package com.example.temp_spring;

import com.example.temp_spring.Security.SHA256;
import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.domain.user.UserRole;
import com.example.temp_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.NoSuchAlgorithmException;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: User Database 기본 계정 정보를 삽입하는 로직
 * 생성 ID: root(pw: 1234, Role: ADMIN) user(pw: 1234, Role: USER)
 */
@Component
@RequiredArgsConstructor
public class InitUseRepository {

    private final UserRepository userRepository;
    private SHA256 sha256 = new SHA256();
    @PostConstruct
    public void makeAdminAndUser() throws NoSuchAlgorithmException {
        String salt = sha256.getSalt();
        if(!userRepository.existsByLoginId("root")) {
            User admin2 = User.builder()
                    .loginId("root")
                    .passwd(sha256.encrypt("1234"+salt,3))
                    .email("admin@gmail.com")
                    .role(UserRole.ADMIN)
                    .salt(salt)
                    .build();
            userRepository.save(admin2);
        }
        if(!userRepository.existsByLoginId("user")) {
            salt = sha256.getSalt();
            User user2 = User.builder()
                    .loginId("user")
                    .passwd(sha256.encrypt("1234"+salt,3))
                    .email("user@gmail.com")
                    .role(UserRole.USER)
                    .salt(salt)
                    .build();
            userRepository.save(user2);
        }
    }

}
