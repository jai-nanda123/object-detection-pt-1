function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status ; Detecting Objects";
}

img = "";
status = "";
objects= [];

function preload (){
img = loadImage('shark v dolphin.png');
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != "")
     {
         r=random(255);
         g=random(255);
         b=random(255);
         objectDetector.detect(video,gotResult);
       for ( i = 0; i< objects.lenght; i++)
       {
           document.getElementById("status").innerHTML ="Status ; Objects Detected";
           document.getElementById("number_of_objects").innerHTML="number of objects detected are : " +objects.length;

           fill(r,g.b);
           percent = floor(object[i].confidence* 100);
           text(object[i].label + " " + percent + "%s", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke(r,g,b);
           rect(objects[i].x, objects[i].y ,objects[i].width, objects[i].height);
       }
     }
}

function modelLoaded(){
    console.log("Model Loaded!")
    staus = true;
}

function gotResult(error, results) {
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}