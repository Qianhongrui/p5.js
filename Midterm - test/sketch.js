//const STATE_MOVING = 0;
//const STATE_REST = 1;
var startTime;

function Eye(x, y, eyeColor, pupilColor1,pupilColor2, pupilColor3, size, maxSpeed)
{
	this.x = x;
	this.y = y;
	this.eyeColor = eyeColor;
	this.pupilColor1 = pupilColor1;
	this.pupilColor2 = pupilColor2;
	this.pupilColor3 = pupilColor3;
	this.size = size;
	this.angle = 0;

	this.destX = x;
	this.destY = y;
	this.maxSpeed=maxSpeed;

	/*this.destX = width / 2;
	this.destY = height / 2;*/

	//this.state = STATE_MOVING;
	this.restStartTime = 0;

	this.draw = function(){

		push();

		noStroke();

		translate(this.x,  this.y);

		fill(this.eyeColor);
		ellipse(0, 0, 80, 80);

		rotate(this.angle);
		var pupilX1 = this.size * 0.05;
		var pupilSize1 = this.size *0.7;
		fill(this.pupilColor1);
		ellipse(pupilX1, 0, pupilSize1, pupilSize1);

		var pupilX2 = this.size * 0.25;
		var pupilSize2 = this.size *0.3;
		fill(this.pupilColor2);
		ellipse(pupilX2, 0, pupilSize2, pupilSize2);

		var pupilX3 = this.size * 0.3;
		var pupilSize3 = this.size *0.1;
		fill(this.pupilColor3);
		ellipse(pupilX3, 0, pupilSize3, pupilSize3);


		pop();
	};
	this.lookAt = function(x, y){
		this.angle = atan2(y - this.y, x - this.x);
	};
	this.moveTo = function(x, y){
		this.x = x;
		this.y = y;
	};
	this.setDestination = function(x, y){
		this.destX = x;
		this.destY = y;
	};


	this.update = function(){
		
		var origin_X = x;
		var origin_Y = y;
		var time=3000;

		// if (this.state == STATE_MOVING){
		var diffX =  this.destX - this.x;
		var diffY = this.destY - this.y;
		var VX = diffX/time;
		var VY = diffY/time;
		

		/*var diffX =  Math.floor(Math.random() * 1024) - this.x;
		var diffY = Math.floor(Math.random() * 768) - this.y;*/
		var sizeOfVec = sqrt(diffX * diffX +diffY * diffY);
		if (sizeOfVec > this.maxSpeed){
			var tmp = 5.0 / sizeOfVec;
			diffX *= tmp;
			diffY *= tmp;
			
			var now;
	
			now = millis() - startTime;
			var temp = map( now, 0, 3000, origin_X, this.destX);
			diffX += temp*VX*tmp;
			diffY += temp*VY*tmp;
		}
		
		
		
		
		

		
	
		
		
		var newX = this.x + diffX;
		var newY =  this.y + diffY;
		this.moveTo(newX, newY);
		/*if (this.x == this.destX && this.y == this.destY){
			this.state = STATE_REST;
			this.restStartTime = millis();
		}*/



		if (this.x == this.destX && this.y == this.destY){

			this.setDestination(origin_X, origin_Y);
			this.lookAt(origin_X, origin_Y);
			this.lookAt(mouseX, mouseY);
				// this.state = STATE_REST;
				/*this.restStartTime = millis();*/
			}

			//returning from this function immediately!!
			// return;
		//}

		/*var startTime = millis();
		var now = millis() - startTime;

		map( now, 0, 3000, origin_X, destX);

			/*if( startTime - now == 3000){
				if((newX, newY) == (destX, destY)){
					
				}
			}*/
		// //if the two seconds elappsed, then pick up a random position
		// //and move to there again.
		// if (now - this.restStartTime >= 2000){
		// 		var randX = random(0, width);
		// 		var randY = random(0, height);
		// 		this.setDestination(randX, randY);
		// 		this.state = STATE_MOVING;
		// 		this.lookAt(this.destX, this.destY);
		
	}

	//	this.update();

}

	//var obj[i][j];

	var obj=new Array(5);
 	for(var i=0;i<5;i++)
 	{
 		obj[i]=new Array(7);
 		
 	}	

function setup(){
	createCanvas(1024, 768);
	
	var w=128,h=128;
	for (var i=0; i<5; i++){
		for(var j=0; j<7; j++){
			obj[i][j] = new Eye( w, h, color(255, 140, 0), color(255, 236, 139), color(255, 0, 0), color(0), 100, 5);
			w+=128;
		}
		w=128;
		h+=128;
	}
	

}

function draw(){
	
	background(139, 69, 19);
	for (var i=0; i<5; i++){
		for(var j=0; j<7; j++){
			//obj[i][j].lookAt( mouseX, mouseY);
			obj[i][j].update();
			obj[i][j].draw();
		}
	}
}

function mouseClicked(){

	
	for (var i=0; i<5; i++){
		for(var j=0; j<7; j++){
			startTime = millis();
			var random_X = random(0, width);
			var random_Y = random(0, height);

			obj[i][j].setDestination(random_X, random_Y);
			obj[i][j].lookAt(random_X, random_Y);

		}

	}

	
}
