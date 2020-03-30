var startTime;
var origX;
var destX;


function setup(){
	createCanvas(640, 480);

	startTime = millis();

	origX = 100;
	destX = 500;


}

function draw(){
	background(127);

	var now = millis() - startTime;

	var x;

	if (now <= 3000){
		x = map(now, 0, 3000, origX, destX);
	}else if (now >3000 && now <=6000){
		x = map(now, 3000, 6000, destX, origX);
	}else {
		x = origX;
	}

	ellipse(x, 200, 100, 100);

	

}