package com.example.temp_spring.Security;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: SHA256 인코딩 하는 함수 SALT, 키스트레칭 적용, 추후에 데이터 보안 강화시 사용할 예정
 */
public class SHA256 {

    public String getSalt(){
        SecureRandom rnd = new SecureRandom();
        byte[] salt = new byte[32];
        rnd.nextBytes(salt);

        return bytesToHex(salt);
    }
    // Password 암호화 키 스트레칭 적용, 32bit Salt 적용
    public String encrypt(String text,int count) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(text.getBytes());
        if(count==0)
            return bytesToHex(md.digest());
        else
            return encrypt(bytesToHex(md.digest()),--count);
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }

}