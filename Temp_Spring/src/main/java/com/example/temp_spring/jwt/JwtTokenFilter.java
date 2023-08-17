package com.example.temp_spring.jwt;

import com.example.temp_spring.Service.UserService;
import com.example.temp_spring.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final String secretKey;

    protected void doFilterInternal(HttpServletRequest req , HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = req.getHeader(HttpHeaders.AUTHORIZATION);

        // Header의 Autorization 값이 비어있으면 JWT Token 값이 없는 것
        if(authorizationHeader == null){
            // 클라이언트 로그인 시 쿠키의 "jwtToken"로 Jwt Token을 전송
            // 쿠키에도 Jwt Token이 없다면 로그인 하지 않은 것으로 간주
            if(req.getCookies() == null) {
                filterChain.doFilter(req, res);
                return;
            }

            // 쿠키에서 "jwtToken"을 Key로 가진 쿠키를 찾아서 가져오고 없으면 null return
            Cookie jwtTokenCookie = Arrays.stream(req.getCookies())
                    .filter(cookie -> cookie.getName().equals("jwtToken"))
                    .findFirst()
                    .orElse(null);

            if(jwtTokenCookie == null) {
                filterChain.doFilter(req, res);
                return;
            }

            // 쿠키 Jwt Token이 있다면 이 토큰으로 인증, 인가 진행
            String jwtToken = jwtTokenCookie.getValue();
            authorizationHeader = "Bearer " + jwtToken;
        }

        // Header의 Authorization 값이 'Bearer '로 시작하지 않으면 Null 리턴
        if(!authorizationHeader.startsWith("Bearer ")){
            filterChain.doFilter(req,res);
            return;
        }

        // 전송 받은 값에서 'Bearer ' 뒷부분 (Jwt Token) 부분 추출
        String token = authorizationHeader.split(" ")[1];

        //만약 token이 만료 되었다면 Null 리턴
        if(JwtTokenUtil.isExpired(token)){
            filterChain.doFilter(req,res);
            return;
        }

        // 토큰에서 loginId 정보 추출
        String loginId = JwtTokenUtil.getLoginId(token);

        // 추출한 loginId로 User 정보 조회
        User loginUser = userService.getLoginUserByLoginId(loginId);

        // 유저 정보로  UsernamePasswordAuthenticationToken 발급
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginUser.getLoginId(), null, List.of(new SimpleGrantedAuthority(loginUser.getRole().name())));
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));

        //권한 부여
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(req,res);
    }
}
