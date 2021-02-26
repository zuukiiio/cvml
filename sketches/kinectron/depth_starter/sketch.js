// Declare kinectron
let kinectron;

let w = 512;
let h = 424;

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent("#sketch-parent");

  // Set background color
  background(0);

  // Initialize Kinectron
  initKinectron();
}

function initKinectron() {
  // Define and create an instance of kinectron (change this to the correct IP address, this one here is Doug's local IP, and only works on his local network)
  kinectron = new Kinectron("ffdbe62ed0c0.ngrok.io");

  // Set Kinect type to windows
  kinectron.setKinectType("windows");

  // Connect with server over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startDepth(drawDepth);
}

// The incoming "depthImg" argument holds the Kinect depth image data. The depth data arrives in the form of individual images (in the webp image format), 30 times per second. You can analyze the depth image pixels the same way you would analyze pixels in a regular image.
function drawDepth(depthImg) {
  
  loadImage(depthImg.src, function(img) {

    img.loadPixels();

    for(let y = 0; y < h; y++) {
      for(let x = 0; x < w; x++) {
        const index = (x + y*width)*4;
        // add code in here to make decisions based pixel information
        // With the depth image, pixel lightness corresponds to how far things are from the camera. Closer == darker, further == lighter.

        // because we're dealing with grayscale, all three color channels (R, G, B) will always be the same color (e.g., middle gray == (127, 127, 127)), so we don't need to grab each individual color channel. We can just look at one color channel and use that to set the brightness
        let brightness = img.pixels[index];
        
      }
    }
    img.updatePixels();
    image(img, 0, 0);
	});	
}