var player;
var bullets;
var ebullets;
var targets;
var score;
var gameover;
const SHOT_INTERVAL = 100;
function Player(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.lastShotTimestamp = 0;
    this.update = function() {
        //move the player position.
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += 5;
        }
        if (keyIsDown(UP_ARROW)) {
            this.y -= 5;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.y += 5;
        }
        if (keyIsDown(SHIFT)) {
            var now = millis();
            if (now - this.lastShotTimestamp >= SHOT_INTERVAL && bullets.length < 3) {
                bullets.push(new Bullet(this.x, this.y - this.size / 2, 5));
                this.lastShotTimestamp = now;
            }
        }
        //limit the area where the character can move
        if (this.x < this.size / 2) {
            this.x = this.size / 2;
        }
        if (this.x > width - this.size / 2) {
            this.x = width - this.size / 2;
        }
        if (this.y < this.size / 2) {
            this.y = this.size / 2;
        }
        if (this.y > height - this.size / 2) {
            this.y = height - this.size / 2;
        }
    }
    this.draw = function() {
        //draw a simple circle for now.
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    }
    this.getX = function() {
        return this.x;
    }
    this.getY = function() {
        return this.y;
    }
    this.isCollided = function(x, y) {
        var d = dist(this.x, this.y, x, y);
        if (d <= size / 2) {
            return true;
        }
        return false;
    }
}
function Bullet(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.update = function() {
        this.y -= 10;
    }
    this.draw = function() {
        //draw a simple circle for now.
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    }
    this.isOutOfScreen = function() {
        if (this.y < 0) {
            return true;
        }
        return false;
    }
    this.getX = function() {
        return this.x;
    }
    this.getY = function() {
        return this.y;
    }
}
function Target(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.nextShotTime = floor(random(2000, 300)) + millis();
    this.update = function() {
        var now = millis();
        if (now >= this.nextShotTime) {
            var b = new EnemyBullet(this.x, this.y, player.getX(), player.getY(), 2, 5);
            ebullets.push(b);
            this.nextShotTime = floor(random(2000, 300)) + now;
        }
    }
    this.draw = function() {
        noStroke();
        fill(128, 0, 0);
        ellipse(this.x, this.y, this.size, this.size);
    }
    this.isCollided = function(x, y) {
        var d = dist(this.x, this.y, x, y);
        if (d <= size / 2) {
            return true;
        }
        return false;
    }
}
function EnemyBullet(x, y, targetX, targetY, speed, size) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.size = size;
    var diffX = this.targetX - this.x;
    var diffY = this.targetY - this.y;
    var vecSize = sqrt(diffX * diffX + diffY * diffY);
    this.diffX = diffX / vecSize * speed;
    this.diffY = diffY / vecSize * speed;
    this.update = function() {
        this.x += this.diffX;
        this.y += this.diffY;
    }
    this.draw = function() {
        //draw a simple circle for now.
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    }
    this.isOutOfScreen = function() {
        if (this.y < 0 || this.y > height || this.x < 0 || this.x > width) {
            return true;
        }
        return false;
    }
    this.getX = function() {
        return this.x;
    }
    this.getY = function() {
        return this.y;
    }
}
function setup() {
    createCanvas(640, 480);
    var x = width / 2;
    var y = height / 5 * 4;
    var size = 30;
    player = new Player(x, y, size);
    bullet = null;
    targets = [];
    for (var i = 0; i < 10; i++) {
        targets.push(new Target(random(0, width), random(0, height / 2), 30));
    }
    //create an array for bullets.
    bullets = [];
    //set the last shot timestamp to -SHOT_INTERVAL, so that the first shot can
    //be shot right at the beginning of the game.
    lastShotTimestamp = -SHOT_INTERVAL;
    //reset the score
    score = 0;
    //enemy bullets.
    ebullets = [];
    gameover = false;
}
function draw() {
    background(0);
    background(0);
    if (gameover == true) {
        textSize(50);
        const msg = "GAME OVER";
        var w = textWidth(msg);
        text(msg, (width - w) / 2, height / 2);
    }
    if (targets.length == 0) {
        textSize(50);
        const msg = "CLEAR!";
        var w = textWidth(msg);
        text(msg, (width - w) / 2, height / 2);
    }
    //draw and update characters
    if (gameover != true) {
        player.update();
        player.draw();
    }
    for (var i = 0; i < targets.length; i++) {
        targets[i].update();
        targets[i].draw();
    }
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        bullet.update();
        bullet.draw();
    }
    for (var i = 0; i < ebullets.length; i++) {
        ebullets[i].update();
        ebullets[i].draw();
    }
    //remove bullets when they go out of the canvas.
    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].isOutOfScreen()) {
            bullets.splice(i, 1);
            //we removed one bullet at the index, then the array elements
            //on the right will be shited to left. so we need to check the same index
            //again. As I will be incremetend by 1 in every iteration, we decrement i by
            // 1, so that  'i'  in the next iteration will be the same as the current
            //iteration.
            i--;
        }
    }
    //remove enemy bullets when they go out of the canvas.
    for (var i = 0; i < ebullets.length; i++) {
        if (ebullets[i].isOutOfScreen()) {
            ebullets.splice(i, 1);
            //we removed one bullet at the index, then the array elements
            //on the right will be shited to left. so we need to check the same index
            //again. As I will be incremetend by 1 in every iteration, we decrement i by
            // 1, so that  'i'  in the next iteration will be the same as the current
            //iteration.
            i--;
        }
    }
    //check if each bullet hits a target.
    for (var i = 0; i < bullets.length; i++) {
        var x = bullets[i].getX();
        var y = bullets[i].getY();
        for (var j = 0; j < targets.length; j++) {
            var ret = targets[j].isCollided(x, y);
            if (ret) {
                bullets.splice(i, 1);
                i--; // this is the same reasonve as above.
                targets.splice(j, 1);
                j--; // this is the same reasonve as above.
            }
        }
    }
    //check if each enemy bullet hits the player
    for (var i = 0; i < ebullets.length; i++) {
        var x = ebullets[i].getX();
        var y = ebullets[i].getY();
        if (player.isCollided(x, y)) {
            gameover = true;
        }
    }
}