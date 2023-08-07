package com.example.Controller;


import com.example.temp_spring.Service.UserService;
import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.domain.user.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;


/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 관리자 페이지, 사용자 정보 페이지, 센서 데이터 모니터링 페이지, led 제어 페이지 등
 *              다양한 기능을 제공하는 페이지들을 매핑 해주는 Controller
 * Mapping Info (별도 Method 미 작성 시 Get Mapping)
 * [/info] : "info.html" 반환 -> 사용자 정보 페이지 (로그인 여부 확인 로직 존재 )
 * [/admin] : "admin.html" 반환 -> 관리자 기능 페이지 (로그인 여부 확인, 사용자 권한 확인 로직 존재)
 * [/mainData]: "mainData,html" 반환 -> 데이터 실시간 모니터링 페이지 (로그인 여부 확인 로직 존재)
 * [/ledOn] : Device 웹서버를 통해  Red led On 명령을 내림
 * [/ledOff] : Device 웹서버를 통해 Red led Off 명령을 내림
 *
 * Notion : 이 컨트롤러는 더 사용하지 않을 예졍임 추후 필요한 /ledOn, ledOff 기능 추출을 위해 남겨둠
 * */

@Controller
@RequiredArgsConstructor
@RequestMapping("/")
public class MainPageController {
    private final UserService userService;
    private final String DeviceIP ="165.246.116.221:80";

    @GetMapping("/ledOn")
    public String ledOn(Model model, Authentication auth) throws IOException {
        model.addAttribute("pageName", "스마트 팜 모니터링 시스템");
        //region Device WebServer Connect
        String Url = "http://"+DeviceIP+"/red_led_on";
        URL controlURL = new URL(Url);
        HttpURLConnection conn = (HttpURLConnection) controlURL.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "text/plain");
        System.out.println("Response code: "+conn.getResponseCode());
        if(conn.getResponseCode() ==200){
            System.out.println("LED 제어 성공!");
        }
        conn.disconnect();
        //endregion
        return "admin";
    }
    @GetMapping("/ledOff")
    public String ledOff(Model model, Authentication auth) throws IOException {
        model.addAttribute("pageName", "스마트 팜 모니터링 시스템");
        //region Device WebServer Connect
        String Url = "http://"+DeviceIP+"/red_led_off";
        URL controlURL = new URL(Url);
        HttpURLConnection conn = (HttpURLConnection) controlURL.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "text/plain");
        System.out.println("Response code: "+conn.getResponseCode());
        if(conn.getResponseCode() ==200){
            System.out.println("LED ");
        }
        conn.disconnect();
        //endregion
        return "admin";
    }
}
