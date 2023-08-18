#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <stdio.h>
#include <ctime>
#include <EEPROM.h>
#include "DHT.h"

//WIFI setting
const char* ssid = "KEB_INHA"; 
const char* password = "inha123*";

//URL Setting 
String addDataUrl = "http://165.246.80.211:8080/addData";
String getTimeUrl = "http://165.246.80.211:8080/getTime";
String getFarmIdUrl = "http://165.246.80.211:8080/getFarmId";

//Temperature sensor setting
int sensor = A2;    
int Vo;
float R1 = 10000;
float logR2, R2, T, Tc, Tf;
float c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;

//FarmId setting
String farmId = "";
int first;
int second;
int third;
String First;
String Second;
String Third;

//JSON
char buffer[96];
StaticJsonDocument<200> timeJson;
StaticJsonDocument<200> farmIdJson;

//led sensor setting 
const int led = D2;

//photoresistor sensor setting
int photoresistor = A1;

// 지연 효과 변수 
unsigned long previousMillis = 0;
const long interval = 10000; 

// 초음파 센서 
int echo_pin = D8;
int trig_pin = D9;
int count =0;
int pre_time = 0;

// DHT 센서 설정 
#define DHTPIN D2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

//WebServer Setting
WebServer server(80); // Create WebServer Object, port 
void printConnectMsg(){
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: "); 
  Serial.println(WiFi.localIP()); //print assigned ip address 
}

 //온도 센서의 값을 읽고 온도로 변환
float getTemp(){
  Vo = analogRead(sensor);
  R2 = R1 * (4095.0 / (float)Vo - 1.0);
  logR2 = log(R2);
  T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
  Tc = T - 273.15;
  return Tc;
}

//온도 센서의 값을 화씨 온도로 변환 
float tcToTf(float Tc){
  return (Tc * 9.0/5.0) +32.0;
}

float getHumidity(){
  float h = dht.readHumidity();
  return h+0.0000001;
}
// 현재 카운트 값 반환
int getCount(){
  return count;
} 

// 조도 센서 값 측정 
int getPhotoresistor(){
  return analogRead(photoresistor);
}

// IP 주소 XXX 처리 
String ipAddressConverter(String IpAddress){
  int a1,a2,a3,a4;
  sscanf(IpAddress.c_str(),"%d.%d.%d.%d", &a1, &a2, &a3, &a4);
  return String(a1)+".XXX.XXX."+String(a4);
} 

// 서버로 부터 시간 정보 전달 받음 
void getServerTime(){
  WiFiClient WiFiClient;
  HTTPClient httpClient;
  httpClient.begin(WiFiClient,getTimeUrl);
  httpClient.addHeader("Content-Type", "application/json");
  int httpResponseCode = httpClient.GET();
  String response;
  if(httpResponseCode>0){
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      response = httpClient.getString();
    }else{
      Serial.print("Error Code: ");
      Serial.println(httpResponseCode);
    }
    DeserializationError error = deserializeJson(timeJson,response);
    if(error){
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }
    httpClient.end();
}

// 서버에서 FarmId 할당 받음 
void getFarmId(){
  WiFiClient wifiClient;
  HTTPClient httpClient;
  httpClient.begin(wifiClient,getFarmIdUrl);
  httpClient.addHeader("Content-Type", "application/json");
  int httpResponseCode = httpClient.GET();
  String response;
  if(httpResponseCode>0){
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      response = httpClient.getString();
    }else{
      Serial.print("Error Code: ");
      Serial.println(httpResponseCode);
    }
    DeserializationError error = deserializeJson(farmIdJson,response);
    if(error){
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }
    httpClient.end();
}

/// Web 핸들러 
// 루트로 접속했을때 핸들러 
void handleRootEvent() {
  String clientIp = server.client().remoteIP().toString();
  String privateIP = ipAddressConverter(clientIp);
  String message = "Hello World!!";
  
  Serial.print("Main Page from :"); // Page Enter 
  Serial.println(clientIp);

  server.send(200 , "text/plain", message);   
}

// getTemp 로 접속했을때 핸들러 
void getTempJson(){
  float temp = getTemp();
  StaticJsonDocument<200> doc;
  JsonObject root = doc.to<JsonObject>();
  root["Sensor"] = "temperature";
  root["Value"] = temp;

  serializeJson(root,buffer);
  server.send(200 , "text/Json",buffer); 
}

