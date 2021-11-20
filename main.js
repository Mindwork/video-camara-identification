img = "";
status1 = "";
objects = [];
function preload() {
  img = loadImage('dog_cat.jpg');
}
function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status1 = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
  console.log("objeccts"+objects);
}


function draw() {
  image(video, 0, 0, 640, 420);
  if (status1!= "") {
    objectDetector.detect(video, gotResult);
    r=random(255);
    g=random(255);
    b=random(255);
    console.log("objects"+objects);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Object Detected";
      document.getElementById("number_objects").innerHTML = "Number of Objects Detected:"+objects.length;
      percent = floor(objects[i].confidence * 100);
      fill(r,g,b);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x-15, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}