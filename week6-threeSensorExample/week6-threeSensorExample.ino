#include "Arduino_SensorKit.h"
#define button 4

int sound_sensor = A2;
int potentiometer = A0;
int button_state = 0;
int sensors[3];

void setup() {
   // start serial port at 9600 bps:
   Serial.begin(9600);
   pinMode(button, INPUT);
   pinMode(potentiometer,INPUT);
}
 
void loop() {

  int soundValue = 0; //create variable to store many different readings
  for (int i = 0; i < 32; i++) //create a for loop to read 
  { soundValue += analogRead(sound_sensor);  } //read the sound sensor
 
  soundValue >>= 5; //bitshift operation 
  Serial.println(soundValue); //print the value of sound sensor


  if (soundValue > 500) { 
    Serial.println("         ||        ");
    Serial.println("       ||||||      ");
    Serial.println("     |||||||||     ");
    Serial.println("   |||||||||||||   ");
    Serial.println(" ||||||||||||||||| ");
    Serial.println("   |||||||||||||   ");
    Serial.println("     |||||||||     ");
    Serial.println("       ||||||      ");
    Serial.println("         ||        ");
  }
  delay(100);
  

  
    sensors[0] = soundValue;
    
    int sensor_value = analogRead(potentiometer);
    int value = map(sensor_value, 0, 1023, 0, 100);
    
    sensors[1] = sensor_value;
    
  button_state = digitalRead(button);

  if (button_state == HIGH);
   
  
  delay(100);
    sensors[2] = button_state;

    
   


    
    for (int thisSensor = 0; thisSensor < 3; thisSensor++) {

        int sensorValue = sensors[thisSensor];
      
      // if you're on the last sensor value, end with a println()
      // otherwise, print a comma
      //The number of sensors needs to be hard coded, in this example 3 sensors are running 0,1,2
      
      Serial.print(sensorValue);
      if (thisSensor == 2) {
         Serial.println();
      } else {
         Serial.print(",");
      }
   }
    delay(100);              
}
