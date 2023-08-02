package com.example.temp_spring.Security;
import com.example.temp_spring.Service.UserService;
import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.domain.user.UserRole;
import com.example.temp_spring.jwt.JwtTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.Filter;

import static org.springframework.security.authorization.AuthorityAuthorizationManager.hasAuthority;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: Spring Security 관련 설정 정보 파일
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{

    private final UserService userService;
    private final String secretkey ="my-secret-key";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(new JwtTokenFilter(userService,secretkey), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/info").authenticated()
                .antMatchers("/admin/**").hasAuthority(UserRole.ADMIN.name())
                .and().build();
    }
}