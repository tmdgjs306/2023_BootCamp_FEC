package com.example.temp_spring.Controller;

import com.example.temp_spring.Service.TempUserService;
import com.example.temp_spring.domain.dto.JoinRequest;
import com.example.temp_spring.domain.dto.LoginRequest;
import com.example.temp_spring.Service.UserService;
import com.example.temp_spring.domain.dto.TempUserJoinRequest;
import com.example.temp_spring.domain.user.TempUser;
import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

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
    private final TempUserService tempUserService;
    @PostMapping("/join")
    public void join(@RequestBody TempUserJoinRequest tempUserJoinRequest, HttpServletResponse res) throws NoSuchAlgorithmException, IOException {
        System.out.println(tempUserJoinRequest.getLoginId()+" "+tempUserJoinRequest.getEmail()+" "+tempUserJoinRequest.getPassword());
        //응답 메시지 설정
        res.setContentType("text/plain");
        res.setCharacterEncoding("UTF-8");
        // loginId 중복 체크 -> 중복된 ID일 경우 409 에러 메시지 전송
        if(userService.checkLoginIdDuplicate(tempUserJoinRequest.getLoginId())) {
            res.sendError(HttpServletResponse.SC_CONFLICT,"이미 사용중인 로그인 아이디 입니다.");
            return;
        }

        // 임시 유저 DB에 저장 -> 추후 Admin 유저가 승인시 UserDB에 회원 정보 저장
        tempUserService.join(tempUserJoinRequest);

        // 정상 응답 메시지 전송
        res.setStatus(HttpServletResponse.SC_OK);
        res.getWriter().write("회원 가입 요청이 정상적으로 처리 되었습니다.");
    }

    @PostMapping("/login")
    public void login(@RequestBody LoginRequest loginRequest, HttpServletResponse res ) throws NoSuchAlgorithmException, IOException {
        //응답 메시지 설정
        res.setContentType("text/plain");
        res.setCharacterEncoding("UTF-8");
        System.out.println(loginRequest.getLoginId()+" "+loginRequest.getPassword());
        // loginId로 유저 정보 조회
        User user = userService.login(loginRequest);

        if (user == null){
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED,"아이디 혹은 비밀번호가 잘못입력되었습니다.");
            return;
        }

        String secretKey = "asnlwEysd15BsYt9V7zq571GejMnGUNNFE3408f12MGVA9XkHa";
        long expireTimeMs = 1000 * 60 * 30; // Token 유효시간 30분

        //토큰 생성
        String jwtToken = JwtTokenUtil.createToken(user.getLoginId(),secretKey,expireTimeMs);
        Cookie cookie = new Cookie("jwtToken", jwtToken);
        cookie.setSecure(true); // 보안 설정
        cookie.setHttpOnly(true); // 보안 설정
        cookie.setPath("/");
        cookie.setMaxAge(30*60); // 쿠키 시간 설정
        res.addCookie(cookie); // 쿠키에 값 추가
    }

    @GetMapping("log-out") // 로그 아웃 기능 -> 쿠키에서 Token 값 삭제
    public void l(HttpServletResponse res){
        Cookie c = new Cookie("jwtToken",null);
        c.setMaxAge(0);
        res.addCookie(c);
    }
    @PostMapping("/acceptUser") // 유저 승인 기능
    public void acceptUser(@RequestBody JoinRequest joinRequest, HttpServletResponse res) throws NoSuchAlgorithmException, IOException {
        //응답 메시지 설정
        res.setContentType("text/plain");
        res.setCharacterEncoding("UTF-8");

        //UserDB에 저장, tempUser DB 에서 정보 삭제
        userService.join(joinRequest);
        tempUserService.delete(joinRequest.getLoginId());

        res.setStatus(HttpServletResponse.SC_OK);
        res.getWriter().write(joinRequest.getLoginId()+" 유저가 정상적으로 승인 되었습니다.");
    }
    @PostMapping("rejectUser")
    public void rejectUser(@RequestBody JoinRequest joinRequest, HttpServletResponse res) throws NoSuchAlgorithmException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        tempUserService.delete(joinRequest.getLoginId());
        res.sendRedirect("/getTempUser");
    }
}

