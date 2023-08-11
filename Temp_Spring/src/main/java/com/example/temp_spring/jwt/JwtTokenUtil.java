package com.example.temp_spring.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenUtil {

    private static final String secretkey ="asnlwEysd15BsYt9V7zq571GejMnGUNNFE3408f12MGVA9XkHa";
    // JWT Token 발급
    public static String createToken(String loginId, String key, long expireTimeMs){
        // Claim = Jwt Token에 들어갈 정보
        // Claim에 loginId 정보 삽입 -> 나중에 꺼낼 수 있다.
        // 핵심 정보가 들어가면 안된다. -> 토큰을 탈취당할 수 있기 때문
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
    public static String getLoginId(String token){
        return extractClaims(token).get("loginId").toString();
    }

    // 토큰의 유효 시간 검증
    public static boolean isExpired(String token){
        Date expiredData = extractClaims(token).getExpiration();

        return expiredData.before(new Date());
    }


    // Private Key를 사용하여 Token Parsing
    private static Claims extractClaims(String token){
        return Jwts.parser().setSigningKey(secretkey).parseClaimsJws(token).getBody();
    }
}
