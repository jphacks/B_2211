#include <Wire.h>

//RGB
int LED1_Pins[] = {2, 4, 3};
int LED2_Pins[] = {5, 7, 6};
int LED3_Pins[] = {10, 8, 9};
int LED4_Pins[] = {11, 13, 12};

volatile uint8_t readBuff[12];
volatile uint8_t readIdx;
volatile boolean rcvFlag = false;

void setup() {
  for(int i=0;i<3;i++ ){
    pinMode(LED1_Pins[i], OUTPUT);
    pinMode(LED2_Pins[i], OUTPUT);
    pinMode(LED3_Pins[i], OUTPUT);
    pinMode(LED4_Pins[i], OUTPUT);
  }
  Wire.begin(0x08);
  Serial.begin(9600);
  Wire.onReceive(receiveINT);
}

void loop() {
  if (rcvFlag) {
    rcvFlag = false;
    for (int x = 0; x < 12; x++) {
      Serial.print(readBuff[x]);
      Serial.print(",");
      if(x<3){
        analogWrite(LED1_Pins[x%3], readBuff[x]);
      }
      else if(x<6){
        analogWrite(LED2_Pins[x%3], readBuff[x]);
      }
      else if(x<9){
        analogWrite(LED3_Pins[x%3], readBuff[x]);
      }
      else if(x<12){
        analogWrite(LED4_Pins[x%3], readBuff[x]);
      }
    }
    Serial.print("\n");
  }
}

void receiveINT() {
  while (Wire.available()) {
    readBuff[readIdx++] = Wire.read();
    if (readIdx > 11) {
      readIdx = 0;
      rcvFlag = true;
    }
  }
}
