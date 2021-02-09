let w = 320;
let h = 210;
let capture;
let threshold = 85;
let threshold2 = 170;
let stepSize = 10;



function setup() {
  let c = createCanvas(w, h);
  c.parent("sketch-parent");
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
}

function draw() {
  background(0);
    // console.log(mouseX);
  capture.loadPixels();
  // let threshold = map(mouseX,0 ,w, 50, 205, true);
  
  
  for(let y = 0; y < capture.height; y+=stepSize) {
    for(let x = 0; x < capture.width; x+=stepSize) {
      const index = (x + y * capture.width) * 4;
      
      let r = capture.pixels[index];
      let g = capture.pixels[index+1];
      let b = capture.pixels[index+2];
      let c = color(r,g,b);
      
      let totalBrightness = r + g + b;
      
      let brightness = totalBrightness/3;
      

      let size = map(brightness, 0, 255, 0, TWO_PI, true)
      let sW = map(brightness, 0, 255, 0.5, 1, true)

      // noStroke();
      // fill(c);
      // push();
      //   translate(w,0);
      //   scale (-1,1);
      //   translate (stepSize/2,stepSize/2);
      //   ellipse(x,y,size,size);
      // pop();
    

      textSize((cos(size-3.5)+1)/2*stepSize);
      textAlign(CENTER, CENTER);
      stroke (c);
      strokeWeight(sW);
      fill(c);


      if(brightness < threshold) {
        text('朱',-stepSize-x + w, y + stepSize);
        
      } 
      else if (brightness > threshold2){
        text('皓',-stepSize-x + w, y + stepSize);
        
      }
      
      else {
        text('祺', -stepSize-x +w , y + stepSize);
        
      }
      


      
    }
  }
  // capture.updatePixels();
  
//   image(capture, 0, 0);
}