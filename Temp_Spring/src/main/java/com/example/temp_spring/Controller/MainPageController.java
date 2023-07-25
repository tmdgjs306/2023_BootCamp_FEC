package com.example.temp_spring.Controller;


import com.example.temp_spring.DTO.UserService;
import com.example.temp_spring.User.User;
import com.example.temp_spring.User.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Controller
@RequiredArgsConstructor
@RequestMapping("/session-login")
public class MainPageController {
    private final UserService userService;
    @GetMapping("/info")
    public String userInfo(@SessionAttribute(name = "userId", required = false) Long userId, Model model) {
        model.addAttribute("loginType", "session-login");
        model.addAttribute("pageName", "세션 로그인");

        User loginUser = userService.getLoginUserById(userId);

        if(loginUser == null) {
            return "redirect:/session-login/login";
        }

        model.addAttribute("user", loginUser);
        return "info";
    }

    @GetMapping("/admin")
    public String adminPage(@SessionAttribute(name = "userId", required = false) Long userId, Model model) {
        model.addAttribute("loginType", "session-login");
        model.addAttribute("pageName", "세션 로그인");

        User loginUser = userService.getLoginUserById(userId);

        if(loginUser == null) {
            return "redirect:/session-login/login";
        }

        if(!loginUser.getRole().equals(UserRole.ADMIN)) {
            return "redirect:/session-login";
        }

        return "admin";
    }
    @GetMapping("/mainData")
    public String mainDataPage(@SessionAttribute(name = "userId", required = false) Long userId, Model model){
        model.addAttribute("loginType", "session-login");
        model.addAttribute("pageName", "세션 로그인");
        User loginUser = userService.getLoginUserById(userId);

        if(loginUser == null) {
            return "redirect:/session-login/login";
        }

        return "mainData";
    }

    @GetMapping("/ledOn")
    public String ledOn(@SessionAttribute(name = "userId", required = false) Long userId, Model model) throws IOException {
        model.addAttribute("loginType", "session-login");
        model.addAttribute("pageName", "세션 로그인");
        User loginUser = userService.getLoginUserById(userId);

        if (loginUser == null) {
            return "redirect:/session-login";
        }
        if (!loginUser.getRole().equals(UserRole.ADMIN)) {
            return "redirect:/session-login";
        }
        String Url = "http://165.246.116.221:80/red_led_on";
        URL controlURL = new URL(Url);
        HttpURLConnection conn = (HttpURLConnection) controlURL.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "text/plain");
        System.out.println("Response code: "+conn.getResponseCode());
        if(conn.getResponseCode() ==200){
            System.out.println("LED 제어 성공!");
        }

        conn.disconnect();
        return "admin";
    }
    @GetMapping("/ledOff")
    public String ledOff(@SessionAttribute(name = "userId", required = false) Long userId, Model model) throws IOException {
        model.addAttribute("loginType", "session-login");
        model.addAttribute("pageName", "세션 로그인");
        User loginUser = userService.getLoginUserById(userId);

        if (loginUser == null) {
            return "redirect:/session-login/login";
        }
        if (!loginUser.getRole().equals(UserRole.ADMIN)) {
            return "redirect:/session-login/login";
        }
        String Url = "http://165.246.116.221:80/red_led_off";
        URL controlURL = new URL(Url);
        HttpURLConnection conn = (HttpURLConnection) controlURL.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "text/plain");
        System.out.println("Response code: "+conn.getResponseCode());
        if(conn.getResponseCode() ==200){
            System.out.println("LED ");
        }
        conn.disconnect();
        return "admin";
    }
}
