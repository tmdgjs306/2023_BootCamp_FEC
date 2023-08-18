package com.example.temp_spring.Controller;
import com.example.temp_spring.API.getTimeFormatString;
import com.example.temp_spring.API.getWeather;
import com.example.temp_spring.Service.FarmIdService;
import com.example.temp_spring.Service.TempUserService;
import com.example.temp_spring.Service.TodoListService;
import com.example.temp_spring.domain.data.*;
import com.example.temp_spring.domain.user.TempUser;
import com.example.temp_spring.domain.user.User;
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

    private final FarmInformationDataRepository farmInformationDataRepository;

    private final PlantEnvironmentDataRepository plantEnvironmentDataRepository;

    JSONParser parser = new JSONParser();

    private final UserRepository userRepository;

    private final FarmIdService farmIdService;

    private  final TodoListService todoListService;

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

        //Json 데이터 파싱
        JSONObject jsonObject = (JSONObject) parser.parse(req);
        Double tempValue = (Double) jsonObject.get("temperature");
        Long illuminanceValue = (Long) jsonObject.get("illuminance");
        String timeValue = (String) jsonObject.get("time");
        String f = (String)jsonObject.get("farmId");
        Long temp = Long.parseLong(f);
        int farmId = temp.intValue();
        Double Humidity =(Double) jsonObject.get("humidity");

        // farmInformationDataRepository에 저장
        FarmInformationData data = FarmInformationData.builder()
                .farmId(farmId)
                .TemperatureValue(tempValue)
                .humidityValue(Humidity)
                .carbonDioxideValue(Math.random() * 1000)
                .illuminanceValue(illuminanceValue)
                .time(timeValue)
                .build();
        farmInformationDataRepository.save(data);
    }
    @GetMapping("/latestEnvironmentData") // 농장 번호로 조회하여 자신의 농장의 최신 온도, 조도, 습도, CO2 값 전송
    public FarmInformationData getLatestFarmInformationData(HttpServletRequest req){

        // Cookie 에서 토큰 추출
        Cookie jwtTokenCookie = Arrays.stream(req.getCookies())
                .filter(cookie -> cookie.getName().equals("jwtToken"))
                .findFirst()
                .orElse(null);

        if(jwtTokenCookie == null) {
            return null;
        }

        // 추출한 토큰을 이용하여 로그인 ID 정보 획득
        String jwtToken = jwtTokenCookie.getValue();
        String loginId = JwtTokenUtil.getLoginId(jwtToken);
        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if(optionalUser.isEmpty())
            return null;

        // loginId를 이용하여 유저 정보 획득
        User user = optionalUser.get();
        int FarmId = user.getFarmId();

        // DB 테이블을 조회하여 해당 농장에서 가장 최근에 측정된 온도 데이터 값 불러옴
        FarmInformationData farmInformationData = farmInformationDataRepository.findLatestFarmInformationData(FarmId);
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


    // 사용자 정보 반환
    @GetMapping("/userInfo")
    public void getUserInfo(HttpServletRequest req, HttpServletResponse res) throws IOException{
        //응답 헤더 설정
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        // Token 에서 loginId 정보 추출
        JSONObject jsonObject = new JSONObject();
        Cookie jwtTokenCookie = Arrays.stream(req.getCookies())
                .filter(cookie -> cookie.getName().equals("jwtToken"))
                .findFirst()
                .orElse(null);

        if(jwtTokenCookie == null) {
            return;
        }
        String jwtToken = jwtTokenCookie.getValue();
        String loginId = JwtTokenUtil.getLoginId(jwtToken);

        // loginId로 유저 조회
        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if(optionalUser.isEmpty())
            return;
        User user = optionalUser.get();

        // 유저 정보 전송
        jsonObject.put("loginId",user.getLoginId());
        jsonObject.put("email",user.getEmail());
        jsonObject.put("farmId",user.getFarmId());
        res.getWriter().write(jsonObject.toJSONString());
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
    public void getTempUser(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        List<TempUser> list = new ArrayList<>();
        list = tempUserService.getAllTempUser();
        JSONArray jsonArray = new JSONArray();
        for(int i=0; i<list.size(); i++){
            JSONObject jsonObject = new JSONObject();
            TempUser tempUser = list.get(i);
            jsonObject.put("index",i+1);
            jsonObject.put("loginId",tempUser.getLoginId());
            jsonObject.put("email",tempUser.getEmail());
            jsonObject.put("password",tempUser.getPassword());
            jsonArray.add(jsonObject);
        }
        res.getWriter().write(jsonArray.toJSONString());
    }


    // 식물 환경 정보 반환
    @GetMapping("/getPlantEnvironmentData")
    public void getPlantEnvironmentData(HttpServletRequest req, HttpServletResponse res) throws IOException{
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        List<PlantEnvironmentData> list = new ArrayList<>();
        list = plantEnvironmentDataRepository.getAllPlantEnvironmentData();
        JSONArray jsonArray = new JSONArray();
        for(int i=0; i<list.size(); i++){
            JSONObject jsonObject = new JSONObject();
            PlantEnvironmentData plantEnvironmentData = list.get(i);
            jsonObject.put("index",i+1);
            jsonObject.put("name",plantEnvironmentData.getName());
            jsonObject.put("minTemperature",plantEnvironmentData.getMinTemperature());
            jsonObject.put("maxTemperature",plantEnvironmentData.getMaxTemperature());
            jsonObject.put("minHumidity",plantEnvironmentData.getMinHumidity());
            jsonObject.put("maxHumidity",plantEnvironmentData.getMaxHumidity());
            jsonObject.put("illuminance",plantEnvironmentData.getIlluminance());
            jsonObject.put("carbonDioxide",plantEnvironmentData.getCarbonDioxide());
            jsonArray.add(jsonObject);
        }
        res.getWriter().write(jsonArray.toJSONString());
    }

    // Todo-List 반환
    @GetMapping("/getTodoData")
    public void getTodoData(HttpServletResponse res, HttpServletRequest req) throws IOException {
        // 헤더 설정정보
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        //쿠키에서 토큰 정보 추출
        Cookie jwtTokenCookie = Arrays.stream(req.getCookies())
                .filter(cookie -> cookie.getName().equals("jwtToken"))
                .findFirst()
                .orElse(null);

        if(jwtTokenCookie == null) {
            return;
        }

        // 추출한 토큰을 이용하여 로그인 ID 정보 획득
        String jwtToken = jwtTokenCookie.getValue();
        String loginId = JwtTokenUtil.getLoginId(jwtToken);

        // todolist Json Array 형식으로 반환
        List<TodoListData> list = new ArrayList<>();
        list = todoListService.getTodoListByLoginId(loginId);
        JSONArray jsonArray = new JSONArray();
        for(int i=0; i<list.size(); i++){
            JSONObject jsonObject = new JSONObject();
            TodoListData todoListData = list.get(i);
            jsonObject.put("index",i+1);
            jsonObject.put("loginId",todoListData.getLoginId());
            jsonObject.put("plantName",todoListData.getPlantName());
            jsonObject.put("time",todoListData.getTime());
            jsonObject.put("todo",todoListData.getTodo());
            jsonArray.add(jsonObject);
        }
        res.getWriter().write(jsonArray.toJSONString());
    }

    // Todo-List 저장
    @PostMapping("/addTodoData")
    public void addTodoData(@RequestBody String req, HttpServletResponse res, HttpServletRequest request) throws ParseException {
        // 헤더 설정
        res.setContentType("text/plain");
        res.setCharacterEncoding("UTF-8");

        // cookie에서 토큰 추출
        Cookie jwtTokenCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("jwtToken"))
                .findFirst()
                .orElse(null);

        if(jwtTokenCookie == null) {
            return;
        }

        // 추출한 토큰을 이용하여 로그인 ID 정보 획득
        String jwtToken = jwtTokenCookie.getValue();
        String loginId = JwtTokenUtil.getLoginId(jwtToken);


        JSONObject jsonObject = (JSONObject) parser.parse(req);

        String time = (String) jsonObject.get("time");
        String plantName = (String) jsonObject.get("plantName");
        String todo = (String) jsonObject.get("todo");

        TodoListData todoListData = TodoListData.builder()
                .loginId(loginId)
                .plantName(plantName)
                .time(time)
                .todo(todo)
                .build();
        todoListService.add(todoListData);
    }
}
