package com.example.FEC_Server.Service;

import com.example.FEC_Server.domain.data.PlantEnvironmentData;
import com.example.FEC_Server.repository.PlantEnvironmentDataRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PlantEnvironmentDataService {
    private final PlantEnvironmentDataRepository plantEnvironmentDataRepository;

    public String getAllPlantEnvironmentData(){
        JSONArray jsonArray = new JSONArray();
        List<PlantEnvironmentData> list = plantEnvironmentDataRepository.getAllPlantEnvironmentData();

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
        return jsonArray.toJSONString();
    }

    public String getPlantEnvironmentDataByName(String name){
        JSONObject jsonObject = new JSONObject();
        PlantEnvironmentData plantEnvironmentData = plantEnvironmentDataRepository.getPlantEnvironmentDataByName(name);
        jsonObject.put("name", plantEnvironmentData.getName());
        jsonObject.put("minTemperature",plantEnvironmentData.getMinTemperature());
        jsonObject.put("maxTemperature",plantEnvironmentData.getMaxTemperature());
        jsonObject.put("minHumidity",plantEnvironmentData.getMinHumidity());
        jsonObject.put("maxHumidity",plantEnvironmentData.getMaxHumidity());
        jsonObject.put("illuminance",plantEnvironmentData.getIlluminance());
        jsonObject.put("carbonDioxide",plantEnvironmentData.getCarbonDioxide());
        return jsonObject.toJSONString();
    }
}
