#include <Wire.h>

//RGB
int LED1_Pins[] = {A14, A16, A15};//16
int LED2_Pins[] = {A12, A10, A11};
int LED3_Pins[] = {A18, A17, A19};
int LED4_Pins[] = {A13, A4, A5};


void setup()
{
  Wire.begin();
  
  // 使用するタイマーのチャネルと周波数を設定
  for(int i=0;i<12;i++)
    ledcSetup(i, 1280, 8);
  for (int i = 0; i <12; i++) {
      if(i<3){
        ledcAttachPin(LED1_Pins[i%3], i);
      }
      else if(i<6){
        ledcAttachPin(LED2_Pins[i%3], i);
      }
      else if(i<9){
        ledcAttachPin(LED3_Pins[i%3], i);
      }
      else if(i<12){
        ledcAttachPin(LED4_Pins[i%3], i);
      }
    }
}


void loop()
{
  static uint8_t brightness = 0;
  static int diff = 1;
  int len_esp[] = {0,brightness,0,0,brightness,0,0,brightness,0,0,brightness,0}; 
  for (int i = 0; i < 12; i++)ledcWrite(i, brightness);
  // 明るさが0を下回る、若しくは255を超えた時に反転
  if (brightness == 0) {
    diff = 1;
  } else if (brightness == 100) {
    diff = -1;
  }
 
  brightness += diff;
  int len_arduino[] = {0,brightness,0,0,brightness,0,0,brightness,0,0,brightness,0}; 
  Wire.beginTransmission(0x08);
  for(int i=0;i<12;i++){
    Wire.write(brightness);
  }
  Wire.endTransmission();
  delay(10);
}
