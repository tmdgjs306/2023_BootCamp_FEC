package com.example.Controller;

import com.example.temp_spring.domain.dto.JoinRequest;
import com.example.temp_spring.domain.dto.LoginRequest;
import com.example.temp_spring.Service.UserService;
import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 로그인 기능을 제공하는 Controller
 * Mapping Info (별도 Method 미 작성 시 Get Mapping)
 * [/] : "home.html" 반환 -> index 페이지 (삭제됨 )
 * [/join] : "join.html" 반환 -> 회원 가입 페이지 (삭제됨 )
 * [/join post]: 사용자로 부터 입력받은 회원 가입 정보 처리 로직(아이디 중복 검증)
 * [/login post] : 로그인 처리 로직 성공적으로 로그인 하면 AWT 토큰 반환
 *
 * Update: 2023-07-28: HSH Spring Security 적용, 유저 권한 관리 자동화
 * Update: 2023-07-29: HSH 불필요한 /session-login url 매핑 삭제
 * Update: 2023-08-02: HSH 불필요한 Get Mapping 정보 삭제
 * */

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class LoginController {
    private final UserService userService;

    @GetMapping("/test")
    public void test(HttpServletResponse res, HttpServletRequest req) throws IOException {
        res.setContentType("text/plain");
        res.getWriter().write("ddddddddddddddd");
    }
    @PostMapping("/join")
    public void join(@RequestBody JoinRequest joinRequest, HttpServletResponse res) throws NoSuchAlgorithmException, IOException {
        //응답 메시지 설정
        System.out.println(joinRequest.getLoginId()+" "+joinRequest.getEmail()+" "+joinRequest.getPassword());
        res.setContentType("text/plain");
        res.setCharacterEncoding("UTF-8");
        // loginId 중복 체크
        if(userService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
            res.sendError(HttpServletResponse.SC_CONFLICT,"이미 사용중인 로그인 아이디 입니다.");
            return;
        }

        // DB에 저장 -> 추후 저장 위치 변경 예정
        userService.join(joinRequest);

        // 정상 응답 메시지 전송
        res.setStatus(HttpServletResponse.SC_OK);
        res.getWriter().write("회원 가입 요청이 정상적으로 처리 되었습니다.");
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest, HttpServletResponse res ) throws NoSuchAlgorithmException, IOException {
        //응답 메시지 설정
        res.setContentType("text/plain");
        res.setCharacterEncoding("UTF-8");

        // loginId로 유저 정보 조회
        User user = userService.login(loginRequest);

        if (user == null){
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED,"아이디 혹은 비밀번호가 잘못입력되었습니다.");
            return null;
        }

        String secretKey = "my-secret-key";
        long expireTimeMs = 1000 * 60 * 30; // Token 유효시간 30분
        String jwtToken = JwtTokenUtil.createToken(user.getLoginId(),secretKey,expireTimeMs);
        return jwtToken;
    }
}

