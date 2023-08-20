package com.example.temp_spring.Controller;
import com.example.temp_spring.API.getTimeFormatString;
import com.example.temp_spring.API.getWeather;
import com.example.temp_spring.Service.*;
import com.example.temp_spring.domain.data.*;
import com.example.temp_spring.domain.user.TempUser;
import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.jwt.CookieParser;
import com.example.temp_spring.jwt.JwtTokenUtil;
import com.example.temp_spring.repository.*;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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

    private final TempUserService tempUserService;
    private final UserService userService;
    private final FarmInformationDataService farmInformationDataService;
    private final getTimeFormatString timeFormatString = new getTimeFormatString();
    private final CookieParser cookieParser;
    private final PlantEnvironmentDataService plantEnvironmentDataService;
    private final JSONParser parser = new JSONParser();
    private final FarmIdService farmIdService;
    private  final TodoListService todoListService;
    private final FarmAvgService farmAvgService;

    @GetMapping("/getFarmId")
    public void getFarmId(HttpServletResponse res) throws IOException {
        // FarmId 생성
        String farmId = farmIdService.getFarmId();

        // Json 양식으로 아두이노 서버에 응답
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.getWriter().write(farmId);
    }

    // 아두이노 장치에서 받은 데이터 DB에 저장
    @PostMapping("/addData")
    public void addData(@RequestBody String req) throws ParseException {
        farmInformationDataService.add(req);
    }

    @GetMapping("/latestEnvironmentData") // 농장 번호로 조회하여 자신의 농장의 최신 온도, 조도, 습도, CO2 값 전송
    public FarmInformationData getLatestFarmInformationData(HttpServletRequest req){

        // JWT Token 을 조회하여 LoginID 획득
        String loginId = cookieParser.parseCookie(req);

        //farmId 조회
        int farmId = userService.getFarmIdByLoginId(loginId);

        // DB 테이블을 조회하여 해당 농장에서 가장 최근에 측정된 온도 데이터 값 불러옴
        FarmInformationData farmInformationData = farmInformationDataService.findLatestFarmInformationData(farmId);
        return farmInformationData;
    }

    // 외부 온도 정보 반환
    @GetMapping("/getWeather")
    public String getWeatherData() throws IOException {
        getWeather a1 = new getWeather();
        String result = a1.get();
        return result;
    }

    // 아두이노쪽 요청 처리 로직 -> 현재 시간 반환
    @GetMapping("/getTime")
    public void getTimeData(HttpServletResponse res) throws IOException{
        //현재 시간 정보 획득
        LocalDateTime localDateTime = LocalDateTime.now();

        //아두이노 에서 사용할 형식으로 변환
        String arduinoDateFormat = timeFormatString.arduinoDataFormat(localDateTime);

        //아두이노 장치에 응답
        res.setContentType("application/json");
        res.getWriter().write(arduinoDateFormat);
    }

    // 사용자 정보 반환
    @GetMapping("/userInfo")
    public void getUserInfo(HttpServletRequest req, HttpServletResponse res) throws IOException{
        //응답 헤더 설정
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        // Token 에서 loginId 정보 추출
        String loginId = cookieParser.parseCookie(req);

        // loginId로 유저 조회
        String userInfo= userService.getUserInfo(loginId);

        // 유저 정보 전송
        res.getWriter().write(userInfo);
    }

    //관리자 기능 테스트
    @GetMapping("/admin")
    public void getAdminInfo(HttpServletRequest req, HttpServletResponse res) throws IOException{
        res.setContentType("text/plain");
        res.setCharacterEncoding("UTF-8");
        res.getWriter().write("관리자 정보 ");
    }

    // 임시 유저 리스트 반환
    @GetMapping("/getTempUser")
    public void getTempUser(HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        String tempUserList = tempUserService.getAllTempUser();
        res.getWriter().write(tempUserList);
    }

    // 식물 환경 정보 반환
    @GetMapping("/getPlantEnvironmentData")
    public void getPlantEnvironmentData(HttpServletRequest req, HttpServletResponse res) throws IOException{
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        String allPlantEnvironmentData = plantEnvironmentDataService.getAllPlantEnvironmentData();
        res.getWriter().write(allPlantEnvironmentData);
    }

    // Todo-List 반환
    @GetMapping("/getTodoData")
    public void getTodoData(HttpServletResponse res, HttpServletRequest req) throws IOException {
        // 헤더 설정정보
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        //쿠키에서 토큰 정보 추출
        String loginId = cookieParser.parseCookie(req);
        // todolist Json Array 형식으로 반환
        String todoList = todoListService.getTodoListByLoginId(loginId);

        res.getWriter().write(todoList);
    }

    // Todo-List 저장
    @PostMapping("/addTodoData")
    public void addTodoData(@RequestBody String data, HttpServletResponse res, HttpServletRequest request) throws ParseException {
        // 헤더 설정
        res.setContentType("text/plain");
        res.setCharacterEncoding("UTF-8");

        //todoData Repository에 값 저장
        String loginId = cookieParser.parseCookie(request);
        todoListService.add(data,loginId);
    }
    @GetMapping("/getAvgData")
    public void getAvgHourData(HttpServletRequest req, HttpServletResponse res, @RequestBody String data) throws ParseException, IOException {
        // 헤더 설정정보
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        //쿠키에서 토큰 정보 추출
        String loginId = cookieParser.parseCookie(req);
        int farmId = userService.getFarmIdByLoginId(loginId);

        // 입력 파라미터에서 Time 값 추출 후 시간 계산
        JSONObject jsonObject = (JSONObject) parser.parse(data);
        String hour = (String) jsonObject.get("hour");
        String formattedStartTime = timeFormatString.avgTimeFormat(Integer.parseInt(hour));

        // 입력받은 시간 기준으로 평균값 계산
        Double avgTemperature = farmAvgService.getAvgTemperatureValue(farmId,formattedStartTime);
        Double avgHumidity = farmAvgService.getAvgHumidityValue(farmId,formattedStartTime);
        Double avgCarbonDioxide = farmAvgService.getAvgCarbonDioxideValue(farmId,formattedStartTime);

        // JSON 형식으로 계산한 통계 값 전송
        JSONObject avgJson  = new JSONObject();
        avgJson.put("Temperature",avgTemperature);
        avgJson.put("Humidity",avgHumidity);
        avgJson.put("CarbonDioxide",avgCarbonDioxide);

        res.getWriter().write(avgJson.toJSONString());
    }
}