//Count 값을 JSON 형태로 파싱하여 반환 
void getCountJson(){
  int count = getCount();
  StaticJsonDocument<200> doc;
  JsonObject root = doc.to<JsonObject>();
  root["Sensor"] = "ultrasonicWave";
  root["Value"] = count;

  serializeJson(root,buffer);
  server.send(200 , "text/Json",buffer); 
}

// RED LED 제어 함수   
void handleRedledOn(){
  Serial.println("D2 ON Call!!");
  digitalWrite(led,HIGH);
  server.send(200,"text/plain","LED ON!!");
}

// RED LED 제어 함수 
void handleRedledOff(){
  Serial.println("D2 OFF Call!!");
  digitalWrite(led, LOW);
  server.send(200,"text/plain","LED OFF!!");
}

void setup() {

  Serial.begin(115200); // ESP32 baud rate

  //WIFI Setting  
  WiFi.mode(WIFI_STA); 
  WiFi.begin(ssid, password); 
  Serial.println("");

  while(WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
  }
  printConnectMsg(); //시리얼에 IP 주소 정보 출력 

  server.on("/", handleRootEvent); // root(/) Enter Function 
  server.on("/getTemp",getTempJson); // (/getTemp) 접속시 Json 포맷으로 온도 데이터 전송 
  server.on("/getCount",getCountJson); // (/getCount) 접속시 Json 포맷으로 카운트 값 전송 
  server.on("/red_led_on",handleRedledOn);
  server.on("/red_led_off",handleRedledOff);
  server.begin(); // Server Start 
  Serial.println("HTTP server started");

  //time setting

  //led Setting
  pinMode(led,OUTPUT);
  digitalWrite(led, LOW);

  // 초음파 센서 세팅 
  pinMode(trig_pin,OUTPUT);
  pinMode(echo_pin,INPUT);

  Serial.println("");

  //EEPROM 세팅 
  EEPROM.begin(256);

  //DHT 세팅 
  dht.begin();

  if(EEPROM.read(0)!=255){
    first = EEPROM.read(0);
    second = EEPROM.read(1);
    third = EEPROM.read(2);
    First =  String(first);
    Second = String(second);
    Third = String(third);

    farmId = First+Second+Third;
    Serial.println("farmId : "+farmId);
  }
  else{
    getFarmId();
    First = farmIdJson["first"].as<String>();
    Second = farmIdJson["second"].as<String>();
    Third = farmIdJson["third"].as<String>();
    EEPROM.write(0,First.toInt());
    EEPROM.write(1,Second.toInt());
    EEPROM.write(2,Third.toInt());
  
    farmId = First+Second+Third;
    Serial.println("farmId : "+farmId);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  server.handleClient(); // Client session Receive
  unsigned long currentMillis = millis();

  if(currentMillis - previousMillis >= interval){
    previousMillis = currentMillis;
  if((WiFi.status()) == WL_CONNECTED){
    getServerTime();
    // 연결 설정 
    WiFiClient WiFiClient;
    HTTPClient httpClient; 
    httpClient.begin(WiFiClient,addDataUrl);
    httpClient.addHeader("Content-Type", "application/json");

    //Json 객체 생성 
    StaticJsonDocument<200> json;

    // 센서 측정값 저장 
    float temp = getTemp();
    int photoresistor_result = getPhotoresistor();
    float humidity = getHumidity();
    String year = timeJson["year"];
    String month = timeJson["month"];
    String day = timeJson["day"];
    String hour = timeJson["hour"];
    String minute = timeJson["minute"];
    String time = year+month+day+hour+minute;

    // 측정값 + farmId 값 입력 
    json["farmId"] = farmId;
    json["temperature"] = temp;
    json["illuminance"] = photoresistor_result;
    json["humidity"] = humidity;
    json["time"] = time;

    // Json 형태로 데이터 저장  
    String parsedJsonToString;
    serializeJson(json,parsedJsonToString);

    // 데이터 서버로 전송 
    int httpResponseCode = httpClient.POST(parsedJsonToString);

    if(httpResponseCode>0){
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String response = httpClient.getString();
      Serial.println(response);
    }else{
      Serial.print("Error Code: ");
      Serial.println(httpResponseCode);
    }
    httpClient.end();
  }
  }
}
