#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <stdio.h>
#include <ctime>
#include <EEPROM.h>
#include <DHT.h>

// WIFI setting
const char* ssid = "KEB_INHA";
const char* password = "inha123*";

// URL Setting
String addDataUrl = "http://3.39.250.53:8080/addData";
String getTimeUrl = "http://3.39.250.53:8080/getTime";
String getFarmIdUrl = "http://3.39.250.53:8080/getFarmId";

String FarmId = "";

// JSON
char buffer[96];
StaticJsonDocument<200> timeJson;

// photoresistor sensor setting
int photoresistor = A1;

// humidity temperature sensor setting
DHT dht(D2, DHT22);

// 지연 효과 변수
unsigned long previousMillis = 0;
const long interval = 10000;

// WebServer Setting
WebServer server(80);

void printConnectMsg() {
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

float getTemperature() {
  return dht.readTemperature();
}

float getHumidity() {
  return dht.readHumidity();
}

int getPhotoresistor() {
  return analogRead(photoresistor);
}

String ipAddressConverter(String IpAddress) {
  int a1, a2, a3, a4;
  sscanf(IpAddress.c_str(), "%d.%d.%d.%d", &a1, &a2, &a3, &a4);
  return String(a1) + ".XXX.XXX." + String(a4);
}

void getServerTime() {
  WiFiClient WiFiClient;
  HTTPClient httpClient;
  httpClient.begin(WiFiClient, getTimeUrl);
  httpClient.addHeader("Content-Type", "application/json");
  int httpResponseCode = httpClient.GET();
  String response;
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    response = httpClient.getString();
  } else {
    Serial.print("Error Code: ");
    Serial.println(httpResponseCode);
  }
  DeserializationError error = deserializeJson(timeJson, response);
  if (error) {
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

// getHumidity 로 접속했을때 핸들러 
void getHumidityJson(){
  float Humidity = getHumidity();
  StaticJsonDocument<200> doc;
  JsonObject root = doc.to<JsonObject>();
  root["Sensor"] = "Humidity";
  root["Value"] = humidity;

  serializeJson(root,buffer);
  server.send(200 , "text/Json",buffer); 
}

// getPhotoresistor 로 접속했을때 핸들러 
void getPhotoJson(){
  int Photoresistor = getPhotoresistor();
  StaticJsonDocument<200> doc;
  JsonObject root = doc.to<JsonObject>();
  root["Sensor"] = "Photoresisor";
  root["Value"] = photoresistor;

  serializeJson(root,buffer);
  server.send(200 , "text/Json",buffer); 
}

void getFarmId() {
  WiFiClient wifiClient;
  HTTPClient httpClient;
  httpClient.begin(wifiClient, getFarmIdUrl);
  httpClient.addHeader("Content-Type", "text/plan");
  int httpResponseCode = httpClient.GET();
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    FarmId = httpClient.getString();
  } else {
    Serial.print("Error Code: ");
    Serial.println(httpResponseCode);
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  printConnectMsg();
  server.begin();
  Serial.println("HTTP server started");

  dht.begin();
  EEPROM.begin(256);
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    if ((WiFi.status()) == WL_CONNECTED) {
      getServerTime();
      WiFiClient WiFiClient;
      HTTPClient httpClient;
      httpClient.begin(WiFiClient, addDataUrl);
      httpClient.addHeader("Content-Type", "application/json");

      StaticJsonDocument<200> json;

      float temperature = getTemperature();
      int photoresistor_result = getPhotoresistor();
      float humidity = getHumidity(); 
      String year = timeJson["year"];
      String month = timeJson["month"];
      String day = timeJson["day"];
      String hour = timeJson["hour"];
      String minute = timeJson["minute"];
      String time = year + month + day + hour + minute;

      if (EEPROM.read(0) == 255) {
        getFarmId();
        EEPROM.write(0, FarmId.toInt());
      }

      json["temperature"] = temperature;
      json["illuminance"] = photoresistor_result;
      json["humidity"] = humidity;
      json["time"] = time;

      String parsedJsonToString;
      serializeJson(json, parsedJsonToString);

      int httpResponseCode = httpClient.POST(parsedJsonToString);

      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String response = httpClient.getString();
        Serial.println(response);
      } else {
        Serial.print("Error Code: ");
        Serial.println(httpResponseCode);
      }

      Serial.print("Temperature: ");
      Serial.println(temperature);
      Serial.print("Illuminance: ");
      Serial.println(photoresistor_result);
      Serial.print("Humidity: ");
      Serial.println(humidity);



      httpClient.end();
    }
  }
}