package com.example.temp_spring;

import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.domain.user.UserRole;
import com.example.temp_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

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
    private final BCryptPasswordEncoder encoder;

    @PostConstruct
    public void makeAdminAndUser() {
        if(!userRepository.existsByLoginId("root")) {
            User admin2 = User.builder()
                    .loginId("root")
                    .passwd(encoder.encode("1234"))
                    .name("관리자")
                    .role(UserRole.ADMIN)
                    .build();
            userRepository.save(admin2);
        }
        if(!userRepository.existsByLoginId("user")) {
            User user2 = User.builder()
                    .loginId("user")
                    .passwd(encoder.encode("1234"))
                    .name("유저")
                    .role(UserRole.USER)
                    .build();
            userRepository.save(user2);
        }
    }

}
