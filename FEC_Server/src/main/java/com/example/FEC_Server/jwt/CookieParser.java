package com.example.FEC_Server.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Arrays;

@Service
@Transactional
@RequiredArgsConstructor
public class CookieParser {

    public String parseCookie(HttpServletRequest req){
        // Cookie 에서 토큰 추출
        Cookie jwtTokenCookie = Arrays.stream(req.getCookies())
                .filter(cookie -> cookie.getName().equals("jwtToken"))
                .findFirst()
                .orElse(null);

        if(jwtTokenCookie == null) {
            return null;
        }
        String jwtToken = jwtTokenCookie.getValue();
        String loginId = JwtTokenUtil.getLoginId(jwtToken);
        return loginId;
    }
}
