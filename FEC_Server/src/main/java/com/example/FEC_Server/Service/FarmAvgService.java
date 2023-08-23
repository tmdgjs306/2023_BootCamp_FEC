package com.example.FEC_Server.Service;

import com.example.FEC_Server.repository.FarmInformationDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FarmAvgService {

    private final FarmInformationDataRepository farmInformationDataRepository;

    public Double getAvgTemperatureValue(int farmId, String time){
        System.out.println("Temp: "+farmInformationDataRepository.findAverageTemperatureValue(farmId,time));
        Double val = farmInformationDataRepository.findAverageTemperatureValue(farmId,time);
        if(val != null)
            return val;
        else return 0.0;
    }

    public Double getAvgHumidityValue(int farmId, String time){
        System.out.println("humidity: "+farmInformationDataRepository.findAverageHumidityValue(farmId,time));
        Double val = farmInformationDataRepository.findAverageTemperatureValue(farmId,time);
        if(val != null)
            return val;
        else
            return 0.0;
    }

    public Double getAvgCarbonDioxideValue(int farmId, String time){
        System.out.println("carbonDioxide: "+farmInformationDataRepository.findAverageCarbonDioxideValue(farmId,time));
        Double val = farmInformationDataRepository.findAverageCarbonDioxideValue(farmId,time);
        if(val !=null)
            return val;
        else
            return 0.0;
    }
}
