var colorIndexArray;
var colors = [[241, 242, 237], [71, 107, 195], [235, 210, 29], [156, 49, 41]];

var hlineParams = [
 [100, 10, 111],
 [70, 20, 111],
 [440, 30, 600],
 [150, 12, 150],
 [80, 10, 100],
 [200, 20, 200],
 [300, 50, 150],
 [400, 3, 170],
 [500, 10, 100],
 [600, 20, 40]
];

var vlineParams = [
 [10, 10, 70],
 [50, 20, 11],
 [100, 30, 80],
 [150, 40, 150],
 [200, 10, 100],
 [250, 20, 120],
 [300, 20, 115],
 [350, 30, 130],
 [400, 10, 160],
 [450, 20, 30]
];

//const BLOCK_SIZE = Math.floor(Math.random()*10);
const BLOCK_SIZE = 10;
function setup(){
	createCanvas(640, 480);

	seedValue = millis();
	seedValue1 = millis();
}

function draw(){
	background(237, 238, 233);

	for(var i = 0; i < hlineParams.length; i++){
		var y = hlineParams[floor(random(10))][0];
		var size = hlineParams[i][1];
		var seed = hlineParams[i][2];

		var tmp = generateHorizontalColors(seedValue, size);
		drawHorizontalLine(size, y, tmp);
	}

	for(var i = 0; i < vlineParams.length; i++){
		var x = vlineParams[floor(random(10))][0];
		var size = vlineParams[i][1];
		var seed = vlineParams[i][2];

		var tmp = generateVerticalColors(seedValue, size);
		drawVerticalLine(size, x, tmp);
	}
}
/*
 // var tmp = generateHorizontalColors(seedValue, BLOCK_SIZE);
  //drawHorizontalLine(BLOCK_SIZE*floor(random(2,5)), height / 2 - BLOCK_SIZE / 2 - 30,tmp);

  //var tmp = generateHorizontalColors(seedValue%2, BLOCK_SIZE);
  //drawHorizontalLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 + 20,tmp);

  //var tmp = generateHorizontalColors(seedValue%3, BLOCK_SIZE);
 // drawHorizontalLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 + 160,tmp);

  //var tmp = generateHorizontalColors(seedValue%5, BLOCK_SIZE);
  //drawHorizontalLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 - 200,tmp);
 
  //var tmp = generateHorizontalColors(seedValue%4, BLOCK_SIZE);
  //drawHorizontalLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 + 220,tmp);

   //var tmp = generateHorizontalColors(seedValue%6, BLOCK_SIZE);
  //drawHorizontalLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 - 140,tmp);

   //var tmp = generateHorizontalColors(seedValue%7, BLOCK_SIZE);
  //drawHorizontalLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 +50 ,tmp);

  //var tmp = generateHorizontalColors(seedValue%8, BLOCK_SIZE);
  //drawHorizontalLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 - 60,tmp);


 //var tmp = generateVerticalColors(seedValue%9, BLOCK_SIZE);
  //drawVerticalLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 - 60,tmp); 

 //var tmp = generateVerticalColors(seedValue%8, BLOCK_SIZE);
  //drawVerticalLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 + 80,tmp); 

 //var tmp = generateVerticalColors(seedValue%5, BLOCK_SIZE);
 //drawVerticalLine(BLOCK_SIZE*floor(random(2,5)), height / 2 - BLOCK_SIZE / 2 + 280,tmp);

 //var tmp = generateVerticalColors(seedValue%7, BLOCK_SIZE);
 //drawVerticalLine(BLOCK_SIZE*floor(random(2,5)), height / 2 - BLOCK_SIZE / 2 + 200,tmp);

 //var tmp = generateVerticalColors(seedValue%4, BLOCK_SIZE);
 //drawVerticalLine(BLOCK_SIZE*floor(random(2,5)), height / 2 - BLOCK_SIZE / 2 - 180,tmp);

 /*var offset = -220;
 var tmp = generateColors(seedValue, BLOCK_SIZE);
 for (var i=0; i<10; i++)
 {
  
  //var offset = Math.floor(Math.random()*10)*50;
  
  drawLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 + offset,tmp);
  offset += Math.round(Math.random()*10)*10;
 }*/



 /*for (var i=0; i<20; i++)
 {
  var tmp = generateColors(seedValue%floor(random(3,7)) , BLOCK_SIZE);
  
  drawLine(BLOCK_SIZE, height / 2 - BLOCK_SIZE / 2 - floor(random(3,7))*10,tmp);

 }*/





function mouseClicked(){
	seedValue = millis();
	//seedValue1 = millis();
}

function drawHorizontalLine(size, y, indexes)
{
	var x = 0;
	for (var i = 0; i < indexes.length;i++){
		noStroke();
		fill(colors[indexes[i]]);
		rect(x, y, size, size);
		x += size;
	}
}


function drawVerticalLine(size, x, indexes)
{
	var y = 0;
	for (var i = 0; i < indexes.length;i++){
		noStroke();
		fill(colors[indexes[i]]);
		rect(x, y, size, size);
		y += size;
	}
}

function generateHorizontalColors(seed, size)
{
	randomSeed(seed);
	var colorIndexes = [];
	
	var lastValue = 2;
	for (var x = 0; x < width; x += size){
		var tmp = floor(random(0, colors.length));

		if (tmp == 2){
			var rep = floor(random(3,7)); //obtain the value in the range: 1 - 11.
			//generate yellow blocks.
			for (var i = 0; i < rep; i++){
				colorIndexes.push(2);
			}
			x += size * (rep - 1); //we put extra block, so we need to do this.
		}else {
			while (lastValue == tmp && lastValue != 2){
				tmp = floor(random(0, colors.length));
			}
			colorIndexes.push(tmp);
		}
		lastValue = tmp;
	}	

	return colorIndexes;
}

function generateVerticalColors(seed, size)
{
	randomSeed(seed);
	var colorIndexes = [];

	var lastValue = 2;
	for (var y = 0; y < height; y += size){
		var tmp = floor(random(0, colors.length));

		if (tmp == 2){
			var rep = floor(random(3,7)); //obtain the value in the range: 1 - 11.
			//generate yellow blocks.
			for (var i = 0; i < rep; i++){
				colorIndexes.push(2);
			}
			y += size * (rep - 1); //we put extra block, so we need to do this.
		}else{
			while (lastValue == tmp && lastValue != 2){
				tmp = floor(random(0, colors.length));
			}
			colorIndexes.push(tmp);
		}
		lastValue = tmp;
	}

	return colorIndexes;
}