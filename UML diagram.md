---
title: FEC
---

classDiagram
class getTimeFormatString {
-Month: String
-Date: String
-Hour: String
-Minute: String
+DateFormat(): String
+YearFormat(): String
+MonthFormat(): String
+DayFormat(): String
+HourFormat(): String
+MinuteFormat(): String
+forecastDateFormat(): String
+arduinoDataF0rmat(): String
}
class getweather{
+get(): String
}

    class FarmIdData{
        -FarmId: String
    }

    class FarmInformation{

    }
    class FarmPlantData{

    }
    class PlantEnviromentData{

    }

    class JoinRequest{
        -loginId: String
        -password: String
        -passwordCheck: String
        -nickname: String
        +toEntity()
    }
    class LoginRequest{
        -loginId: String
        -password: String
    }
    class tempUserJoinRequest{

    }
    class TempUser{

    }
    class User{
        -id: long
        -loginId: String
        -passwd: String
        -name: String
        -role: userRole
    }

    class userRole{
        <<Enumeration>>
    }


    class JwtTokenFilter{
        -userService: UserService
        -secretKey: String
        #dolFilterInternal: void
    }

    class JwtTokenUtil{
        -secretKey: String
        +createToken()
        +getLoginId()
        +isExpired()
        +extractClaim()
    }

    class BcyptConfig{

    }
    class PrincipalDetails{

    }
    class PrincipalDetailsService{

    }

    class SecurityConfig{
        -userService: UserService
        -secretKey: String
        +securityFilterChain()
    }

    class SHA256{
        +getSalt(): String
        +encrypt(): String
        -bytesToHex(): Byte
    }
    class TempUserService{
        -userRepository: UserRepository
        -tempUserRepository: TempUserRepository
        +join(): void
        +delete(): void
        +getAllTempUser(): list<TempUser>
    }

    class DataController{
        -temperatureDataRepository: TemperatureDataRepository
        -illuminanceDataRepository: IlluminanceDataRepository
        -humidityDataRepository: HumidityDataRepository
        -carbon2DataRepository: Carbon2DataRepository
        +addData(): void
    }
    class LoginController{
        -userService: UserService
        +home(): String
        +joinPage(): String
        +join(): String
        +loginPage(): String
    }
    class MainPageController{
        -userService: UserService
        -DeviceIP: String
        +userInfo(): String
        +adminPage(): String
        +mainDataPage(): String
        +ledOn(): String
        +ledoff(): String
    }
    class UserRepository{
        <<Interface>>

    }
    class TempUserRepository{
        <<Interface>>
    }
    class Carbon2DataRepository{
        <<Interface>>
    }
    class HumidityDataRepository{
        <<Interface>>
    }
    class IlluminanceDataRepository{
        <<Interface>>
    }
    class TemperatureDataRepository{
        <<Interface>>
    }


    User --* userRole : has-a
    getTimeFormatString <.. getweather: uses
    getTimeFormatString <.. DataController: uses
    JoinRequest ..> LoginController: uses
    JoinRequest ..> UserService: uses
    tempUserJoinRequest ..> LoginController: uses
    LoginRequest ..> LoginController: uses
    TempUserRepository *--TempUser: uses
    UserRepository *-- User: uses

    JwtTokenFilter ..> JwtTokenUtil: uses
    JwtTokenFilter <.. SecurityConfig: uses

    JwtTokenUtil <.. DataController: uses
    JwtTokenFilter <.. LoginController: uses
    SHA256 <.. JoinRequest: uses
    SHA256 <.. UserService: uses
    TempUserService --* TempUserRepository: uses
    TempUserService <.. DataController: uses
    TempUserService <.. LoginController: uses
    UserService --* UserRepository: uses
    UserService <.. LoginController: uses
    UserService <.. JwtTokenFilter: uses
    UserService <.. SecurityConfig: uses
