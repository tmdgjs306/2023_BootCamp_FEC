package com.example.FEC_Server;

import com.example.FEC_Server.Security.SHA256;
import com.example.FEC_Server.domain.data.PlantEnvironmentData;
import com.example.FEC_Server.domain.user.User;
import com.example.FEC_Server.domain.user.UserRole;
import com.example.FEC_Server.repository.PlantEnvironmentDataRepository;
import com.example.FEC_Server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.NoSuchAlgorithmException;

/**
 * Project Name: F.E.C
 * Team: Newbies
 * author: 한승헌
 * Description: User Database 기본 계정 정보를 삽입하는 로직
 * 생성 ID: root(pw: 1234, Role: ADMIN) user(pw: 1234, Role: USER)
 */
@Component
@RequiredArgsConstructor
public class InitData {

    private final UserRepository userRepository;
    private final PlantEnvironmentDataRepository plantEnvironmentDataRepository;
    private SHA256 sha256 = new SHA256();
    @PostConstruct
    public void makeAdminAndUser() throws NoSuchAlgorithmException {
        String salt = sha256.getSalt();
        if(!userRepository.existsByLoginId("root")) {
            User admin2 = User.builder()
                    .loginId("root")
                    .passwd(sha256.encrypt("1234"+salt,3))
                    .email("admin@gmail.com")
                    .role(UserRole.ADMIN)
                    .salt(salt)
                    .farmId(2147000000)
                    .build();
            userRepository.save(admin2);
        }
        if(!userRepository.existsByLoginId("user")) {
            salt = sha256.getSalt();
            User user2 = User.builder()
                    .loginId("user")
                    .passwd(sha256.encrypt("1234"+salt,3))
                    .email("user@gmail.com")
                    .role(UserRole.USER)
                    .salt(salt)
                    .farmId(9255255)
                    .build();
            userRepository.save(user2);
        }
    }
    @PostConstruct
    public void makePlantEnvironmentData () throws NoSuchAlgorithmException{
        if(!plantEnvironmentDataRepository.existsPlantEnvironmentDataByName("Rosemary")){
            PlantEnvironmentData plantEnvironmentData = PlantEnvironmentData.builder()
                    .name("Rosemary")
                    .minTemperature(10.0)
                    .maxTemperature(25.0)
                    .illuminance(2500L)
                    .minHumidity(40.0)
                    .maxHumidity(70.0)
                    .carbonDioxide(700L)
                    .build();
            plantEnvironmentDataRepository.save(plantEnvironmentData);
        }
        if(!plantEnvironmentDataRepository.existsPlantEnvironmentDataByName("Orchid")){
            PlantEnvironmentData plantEnvironmentData = PlantEnvironmentData.builder()
                    .name("Orchid")
                    .minTemperature(18.0)
                    .maxTemperature(25.0)
                    .illuminance(2500L)
                    .minHumidity(40.0)
                    .maxHumidity(70.0)
                    .carbonDioxide(700L)
                    .build();
            plantEnvironmentDataRepository.save(plantEnvironmentData);
        }
        if(!plantEnvironmentDataRepository.existsPlantEnvironmentDataByName("Lettuce")){
            PlantEnvironmentData plantEnvironmentData = PlantEnvironmentData.builder()
                    .name("Lettuce")
                    .minTemperature(15.0)
                    .maxTemperature(20.0)
                    .illuminance(1500L)
                    .minHumidity(75.0)
                    .maxHumidity(85.0)
                    .carbonDioxide(700L)
                    .build();
            plantEnvironmentDataRepository.save(plantEnvironmentData);
        }
        if(!plantEnvironmentDataRepository.existsPlantEnvironmentDataByName("Tomato")){
            PlantEnvironmentData plantEnvironmentData = PlantEnvironmentData.builder()
                    .name("Tomato")
                    .minTemperature(10.0)
                    .maxTemperature(20.0)
                    .illuminance(2500L)
                    .minHumidity(40.0)
                    .maxHumidity(70.0)
                    .carbonDioxide(700L)
                    .build();
            plantEnvironmentDataRepository.save(plantEnvironmentData);
        }
    }
}
