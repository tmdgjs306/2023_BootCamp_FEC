package com.example.temp_spring.Security;
import com.example.temp_spring.Service.UserService;
import com.example.temp_spring.domain.user.UserRole;
import com.example.temp_spring.jwt.JwtTokenFilter;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

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
    private final String secretkey ="asnlwEysd15BsYt9V7zq571GejMnGUNNFE3408f12MGVA9XkHa";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 정책 설정 -> Stateless
                .and()
                .addFilterBefore(new JwtTokenFilter(userService,secretkey), UsernamePasswordAuthenticationFilter.class) // JWT Token Filter 사용 설정, 유저 이름과 패스워드로 인증
                .authorizeRequests()
                .antMatchers("/userInfo").authenticated() // 비 로그인 유저 접근을 제한
                .antMatchers("/admin/**").hasAuthority(UserRole.ADMIN.name()) // 로그인 + Role = Admin인 유저만 접근 제한
                .antMatchers("/getPlantEnvironmentData/**").authenticated()
                .antMatchers("/getTempUser").hasAuthority(UserRole.ADMIN.name())
                .antMatchers("/acceptUser").hasAuthority(UserRole.ADMIN.name())
                .anyRequest().permitAll()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new AuthenticationEntryPoint() { // 인증 실패시 실행되는 로직
                    @Override
                    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                            response.setContentType("text/plain");
                            response.setCharacterEncoding("UTF-8");
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.getWriter().write("인증 실패");
                    }
                })
                .accessDeniedHandler(new AccessDeniedHandler() { // 인가 실패시 실행되는 로직
                    @Override
                    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                            response.setContentType("text/plain");
                            response.setCharacterEncoding("UTF-8");
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.getWriter().write("인가 실패");
                    }
                })
                .and().build();
    }
}