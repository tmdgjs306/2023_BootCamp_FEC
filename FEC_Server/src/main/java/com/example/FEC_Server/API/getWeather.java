package com.example.FEC_Server.API;

import org.json.simple.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilderFactory;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: 기상청 API에서 날씨 정보를 받아와 String 형태로 반환하는 클래스
 */
public class getWeather
{
    // [in] x, y : 예보지점 X, Y 좌표
    //=> 행정구역별 x,y 값은 참고문서(https://www.data.go.kr/data/15084084/openapi.do) 내려받아 확인
    // [out] v[0]=예보날짜(yyyyMMdd), v[1]=예보시간(HHmm), v[2]=날씨, v[3]=기온(℃), v[4]=습도(%)
    // 반환값 : 에러메시지, null == OK
    public String get()
    {
        HttpURLConnection con = null;
        String s = null; // 에러 메시지
        int x = 55;
        int y = 127;
        String [] v = new String[10];
        try
        {
            LocalDateTime t = LocalDateTime.now();
            getTimeFormatString timeFormat = new getTimeFormatString();
            String Date = timeFormat.DateFormat(t);
            String Hour = timeFormat.HourFormat(t);
            if(t.equals("0"))Hour = "24";
            else Hour = Integer.toString(Integer.parseInt(Hour)-1);
            if(Integer.parseInt(Hour)<=9){
                Hour  ="0"+Hour;
            }
            URL url = new URL(
                    "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?"
                            + "serviceKey=n2NMYt0rWusbUZp9FjIEqrnTPs5zY22beubl2pGnkilwf5SHv84PmYVeLeFwtSpsHxlEsYem1kj%2BnYftRClKAQ%3D%3D" // 서비스키
                            //	+ "&pageNo=1" // 페이지번호 Default: 1
                            + "&numOfRows=1000" // 한 페이지 결과 수 (10개 카테고리값 * 6시간)
                            //	+ "&dataType=XML" // 요청자료형식(XML/JSON) Default: XML
                            + "&base_date=" + Date // 발표 날짜
                            + "&base_time=" + Hour+"0"+"0" // 발표 시각
                            + "&nx=" + x // 예보지점의 X 좌표값
                            + "&ny=" + y // 예보지점의 Y 좌표값
            );
            con = (HttpURLConnection)url.openConnection();
            Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(con.getInputStream());

            boolean ok = false; // <resultCode>00</resultCode> 획득 여부

            Element e;
            NodeList ns = doc.getElementsByTagName("header");
            if (ns.getLength() > 0)
            {
                e = (Element)ns.item(0);
                if ("00".equals(e.getElementsByTagName("resultCode").item(0).getTextContent()))
                    ok = true; // 성공 여부
                else // 에러 메시지
                    s = e.getElementsByTagName("resultMsg").item(0).getTextContent();
            }

            if (ok)
            {
                String fd = null, ft = null; // 가장 빠른 예보 시각
                String pty = null; // 강수형태
                String sky = null; // 하늘상태
                String cat; // category
                String val; // fcstValue

                ns = doc.getElementsByTagName("item");
                for (int i = 0; i < ns.getLength(); i++)
                {
                    e = (Element)ns.item(i);

                    if (ft == null)
                    { // 가져올 예보 시간 결정
                        fd = e.getElementsByTagName("fcstDate").item(0).getTextContent(); // 예보 날짜
                        ft = e.getElementsByTagName("fcstTime").item(0).getTextContent(); // 예보 시각
                    }
                    else if (!fd.equals(e.getElementsByTagName("fcstDate").item(0).getTextContent()) ||
                            !ft.equals(e.getElementsByTagName("fcstTime").item(0).getTextContent()))
                        continue; // 결정된 예보 시각과 같은 시각의 것만 취한다.

                    cat = e.getElementsByTagName("category").item(0).getTextContent(); // 자료구분코드
                    val = e.getElementsByTagName("fcstValue").item(0).getTextContent(); // 예보 값

                    if ("PTY".equals(cat)) pty = val; // 강수형태
                    else if ("SKY".equals(cat)) sky = val; // 하늘상태
                    else if ("T1H".equals(cat)) v[3] = val; // 기온
                    else if ("REH".equals(cat)) v[4] = val; // 습도
                }

                v[0] = fd;
                v[1] = ft;

                if ("0".equals(pty))
                { // 강수형태 없으면, 하늘상태로 판단
                    if ("1".equals(sky)) v[2] = "sunny";
                    else if ("3".equals(sky)) v[2] = "cloudy";
                    else if ("4".equals(sky)) v[2] = "cloudy";
                }
                else if ("1".equals(pty)) v[2] = "rainy";
                else if ("2".equals(pty)) v[2] = "rainy";
                else if ("3".equals(pty)) v[2] = "snowy";
                else if ("5".equals(pty)) v[2] = "rainy";
                else if ("6".equals(pty)) v[2] = "snowy";
                else if ("7".equals(pty)) v[2] = "snowy";
            }
        }
        catch (Exception e)
        {
            s = e.getMessage();
        }

        if (con != null)
            con.disconnect();

        StringBuilder sb = new StringBuilder();
        JSONObject jsonObject = new JSONObject();
        if (s == null)
        { // ok!
            jsonObject.put("temperatureValue",v[3]);
            jsonObject.put("humidityValue",v[4]);
            jsonObject.put("weatherStatus",v[2]);
            sb.append("날씨 : " + v[2]+" ").append("기온 : " + v[3] + "℃ ").append("습도 : " + v[4]+"%");
        }
        else
        { // error
            sb.append("Error : " + s);
        }
        return jsonObject.toJSONString();
    }
}