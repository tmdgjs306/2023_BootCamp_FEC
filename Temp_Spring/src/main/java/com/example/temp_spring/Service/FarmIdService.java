package com.example.temp_spring.Service;

import com.example.temp_spring.domain.data.FarmIdData;
import com.example.temp_spring.repository.FarmIdDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FarmIdService {
    private final FarmIdDataRepository farmIdDataRepository;
    int farmId=0;

    // FarmId 생성후, DB에 저장한 뒤 반환
    public int getFarmId(){
        double randNum = Math.random() * 10000000;
        farmId = (int)randNum + 1000000;
        while (farmIdDataRepository.existsByFarmId(farmId)) {
            randNum = Math.random() * 1000000;
            farmId = (int)randNum + 1000000;
            System.out.println(farmId);
        }
        FarmIdData farmIdData = FarmIdData.builder()
                                .farmId(farmId)
                                .build();
        farmIdDataRepository.save(farmIdData);
        return farmId;
    }

}
