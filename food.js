function Food() {
  this.graph = new Graph();
  this.set = new Set();

  this.newFood = function(mouseX, mouseY) {
  	posX = Math.floor(mouseX/scl)*scl;
  	posY = Math.floor(mouseY/scl)*scl;
		if(dist(posX, posY, b.x, b.y) < 1) {
			return;
		}
    this.graph.addNode(posX, posY);
  }

  // this.insertion = function (x, y, total) {
  //
  // }

  // this.pathfinding = function () {
  //   for (let coord of this.set) {
  //     var pos = JSON.parse(coord);
  //     var x = Math.abs(pos[0] - this.x);
  //     var y = Math.abs(pos[1] - this.y);
  //     insertion([x, y, x+y])
  //
  //   }
  //
  //   for()
  //
  //   // Check if tail segment is in path. if so, find index of tail segment. Find how many tail segments are after that one = now much time until space is cleared
  //
  // }

  this.show = function(x, y) {
    for (let coord of this.set) {
      var pos = JSON.parse(coord);
    	fill(255, 0, 100);
    	rect(pos[0], pos[1], 20, 20);
    }
  }

  this.eat = function(x, y) {
    // console.log("eat");
    posB= JSON.stringify([x, y]);
    if (this.set.has(posB)) {
      this.set.delete(posB);
      this.graph.removeNode(x, y);
    }
  }

}
