/* 
This sketch uses a lot of code that was written by Doug Whitton that I'm not entirely sure I understand, 
but that is necessary in connecting the Arduino to a live browser.

I've added some basic graphics and sounds to the code, the potentionmeter and the light sensor are used to change the colour of the background while the button draws an "explosion" of circles.
*/

let osc;
let playing = false;
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let splitter;
let value1 = 0,
    value2 = 0,
    value3 = 0;
let osc1, osc2, osc3, fft;

let song, song1, song2;
let num, num2, num3;
let img, img1, img2;

function setup() {

    createCanvas(windowWidth, windowHeight);

    ///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
    ///////////////////////////////////////////////////////////////////    

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results
    serial.list();
    console.log("serial.list()   ", serial.list());

    /////////////////////////////////////////////////////////////////////////////
    // Assuming our Arduino is connected, let's open the connection to it
    // Change this to the name of your arduino's serial port
    serial.open("/dev/tty.usbmodem14101");
    ////////////////////////////////////////////////////////////////////////////
    // Here are the callbacks that you can register

    // When we connect to the underlying server
    serial.on('connected', serverConnected);

    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // OR
    //serial.onList(gotList);

    // When we some data from the serial port
    serial.on('data', gotData);
    // OR
    //serial.onData(gotData);

    // When or if we get an error
    serial.on('error', gotError);
    // OR
    //serial.onError(gotError);

    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
    // OR
    //serial.onOpen(gotOpen);

    // Callback to get the raw data, as it comes in for handling yourself
    //serial.on('rawdata', gotRawData);
    // OR
    //serial.onRawData(gotRawData);

    song = createAudio('assets/spooks.mp3'); //https://www.youtube.com/watch?v=pVY1-v97Mic sound sourced from youtube
      song1 = createAudio('assets/laugh.mp3'); //https://www.youtube.com/watch?v=uT7Mfs9yTJE sound sourced from youtube
     song2 = createAudio('assets/magic.mp3'); //https://www.youtube.com/watch?v=FmEiTpMCur8 sounds sourced from youtube

}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////

// We are connected and ready to go
function serverConnected() {
    console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}

// Connected to our serial device
function gotOpen() {
    console.log("Serial Port is Open");
}

// Uh oh, here is an error, let's log it
function gotError(theerror) {
    console.log(theerror);
}

// There is data available to work with from the serial port
function gotData() {
    var currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) return; // if the string is empty, do no more
    console.log("currentString  ", currentString); // println the string
    latestData = currentString; // save it for the draw method
    console.log("latestData" + latestData); //check to see if data is coming in
    splitter = split(latestData, ','); // split each number using the comma as a delimiter
    //console.log("splitter[0]" + splitter[0]); 
    value1 = splitter[0]; // first sensors data
    value2 = splitter[1]; // second sensors data
    value3 = splitter[2]; // third sensors data
}

// We got raw data from the serial port
function gotRawData(thedata) {
    println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device

//preload function was suggested by a fellow student
function preload(){
    img = loadImage('assets/Devil.png'); //https://upload.wikimedia.org/wikipedia/en/3/3e/Hot_Stuff_the_Little_Devil.png
 img1 = loadImage('assets/thumper.png');//https://officialpsds.com/thumper-rabbit-png-r665mz
 img2 = loadImage('assets/hat.png'); //https://www.subpng.com/png-megpka/
};

//I used help from fellow classmates and past lessons to make the sensors work in the way I needed them to

function draw() {
    if (value2 <500) {
        background(50, 50, 200); //sets the background to almost completely blue when potentiometer is low
        
        
    }
    if(value2>501){
        background(200,25,25); //sets background to red when potentiometer is high
        playDevil(); // plays playDevil function
    }
      if (value1 > 220) {
          playBunny(); //Plays playBunny function
        
     }
    if (value3 == 1){
         playMagic(); // plays playMagic function
    }
};
function playDevil() {
    if (value2 > 501) { // When potentiometer is about halfway the function is activated
        song.play(); //plays the first song in the series
        image(img,50, 50); // loads this image in this placement
    }
 if (value2 < 500) { //when potentiometer is at less than 500 the function ends
     song.stop();
}
};

 function playBunny() {
     if (value1 >220) { //when a sound is heard that reads over 220  the function begins
         image(img1, 50, 50);
         song1.play();
     }
     if (value1 < 209) {
         song1.stop(); // the function stops when the sound dispipates under 209
     }
 };
function playMagic() {
    if (value3 == 1) { //When button press is recognized the function begins
        image(img2, 30, 50);
        song2.play();
    }
    if (value3 == 0) {
        song2.stop();
    }
};

