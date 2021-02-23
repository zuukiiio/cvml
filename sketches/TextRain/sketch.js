let capture;
let fallingLetters = [];
let w = 640;
let h = 480;
let threshold = 60;

function setup() {
  createCanvas(w, h);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  
  let sourceText = split ('I love you', '');
  // print (sourceText)
  
  for (let i = 0; i<sourceText.length; i++){
    let l = new Letter();
    fallingLetters.push(l);
    fallingLetters[i].cha = sourceText[i]
  }  
  print (fallingLetters[3])
  
}

function draw() {
  background(255);
    // let threshold = map(mouseX,0 ,w, 0, 100, true);

  capture.loadPixels();
   
  
  for(let y = 0; y < capture.height; y++) {
    for(let x = 0; x < capture.width; x++) {
      const index = (x + y * capture.width) * 4;
      const letterIndex = (w - fallingLetters[0].pos.x + fallingLetters[0].pos.y) *4;
      
      let r = capture.pixels[index];
      let g = capture.pixels[index+1];
      let b = capture.pixels[index+2];
      
      let totalBrightness = r + g + b;
      
      let brightness = totalBrightness/3;
      
//       if (index == 480000){
//         print('480000' + ':' +brightness)
//         let letterB = capture.pixels[int(letterIndex)]
//         print (letterB)
  
//       }

      
      if(brightness < threshold) {
        capture.pixels[index] = 0;
        capture.pixels[index+1] = 0;
        capture.pixels[index+2] = 0;
      } else {
        capture.pixels[index] = 255;
        capture.pixels[index+1] = 255;
        capture.pixels[index+2] = 255;      
              
       } 
    }
  }
  
  
    for (let i = 0; i<fallingLetters.length; i++){
    // fallingLetters[i].draw();
    let bValue = getBrightness(0,i);
    while (bValue < threshold && fallingLetters[i].vel.y >0){
      fallingLetters[i].pos.y --;
      bValue = getBrightness(0,i);
    }
    fallingLetters[i].update();
  }
  
  capture.updatePixels();
  
  push();
  translate(w,0);
  scale(-1,1);
  image(capture, 0, 0);

  pop();
    for (let i = 0; i<fallingLetters.length; i++){
    fallingLetters[i].draw();
  }


  
}




function getBrightness(_pixels, _i) {
  
  let currFallingLetter = fallingLetters[_i];
  let aveCount = 10;
  let totalBrightness = 0;
  
  for (let m=0; m<aveCount; m++){
      let index = int( ((w-currFallingLetter.pos.x) + (currFallingLetter.pos.y*w))*4 );
      
  
      let r = capture.pixels[index+4*m];
      let g = capture.pixels[index+1+4*m];
      let b = capture.pixels[index+2+4*m];
      totalBrightness += r + g + b;
  }
  
      
      let brightness = totalBrightness/(3*aveCount);
  
  // once we've calculated the brightness, return that value.
  return brightness;
}



class Letter {
  
  constructor(){
    this.cha = '';
    this.pos = createVector (int(random(0,w)), 0);
    this.vel = createVector (0, 3);
    // this.acc = createVector (0, 0.05);
    this.color = color (random(255), random(255), random(255))
    this.size = random (45,55);  
  }
  
//    checkShadow(){
//      let letterBrightness = getBrightness(0,i)
//       if (letterBrightness < threshold){
//         fallingLetters[i].vel = (0,0);
//       }

//   }
  
  reGen(){
    this.pos = createVector (int(random(0,w)),0);
    this.vel = createVector (0, 3);
    // this.acc = createVector (0, 0.05);
    }
  
  update(){
    // this.vel.add(this.acc);
    // this.checkShadow();
    this.pos.add(this.vel);
    if (this.pos.y>h){
    this.reGen();

    }
    
    


  }
  
  draw(){
    fill(this.color);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    stroke (this.color);
    strokeWeight(1);
    text(this.cha,this.pos.x,this.pos.y)
    

  }
}