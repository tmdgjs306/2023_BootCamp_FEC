package com.example.temp_spring.Controller;
import com.example.temp_spring.API.getTimeFormatString;
import com.example.temp_spring.API.getWeather;
import com.example.temp_spring.domain.dto.ProductDataRequest;
import com.example.temp_spring.domain.dto.illuminanceDataRequest;
import com.example.temp_spring.domain.dto.TemperatureDataRequest;
import com.example.temp_spring.domain.data.*;
import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.jwt.JwtTokenUtil;
import com.example.temp_spring.repository.ProductDataRepository;
import com.example.temp_spring.repository.TemperatureDataRepository;
import com.example.temp_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;


/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: Device 에서 오는 센서 데이터들을 DB에 저장 되도록 하고
 *              Device 에서 요청하는 정보들을 매핑하는 Controller
 * Mapping Info (별도 Method 미 작성 시 Get Mapping)
 * [/addData (Post)] : Device에서 전송되는 Sensor 데이터를 DB에 저장하는 역할
 * [/latestTemperatureData] : TemperatureDataRepository  조회 가장 최근에 측정된 온도 정보를 반환
 * [/latestPhotoData]: illuminanceDataRepository 조회 가장 최근에 측정된 조도 정보를 반환
 * [/latestCountData]: ProductDataRepository 조회 가장 최근에 측정된 초음파 센서를 지나간 물체의 갯수를 반환
 * [/getWeather] : 기상청 API에 접속하여 기상 예보 정보를 반환
 * [/getTime] : Device에게 현재 시간 정보를 JSON 형식으로 반환
 *
 * Notion : 현재 DB 교체 작업 진행중
 * */

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class DataController {
    private final TemperatureDataRepository temperatureDataRepository;
    private final com.example.temp_spring.repository.illuminanceDataRepository illuminanceDataRepository;
    private final ProductDataRepository productDataRepository;
    JSONParser parser = new JSONParser();

    private final UserRepository userRepository;
    @PostMapping("/addData")
    public void addData(@RequestBody String req) throws ParseException {
        JSONObject jsonObject = (JSONObject) parser.parse(req);
        Double tempValue = (Double) jsonObject.get("temperature");
        Long photoValue = (Long) jsonObject.get("illuminance");
        Long countValue = (Long) jsonObject.get("product");
        String timeValue = (String) jsonObject.get("time");
        temperatureDataRepository.save(new TemperatureDataRequest().toEntity(tempValue,timeValue));
        illuminanceDataRepository.save(new illuminanceDataRequest().toEntity(photoValue,timeValue));
        productDataRepository.save(new ProductDataRequest().toEntity(countValue,timeValue));
    }

    @GetMapping("/latestTemperatureData")
    public TemperatureData getLatestTemperatureData() {
        TemperatureData temperatureData = temperatureDataRepository.findLatestTemperatureDataData();
        return temperatureData;
    }

    @GetMapping("/latestPhotoData")
    public illuminanceData getLatestPhotoData(){
        illuminanceData photoData = illuminanceDataRepository.findLatestPhotoData();
        return photoData;
    }
    @GetMapping("/latestCountData")
    public ProductData getLatestCountData(){
        ProductData countData = productDataRepository.findLatestCountData();
        return countData;
    }

    @GetMapping("/getWeather")
    public String getWeatherData() throws IOException {
        getWeather a1 = new getWeather();
        String result = a1.get();
        return result;
    }
    @GetMapping("/getTime")
    public void getTimeData(HttpServletRequest req, HttpServletResponse res) throws IOException{
        LocalDateTime t = LocalDateTime.now();
        getTimeFormatString s = new getTimeFormatString();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("year",s.YearFormat(t));
        jsonObject.put("month",s.MonthFormat(t));
        jsonObject.put("day",s.DayFormat(t));
        jsonObject.put("hour",s.HourFormat(t));
        jsonObject.put("minute",s.MinuteFormat(t));
        res.setContentType("application/json");
        res.getWriter().write(jsonObject.toJSONString());
    }

    @GetMapping("/userInfo")
    public void getUserInfo(HttpServletRequest req, HttpServletResponse res) throws IOException{
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        JSONObject jsonObject = new JSONObject();
        Cookie jwtTokenCookie = Arrays.stream(req.getCookies())
                .filter(cookie -> cookie.getName().equals("jwtToken"))
                .findFirst()
                .orElse(null);

        if(jwtTokenCookie == null) {
            return;
        }
        // 쿠키 Jwt Token이 있다면 이 토큰으로 인증, 인가 진행
        String jwtToken = jwtTokenCookie.getValue();
        String loginId = JwtTokenUtil.getLoginId(jwtToken);
        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if(optionalUser.isEmpty())
            return;
        User user = optionalUser.get();
        jsonObject.put("loginId",user.getLoginId());
        jsonObject.put("email",user.getEmail());
        res.getWriter().write(jsonObject.toJSONString());
    }

    @GetMapping("/admin")
    public void getAdminInfo(HttpServletRequest req, HttpServletResponse res) throws IOException{
        res.setContentType("text/plain");
        res.setCharacterEncoding("UTF-8");
        res.getWriter().write("관리자 정보 ");
    }
}
