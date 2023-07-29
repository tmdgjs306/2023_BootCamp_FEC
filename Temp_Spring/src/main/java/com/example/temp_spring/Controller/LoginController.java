package com.example.temp_spring.Controller;

import com.example.temp_spring.domain.dto.JoinRequest;
import com.example.temp_spring.domain.dto.LoginRequest;
import com.example.temp_spring.Service.UserService;
import com.example.temp_spring.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 로그인 기능을 제공하는 Controller
 * Mapping Info (별도 Method 미 작성 시 Get Mapping)
 * [/] : "home.html" 반환 -> index 페이지
 * [/join] : "join.html" 반환 -> 회원 가입 페이지
 * [/join post]: 사용자로 부터 입력받은 회원 가입 정보 처리 로직(아이디 중복 검증, password 검증)
 * [/login] : "login.html" 반환 -> 로그인 페이지, Spring Security 통해 처리
 * Update: 2023-07-28: HSH Spring Security 적용, 유저 권한 관리 자동화
 * Update: 2023-07-29: HSH 불필요한 /session-login url 매핑 삭제
 * */

@Controller
@RequiredArgsConstructor
@RequestMapping("")
public class LoginController {
    private final UserService userService;

    // /root로 접속했을때 호출 되는 핸들러 "index 페이지 반환"
    @GetMapping(value = {"", "/"})
    public String home(Model model, Authentication auth) {
        model.addAttribute("pageName", "스마트 팜 관리 시스템");

        // 로그인한 유저 인지 확인
        if(auth !=null){
            // 로그인한 유저 라면 user 이름 정보를 가져와 출력한다.
            User loginUser = userService.getLoginUserByLoginId(auth.getName());
            if(loginUser != null){
                model.addAttribute("nickname",loginUser.getName());
            }
        }

        return "home";
    }

    @GetMapping("/join")
    public String joinPage(Model model) {
        model.addAttribute("pageName", "스마트 팜 관리 시스템");
        model.addAttribute("joinRequest", new JoinRequest());
        return "join";
    }

    @PostMapping("/join")
    public String join(@Valid @ModelAttribute JoinRequest joinRequest, BindingResult bindingResult, Model model) throws NoSuchAlgorithmException {
        model.addAttribute("pageName", "스마트 팜 관리 시스템");

        // loginId 중복 체크
        if(userService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
            bindingResult.addError(new FieldError("joinRequest", "loginId", "로그인 아이디가 중복됩니다."));
        }

        // 닉네임 중복 체크
        /*if(userService.checkNicknameDuplicate(joinRequest.getNickname())) {
            bindingResult.addError(new FieldError("joinRequest", "nickname", "닉네임이 중복됩니다."));
        }*/

        // password와 passwordCheck가 같은지 체크
        if(!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            bindingResult.addError(new FieldError("joinRequest", "passwordCheck", "비밀번호가 일치하지 않습니다."));
        }

        // 검증 로직을 통과 하지 못하면 다시 /Join 리다이렉션
        if(bindingResult.hasErrors()) {
            return "join";
        }

        userService.join(joinRequest);
        return "redirect:/";
    }

    /**
     * 로그인 처리 부분 현재는 Spring Security 에서 가로채 처리 하기 떄문에
     * 별도의 추가 코드가 필요 없다.
     * */
    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("pageName", "스마트 팜 관리 시스템");
        model.addAttribute("loginRequest", new LoginRequest());
        return "login";
    }


    /* Spring Security 적용 이전 코드
     *  현재는 Spring Security 에서 알아서 처리 해주기 떄문에 더이상 필요 없는 부분이다.
    @PostMapping("/login")
    public String login(@ModelAttribute LoginRequest loginRequest, BindingResult bindingResult,
                        HttpServletRequest httpServletRequest, Model model) throws NoSuchAlgorithmException {
        model.addAttribute("loginType", "session-login");
        model.addAttribute("pageName", "세션 로그인");

        User user = userService.login(loginRequest);

        // 로그인 아이디나 비밀번호가 틀린 경우 global error return
        if(user == null) {
            bindingResult.reject("loginFail", "로그인 아이디 또는 비밀번호가 틀렸습니다.");
        }

        if(bindingResult.hasErrors()) {
            return "login";
        }

        // 로그인 성공 => 세션 생성

        // 세션을 생성하기 전에 기존의 세션 파기
        httpServletRequest.getSession().invalidate();
        HttpSession session = httpServletRequest.getSession(true);  // Session이 없으면 생성
        // 세션에 userId를 넣어줌
        session.setAttribute("userId", user.getId());
        session.setMaxInactiveInterval(1800); // Session이 30분동안 유지

        return "redirect:/session-login";
    }*/

    /* Spring Security 적용 이전 코드
     *  현재는 Spring Security 에서 알아서 처리 해주기 떄문에 더이상 필요 없는 부분이다.
    /*@GetMapping("/logout")
    public String logout(HttpServletRequest request, Model model) {
        model.addAttribute("loginType", "session-login");
        model.addAttribute("pageName", "세션 로그인");

        HttpSession session = request.getSession(false);  // Session이 없으면 null return
        if(session != null) {
            session.invalidate();
        }
        return "redirect:/session-login";
    }*/
}

