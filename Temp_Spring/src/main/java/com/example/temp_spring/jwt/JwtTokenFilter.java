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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final String secretKey;

    protected void doFilterInternal(HttpServletRequest req , HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = req.getHeader(HttpHeaders.AUTHORIZATION);

        if(authorizationHeader == null){
            filterChain.doFilter(req,res);
            return;
        }

        if(!authorizationHeader.startsWith("Bearer ")){
            filterChain.doFilter(req,res);
            return;
        }

        String token = authorizationHeader.split(" ")[1];

        if(JwtTokenUtil.isExpired(token,secretKey)){
            filterChain.doFilter(req,res);
            return;
        }

        String loginId = JwtTokenUtil.getLoginId(token,secretKey);

        User loginUser = userService.getLoginUserByLoginId(loginId);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginUser.getLoginId(), null, List.of(new SimpleGrantedAuthority(loginUser.getRole().name())));
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(req,res);
    }
}
