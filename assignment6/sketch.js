var score;
var targets;
var bullets;
var enbullets;
var gameover
var player;
const SHOT_INTERVAL = 150;
function Player(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.lastShotTimestamp = -SHOT_INTERVAL;
    this.update = function() {
        if (keyIsDown(LEFT_ARROW) && this.x > this.size / 2) {
            this.x -= 5
        }
        if (keyIsDown(RIGHT_ARROW) && this.x < width - this.size / 2) {
            this.x += 5
        }
        if (keyIsDown(UP_ARROW) && this.y > this.size / 2) {
            this.y -= 5;
        }
        if (keyIsDown(DOWN_ARROW) && this.y < height - this.size / 2) {
            this.y += 5;
        }
        if (keyIsDown(SHIFT)) {
            var current = millis();
            if (current - this.lastShotTimestamp >= SHOT_INTERVAL && bullets.length < 3) {
                bullets.push(new Bullet(this.x, this.y - this.size / 2, 5));
                this.lastShotTimestamp = current;
            }
        }
        this.getX = function() {
            return this.x;
        }
        this.Y = function() {
            return this.y;
        }
        this.isCollided = function(x, y) {
            var dt = dist(this.x, this.y, x, y);
            if (dt <= size / 2) {
                return true;
            }
            return false;
        }
    }
    this.draw = function() {
        noStroke();
        fill(100, 149, 237);
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
    this.draw = function(x, y, size) {
        noStroke();
        fill(255, 215, 0);
        ellipse(this.x, this.y, this.size, this.size);
    }
    this.update = function() {
        this.y -= 5;
    }
    this.isOutOfScreen = function() {
        if (this.y < 0) {
            return true;
        } else {
            return false;
        }
    }
    this.getX = function() {
        return this.x;
    }
    this.getY = function() {
        return this.y;
    }
}
function Targets(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.nextShot = floor(random(2000, 300)) + millis();
    this.update = function() {
        var current = millis();
        if (current >= this.nextShot) {
            var e = new enemyBullet(this.x, this.y, player.getX(), player.getY(), 2, 5);
            enbullets.push(e);
            this.nextShot = floor(random(2000, 300)) + current;
        }
    }
    this.draw = function() {
        noStroke();
        fill(255, 106, 106);
        ellipse(this.x, this.y, this.size, this.size);
    }
    this.isCollided = function(x, y) {
        var a = dist(this.x, this.y, x, y);
        if (a <= size / 2) {
            return true;
        }
        return false;
    }
}
function enemyBullet(x, y, targetX, targetY, speed, size) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.size = size;
    var diffX = this.targetX - this.x;
    var diffY = this.targetY - this.y;
    var vec = sqrt(diffX * diffX + diffY * diffY);
    this.diffX = diffX / vec * speed;
    this.diffY = diffY / vec * speed;
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
    bullet = null;
    player = new Player(x, y, size);
    targets = [];
    for (var i = 0; i < 10; i++) {
        targets.push(new Targets(random(0, width), random(0, height / 2), 30));
    }
    score = 0;
    bullets = [];
    lastShotTimestamp = -SHOT_INTERVAL;
    enbullets = [];
    gameover = false;
}
function draw() {
    background(238, 233, 233);
    if (gameover == true) {
        background(250, 128, 114);
        textSize(60);
        textStyle(BOLD);
        fill('rgb(139, 58, 58)');
        const msg = "GAME OVER ";
        var wd = textWidth(msg);
        text(msg, (width - wd) / 2, height / 2);
    }
    if (targets.length == 0) {
        background(92, 172, 238);
        textSize(60);
        textStyle(BOLD);
        fill('rgb(127, 255, 212)');
        const msg = "CLEAR!";
        var wd = textWidth(msg);
        text(msg, (width - wd) / 2, height / 2);
    }
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
    for (var i = 0; i < enbullets.length; i++) {
        enbullets[i].update();
        enbullets[i].draw();
    }
    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].isOutOfScreen()) {
            bullets.splice(i, 1);
            i--;
        }
    }
    for (var i = 0; i < enbullets.length; i++) {
        if (enbullets[i].isOutOfScreen()) {
            enbullets.splice(i, 1);
            i--;
        }
    }
    for (var i = 0; i < bullets.length; i++) {
        var x = bullets[i].getX();
        var y = bullets[i].getY();
        for (var j = 0; j < targets.length; j++) {
            var ret = targets[j].isCollided(x, y);
            if (ret) {
                bullets.splice(i, 1);
                i--;
                targets.splice(j, 1);
                j--;
            }
        }
    }
    for (var i = 0; i < enbullets.length; i++) {
        var x = enbullets[i].getX();
        var y = enbullets[i].getY();
        if (player.isCollided(x, y)) {
            gameover = true;
        }
    }
}