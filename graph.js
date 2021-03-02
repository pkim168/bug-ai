function Graph() {
  this.graph = {};
  this.path = {};

  this.addNode = function (x, y) {
    var newest = JSON.stringify([x, y]);
    f.set.add(newest);

    var keys = Object.keys(this.graph);
    if (!keys.includes(JSON.stringify([x, y]))){
      this.graph[JSON.stringify([x, y])] = {};
      keys.forEach((key) => {
        var pos = JSON.parse(key);
        var dist = Math.abs(pos[0] - x) + Math.abs(pos[1] - y);
        this.graph[newest][key] = this.graph[key][newest] = dist;
      });
    }

    this.findPath();
    this.getDirection();
    // console.log(this.graph);
  }

  this.removeNode = function (x, y) {
    var remove = JSON.stringify([x, y]);
    delete this.graph[remove];
    Object.keys(this.graph).forEach((key) => {
      delete this.graph[key][remove];
    })
    // console.log(this.graph);
  }

  this.findPath = function () {
    console.log("Graph");
    console.log(this.graph);
    console.log("Find Path");
    var posB = [b.x, b.y];
    var path = {
      path: [],
      dist: Number.MAX_VALUE
    };
    var visited = new Set();

    Object.keys(this.graph).forEach((key) => {
      var temp = new Set(visited);
      temp.add(key);
      var pos = JSON.parse(key);
      var dist = Math.abs(posB[0] - pos[0]) + Math.abs(posB[1] - pos[1]);
      var shortest = this.findPathHelper(key, temp);
      if (shortest['dist'] + dist < path['dist']) {
        path = {
          path: shortest['path'],
          dist: dist + shortest['dist']
        }
      }
    });
    this.path = path;
    console.log("Path");
    console.log(this.path);
  }

  this.findPathHelper = function (parent, visited) {
    console.log(parent);
    if (f.set.size === visited.size && [...f.set].every(value => visited.has(value))) {
      return {path: [parent], dist: 0};
    }
    var path = {
      path: [],
      dist: Number.MAX_VALUE
    };
    // console.log(this.graph);

    Object.keys(this.graph[parent]).forEach((key) => {
      var temp = new Set(visited);
      console.log(temp);
      if (temp.has(key)) {
        return;
      }
      temp.add(key);
      var child = this.findPathHelper(key, temp);
      var dist = this.graph[parent][key] + child['dist']
      if (dist < path['dist']) {
        path = {
          path: [parent].concat(child['path']),
          dist: dist
        }
      }
    });
    console.log(path);
    return path
  }

  this.getDirection = function () {
    var directions = [];
    var prev = [b.x, b.y];
    this.path['path'].forEach((key) => {
      var pos = JSON.parse(key);
      var x = pos[0] - prev[0];
      var y = pos[1] - prev[1];
      if (x > 0)
        directions.push(["right", (x/scl)-1]);
      else if (x < 0)
        directions.push(["left", (Math.abs(x)/scl)-1]);
      if (y > 0)
        directions.push(["down", (y/scl)-1]);
      else if (y < 0)
        directions.push(['up', (Math.abs(y)/scl)-1]);

      prev = [pos[0], pos[1]];

    });
    b.instructions = directions;
  }
}
