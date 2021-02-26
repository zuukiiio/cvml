// Declare kinectron
let kinectron;

let w = 512;
let h = 424;
let nearThreshold;
let farThreshold;
let depthSlice;

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent("#sketch-parent");

  // Set background color
  background(0);

  // Initialize Kinectron
  initKinectron();

  // set the width of the depth you would like to capture
  depthSlice = 20;
}

function draw() {
  nearThreshold = map(mouseX, 0, w, 0, 255-depthSlice, true);
  farThreshold = nearThreshold + depthSlice;
}

function initKinectron() {
  // Define and create an instance of kinectron
  kinectron = new Kinectron("ffdbe62ed0c0.ngrok.io");

  // Set Kinect type to windows
  kinectron.setKinectType("windows");

  // Connect with server over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startDepth(drawDepth);
}

// The incoming "body" argument holds the Kinect skeleton data
function drawDepth(depthImg) {
  // Clear the background
  //background(0);

  loadImage(depthImg.src, function(img) {

    //image(img, 0, 0);
    img.loadPixels();

    for(let y = 0; y < h; y++) {
      for(let x = 0; x < w; x++) {
        const index = (x + y*width)*4;
        
        let r = img.pixels[index];
        // let g = img.pixels[index+1];
        // let b = img.pixels[index+2];

        if(r > nearThreshold && r < farThreshold) {
          img.pixels[index] = 255;
          img.pixels[index+1] = 0;
          img.pixels[index+2] = 0;
        }
      }
    }
    img.updatePixels();
    image(img, 0, 0);
	});	
}