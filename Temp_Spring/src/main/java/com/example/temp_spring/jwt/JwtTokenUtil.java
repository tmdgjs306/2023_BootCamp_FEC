package com.example.temp_spring.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenUtil {

    // JWT Token 발급
    public static String createToken(String loginId, String key, long expireTimeMs){
        // Claim = Jwt Token에 들어갈 정보
        // Claim에 loginId 정보 삽입 -> 나중에 꺼낼 수 있음 -> 이것을 권한 검사 등에 사용
        Claims claims = Jwts.claims();
        claims.put("loginId",loginId); // Token에 들어갈 정보

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+expireTimeMs)) // 유효시간
                .signWith(SignatureAlgorithm.HS256,key)
                .compact();
    }

    //Claim에서 loginId 값 꺼냄
    public static String getLoginId(String token, String key){
        return extractClaims(token,key).get("loginId").toString();
    }

    // 토큰의 유효 시간 검증
    public static boolean isExpired(String token, String key){
        Date expiredData = extractClaims(token,key).getExpiration();

        return expiredData.before(new Date());
    }


    // Private Key를 사용하여 Token Parsing
    private static Claims extractClaims(String token, String key){
        return Jwts.parser().setSigningKey(key).parseClaimsJwt(token).getBody();
    }
}
