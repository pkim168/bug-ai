function Bug(){
  this.x = 220;
  this.y = 220;
  this.xspeed = 1;
  this.yspeed = 0;
  this.instructions = [];
  this.order = []
  this.flag = false;

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {
    if(0 > this.x || this.x > width-scl || 0 > this.y || this.y > height-scl) {
      this.x = 220;
      this.y = 220;
      this.xspeed = 1;
      this.yspeed = 0;
      this.total = 0;
      // f.arr = [];
    }
  }

  this.update = function() {
    if (this.flag) {
      return;
    }
    if (this.instructions.length != 0) {
      if (this.xspeed != 0 || this.yspeed != 0)
        console.log(this.instructions);
      switch (this.instructions[0][0]) {

        case "up":
          this.xspeed = 0;
          this.yspeed = -1;
          break;

        case "down":
          this.xspeed = 0;
          this.yspeed = 1;
          break;

        case "left":
          this.xspeed = -1;
          this.yspeed = 0;
          break;

        case "right":
          this.xspeed = 1;
          this.yspeed = 0;
          break;
      }
      if (this.instructions[0][1] == 0)
        this.instructions.shift();
      else
        this.instructions[0][1] -= 1;
    }
    else {
      if (this.x + this.xspeed*scl < 0) {
        if (this.y + -1*scl < 0) {
          this.xspeed = 1;
          this.yspeed = 0;
        }
        else{
          this.xspeed = 0;
          this.yspeed = -1;
        }
      }
      else if (this.y + this.yspeed*scl < 0) {
        if (this.x + 1*scl > width-scl) {
          this.xspeed = 0;
          this.yspeed = 1;
        }
        else{
          this.xspeed = 1;
          this.yspeed = 0;
        }
      }
      else if (this.x + this.xspeed*scl > width-scl) {
        if (this.y + 1*scl > height-scl) {
          this.xspeed = -1;
          this.yspeed = 0;
        }
        else{
          this.xspeed = 0;
          this.yspeed = 1;
        }
      }
      else if (this.y + this.yspeed*scl > height-scl) {
        if (this.x + -1*scl < 0) {
          this.xspeed = 0;
          this.yspeed = -1;
        }
        else{
          this.xspeed = -1;
          this.yspeed = 0;
        }
      }
    }

    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;

    this.x = constrain(this.x, 0-scl, width);
    this.y = constrain(this.y, 0-scl, height);
  }

  this.show = function(){
    fill(255);
    rect(this.x, this.y, 20, 20);
  }
}
