package com.example.temp_spring.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenUtil {

    private static Claims extractClaims(String token, String key){
        return Jwts.parser().setSigningKey(key).parseClaimsJwt(token).getBody();
    }

    public static String createToken(String loginId, String key, long expireTimeMs){

        Claims claims = Jwts.claims();
        claims.put("loginId",loginId); // Token에 들어갈 정보

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+expireTimeMs)) // 유효시간
                .signWith(SignatureAlgorithm.HS256,key)
                .compact();
    }

    public static String getLoginId(String token, String key){
        return extractClaims(token,key).get("loginId").toString();
    }

    public static boolean isExpired(String token, String key){
        Date expiredData = extractClaims(token,key).getExpiration();

        return expiredData.before(new Date());
    }

}
