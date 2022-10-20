#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFI Settings
const char* ssid = "SSID";
const char* password = "PASSWORD";

String serverEndpoint = "http://kusa.home.k1h.dev/state";

//RGB
int LED1_Pins[] = { A14, A16, A15 };  //16
int LED2_Pins[] = { A12, A10, A11 };
int LED3_Pins[] = { A18, A17, A19 };
int LED4_Pins[] = { A13, A4, A5 };


void setup() {
  Wire.begin();
  Serial.begin(115200);

  // 使用するタイマーのチャネルと周波数を設定
  for (int i = 0; i < 12; i++)
    ledcSetup(i, 1280, 8);
  for (int i = 0; i < 12; i++) {
    if (i < 3) {
      ledcAttachPin(LED1_Pins[i % 3], i);
    } else if (i < 6) {
      ledcAttachPin(LED2_Pins[i % 3], i);
    } else if (i < 9) {
      ledcAttachPin(LED3_Pins[i % 3], i);
    } else if (i < 12) {
      ledcAttachPin(LED4_Pins[i % 3], i);
    }
  }

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFiに接続されました IP Address: ");
  Serial.println(WiFi.localIP());
}

int* LEDStatusFormatter(String input, int output[]) {
  StaticJsonDocument<512> doc;
  DeserializationError error = deserializeJson(doc, input);
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return output;
  }
  for (int i = 0; i < 8; i++) {
    JsonArray root = doc[i];
    for (int j = 0; j < 3; j++) {
      output[3*i+j]=root[j];
    }
  }
  return output;
}

String getLedState() {
  HTTPClient http;
  http.begin(serverEndpoint);
  int httpResponseCode = http.GET();
  String payload = "{}";
  if (httpResponseCode == 200) {
    Serial.println("サーバーからデータを取得しました");
    payload = http.getString();
  } else {
    Serial.print("エラーが発生しました Code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
  return payload;
}

void loop() {
  int indexOffset = 4;  

  String LedData = getLedState();
  Serial.print("LED Data: ");
  Serial.println(LedData);
  int ledState[24] = {0};
  LEDStatusFormatter(LedData,ledState);
  for(int i=0;i<24;i++){
    Serial.print(ledState[i]);
    Serial.print(",");
  }
  Serial.println("");

  for(int i=0;i<12;i++)ledcWrite(i, ledState[i]);

  // for (int i = 0; i < 12; i++) ledcWrite(i, brightness);
  // // 明るさが0を下回る、若しくは255を超えた時に反転
  // if (brightness == 0) {
  //   diff = 1;
  // } else if (brightness == 100) {
  //   diff = -1;
  // }

  Wire.beginTransmission(0x08);
  for (int i = 0; i < 12; i++) {
    Wire.write(ledState[i+indexOffset]);
  }
  // Wire.endTransmission();
  // delay(10);
  delay(1000);
}