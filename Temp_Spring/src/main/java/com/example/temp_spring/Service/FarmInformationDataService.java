package com.example.temp_spring.Service;

import com.example.temp_spring.domain.data.FarmInformationData;
import com.example.temp_spring.repository.FarmInformationDataRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FarmInformationDataService {

    private final FarmInformationDataRepository farmInformationDataRepository;
    private JSONParser parser = new JSONParser();

    public void add(String req) throws ParseException {
        JSONObject jsonObject = (JSONObject) parser.parse(req);
        Double tempValue = (Double) jsonObject.get("temperature");
        Long illuminanceValue = (Long) jsonObject.get("illuminance");
        String timeValue = (String) jsonObject.get("time");
        String f = (String)jsonObject.get("farmId");
        Long temp = Long.parseLong(f);
        int farmId = temp.intValue();
        Double Humidity =(Double) jsonObject.get("humidity");

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

    public FarmInformationData findLatestFarmInformationData(int farmId){
        return farmInformationDataRepository.findLatestFarmInformationData(farmId);
    }


}
