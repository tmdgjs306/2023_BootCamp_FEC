package com.example.FEC_Server.Service;

import com.example.FEC_Server.domain.data.FarmIdData;
import com.example.FEC_Server.repository.FarmIdDataRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FarmIdService {
    private final FarmIdDataRepository farmIdDataRepository;
    int farmId=0;
    JSONObject jsonObject = new JSONObject();
    String returnString;
    // FarmId 생성후, DB에 저장한 뒤 반환
    public String getFarmId(){
        int first = (int) (Math.random() * 98) + 1;
        int second = (int) (Math.random() * 99);
        int third = (int) (Math.random() * 99);
        String result = Integer.toString(first) + Integer.toString(second) + Integer.toString(third);
        farmId = Integer.parseInt(result);

        while (farmIdDataRepository.existsByFarmId(farmId)) {
            first = (int) (Math.random() * 98) + 1;
            second = (int) (Math.random() * 99);
            third = (int) (Math.random() * 99);
            result = Integer.toString(first) + Integer.toString(second) + Integer.toString(third);
            farmId = Integer.parseInt(result);
        }
        jsonObject.put("first",first);
        jsonObject.put("second",second);
        jsonObject.put("third",third);
        returnString = jsonObject.toJSONString();
        FarmIdData farmIdData = FarmIdData.builder()
                                .farmId(farmId)
                                .build();
        farmIdDataRepository.save(farmIdData);
        return returnString;
    }

}
