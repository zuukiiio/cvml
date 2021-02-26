// Declare kinectron
let kinectron;
let liveData = false;
let sentTime = Date.now();
let currentFrame = 0;
let recorded_skeleton;
let recorded_data_file = "recorded_skeleton.json";
let flag = true;
let i = 0;
let opacityN;

function preload() {
  if (!liveData) {
    recorded_skeleton = loadJSON(recorded_data_file);
  }
}

function setup() {
  let canvas = createCanvas(960, 540);
  canvas.parent("#sketch-parent");

  // Set background color
  background(0);

  // Initialize Kinectron
  initKinectron();

  // set the color mode to HSB (Hue, Saturation, Brightness)
  colorMode(HSB, 255);

  noStroke();
  ellipseMode (CENTER);
  

  if (liveData) initKinectron();
}

function draw() {
  if (!liveData) loopRecordedData();
}

function loopRecordedData() {
  // send data every 20 seconds
  if (Date.now() > sentTime + 20) {
    drawSkeleton(recorded_skeleton[currentFrame]);
    sentTime = Date.now();

    if (currentFrame < Object.keys(recorded_skeleton).length - 1) {
      currentFrame++;
    } else {
      currentFrame = 0;
    }
  }
}

function initKinectron() {
  // Define and create an instance of kinectron
  kinectron = new Kinectron("");

  // Set Kinect type to windows
  kinectron.setKinectType("windows");

  // Connect with server over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(drawSkeleton);
}

// The incoming "body" argument holds the Kinect skeleton data
function drawSkeleton(body) {
  // Clear the background
  background(0);
  // console.log(body);

  // Draw a circle at the location of each joint
  for (let i = 0; i < body.joints.length; i++) {
    // Get the joint
    let joint = body.joints[i];

    // Set the drawing color
    fill(100);
    let hue = map(i, 0, body.joints.length, 0, 255);
    fill(hue, 255, 127);

    let jointSize = 24;
    let jointX = joint.depthX * width;
    let jointY = joint.depthY * height;
    // Map Kinect joint data to canvas size; Draw the circle
    ellipse(jointX, jointY, jointSize, jointSize);
    fill(255);
    // filter (BLUR, 0);

    text(i, jointX - jointSize/4, jointY + jointSize/4);
  }

  let lefthand = body.joints[22];
  let righthand = body.joints[24];
  let lefthandPos = createVector (lefthand.depthX * width, lefthand.depthY * height);
  let righthandPos = createVector (righthand.depthX * width, righthand.depthY * height);
  // let lefthandX = lefthand.depthX * width;
  // let lefthandY = lefthand.depthY * height;
  // let righthandX = righthand.depthX * width;
  // let righthandY = righthand.depthY * height;

  // console.log (lefthandX, lefthandY)

  let cPoint = createVector ((lefthandPos.x+righthandPos.x)/2, (lefthandPos.y+righthandPos.y)/2);
  let size = dist (lefthandPos.x, lefthandPos.y, righthandPos.x, righthandPos.y);
  console.log (size);
  let threshold1 = 50;
  let threshold2 = 200;
  let opacity = map (size, threshold1, threshold2, -50, 200);

  if (size >= threshold1 && size <= threshold2 && flag == true){
    push();
      fill (150, 255, 255, opacity);
      ellipse (cPoint.x, cPoint.y, size, size);
      // filter (BLUR, 5);
    pop();
  } else if (size > threshold2){
    flag = false;
    if (opacity > 0){
      size *= 1.3 * i;
      i++;
      opacityN =opacity - 35*i;
      fill (150, 255, 255, opacityN);
      ellipse (cPoint.x, cPoint.y, size, size);
    }

  }else if (size < 20){
     flag = true;
     i = 0;
  }






}