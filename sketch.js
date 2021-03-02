var s;
var f;
var scl = 20;

function mouseClicked() {
	if (mouseX < width && mouseY < height) {
		f.newFood(mouseX, mouseY);
		return;
	}
	b.xspeed = 0;
	b.yspeed=0;
	b.flag = true;
	// console.log("mouse click");
}

function setup() {
	createCanvas(500, 500);
	b = new Bug();
	f = new Food();
	frameRate(10);
}

function draw() {
	background(0, 0, 0);
	b.update();
	b.show();
	b.death();
	f.eat(b.x, b.y);
	f.show();
}
