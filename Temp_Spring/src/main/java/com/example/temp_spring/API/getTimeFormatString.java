package com.example.temp_spring.API;

import java.time.LocalDateTime;
/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 현재 시간을 객체를 받아 String 형식으로 반환하는 클래스
 */
public class getTimeFormatString {
    private String Month = "";
    private String Date = "";
    private String Hour = "";
    private String Minute ="";
    public String DateFormat(LocalDateTime t){
        if(t.getMonthValue()>=10){
            Month = Integer.toString(t.getMonthValue());
        }
        else{
            Month = "0"+Integer.toString(t.getMonthValue());
        }
        Date = Integer.toString(t.getYear())+Month+Integer.toString(t.getDayOfMonth());
        return Date;
    }
    public String YearFormat(LocalDateTime t){
        return Integer.toString(t.getYear());
    }
    public String MonthFormat(LocalDateTime t){
        if(t.getMonthValue()>=10){
            Month = Integer.toString(t.getMonthValue());
        }
        else{
            Month = "0"+Integer.toString(t.getMonthValue());
        }
        return Month;
    }
    public String DayFormat(LocalDateTime t){
        return Integer.toString(t.getDayOfMonth());
    }
    public String HourFormat(LocalDateTime t){
        if(t.getHour()>=10){
            Hour = Integer.toString(t.getHour());
        }
        else{
            Hour = "0"+Integer.toString(t.getHour());
        }
        return Hour;
    }

    public String MinuteFormat(LocalDateTime t){
        if(t.getMinute()>=10){
            Minute = Integer.toString(t.getMinute());
        }
        else{
            Minute = "0"+Integer.toString(t.getMinute());
        }
        return Minute;
    }

    public String forecastDateFormat(LocalDateTime t){
        if(t.getMonthValue()>=10){
            Month = Integer.toString(t.getMonthValue());
        }
        else{
            Month = "0"+Integer.toString(t.getMonthValue());
        }
        if(t.getHour()>=10){
            Hour = Integer.toString(t.getHour())+"0"+"0";
        }
        else{
            Hour = "0"+Integer.toString(t.getHour())+"0"+"0";
        }
        Date = Integer.toString(t.getYear())+Month+Integer.toString(t.getDayOfMonth());
        return Date+Hour;
    }
    public String arduinoDataFormat(LocalDateTime t){
        if(t.getMonthValue()>=10){
            Month = Integer.toString(t.getMonthValue());
        }
        else{
            Month = "0"+Integer.toString(t.getMonthValue());
        }

        if(t.getHour()>=10){
            Hour = Integer.toString(t.getHour());
        }
        else{
            Hour = "0"+Integer.toString(t.getHour());
        }
        if(t.getMinute()>=10){
            Minute = Integer.toString(t.getMinute());
        }
        else{
            Minute = "0"+Integer.toString(t.getMinute());
        }
        return Integer.toString(t.getYear())+Month+Integer.toString(t.getDayOfMonth())+Hour+Minute;
    }
}
