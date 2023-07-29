package com.example.temp_spring.Security;

import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: Spring Security 관련 클래스, UserRepository 에서 username을 통해 user 조회하는 기능
 */
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByLoginId(username)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException("해당 유저를 찾을 수 없습니다.");
                });
        return new PrincipalDetails(user);
    }
}
