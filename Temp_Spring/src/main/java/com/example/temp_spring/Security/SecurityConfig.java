package com.example.temp_spring.Security;
import com.example.temp_spring.domain.user.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: Spring Security 관련 설정 정보 파일
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PrincipalDetailsService principalDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                // 인증
                .antMatchers("/info").authenticated()
                .antMatchers("/mainData").authenticated()
                // 인가
                .antMatchers("/admin/**").hasAuthority(UserRole.ADMIN.name())
                .antMatchers("/ledOn/**").hasAuthority(UserRole.ADMIN.name())
                .antMatchers("/ledOff/**").hasAuthority(UserRole.ADMIN.name())
                .anyRequest().permitAll()
                .and()
                // Form Login 방식 적용
                .formLogin()
                // 로그인 할 때 사용할 파라미터들
                .usernameParameter("loginId")
                .passwordParameter("password")
                .loginPage("/login")     // 로그인 페이지 URL
                .defaultSuccessUrl("/")   // 로그인 성공 시 이동할 URL
                .failureUrl("/login")    // 로그인 실패 시 이동할 URL
                .and()
                .logout()
                .logoutUrl("/logout")
                .invalidateHttpSession(true).deleteCookies("JSESSIONID");
    }
}