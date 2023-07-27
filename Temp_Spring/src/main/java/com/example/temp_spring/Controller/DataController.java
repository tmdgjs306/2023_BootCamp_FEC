package com.example.temp_spring.Controller;
import com.example.temp_spring.API.getTimeFormatString;
import com.example.temp_spring.API.getWeather;
import com.example.temp_spring.DTO.ProductDataRequest;
import com.example.temp_spring.DTO.illuminanceDataRequest;
import com.example.temp_spring.DTO.TemperatureDataRequest;
import com.example.temp_spring.Data.*;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;


@RestController
@RequiredArgsConstructor
@RequestMapping("/session-login")
public class DataController {
    private final TemperatureDataRepository temperatureDataRepository;
    private final illuminanceDataRepository photoDataRepository;
    private final ProductDataRepository countDataRepository;
    JSONParser parser = new JSONParser();
    @PostMapping("/addData")
    public void addData(@RequestBody String req) throws ParseException {
        JSONObject jsonObject = (JSONObject) parser.parse(req);
        Double tempValue = (Double) jsonObject.get("temperature");
        Long photoValue = (Long) jsonObject.get("illuminance");
        Long countValue = (Long) jsonObject.get("product");
        String timeValue = (String) jsonObject.get("time");
        temperatureDataRepository.save(new TemperatureDataRequest().toEntity(tempValue));
        photoDataRepository.save(new illuminanceDataRequest().toEntity(photoValue));
        countDataRepository.save(new ProductDataRequest().toEntity(countValue));
    }

    @GetMapping("/latestTemperatureData")
    public TemperatureData getLatestTemperatureData() {
        TemperatureData temperatureData = temperatureDataRepository.findLatestTemperatureDataData();
        return temperatureData;
    }

    @GetMapping("/latestPhotoData")
    public illuminanceData getLatestPhotoData(){
        illuminanceData photoData = photoDataRepository.findLatestPhotoData();
        return photoData;
    }
    @GetMapping("/latestCountData")
    public ProductData getLatestCountData(){
        ProductData countData = countDataRepository.findLatestCountData();
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
}
