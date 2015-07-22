/**
 * Maze Generator class implementing a Depth First algorithm
 *
 * @see http://rosettacode.org/wiki/Maze_generation#JavaScript
 */
var DepthFirstGenerator = function(cols, rows) {
	this.cols = Number(cols) || 10;
	this.rows = Number(rows) || 10;
};
DepthFirstGenerator.prototype.buildMaze = function(x,y) {
	var n=x*y-1;
	if (n<0) {alert("illegal maze dimensions");return;}
	var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
	    verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [],
	    here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
	    path = [here],
	    unvisited = [];
	for (var j = 0; j<x+2; j++) {
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors = [];
		for (var j = 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n = n-1;
			next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here = next);
		} else 
			here = path.pop();
	}
	return {x: x, y: y, horiz: horiz, verti: verti};
};

DepthFirstGenerator.prototype.generate = function() {
	var m = this.buildMaze(this.cols,this.rows);
	var maze = [],
		line,
		x,y;

	// init wall-filled maze:
	for (y = 0; y < (2*m.x+1); y++) {
		line = [];
		for (x = 0; x < (2*m.y+1); x++) {
			line[x] = y % 2 === 1 && x % 2 === 1? 1:0;
		}
		maze.push(line);
	}

	// break down horizontal walls
	for (y = 0; y < m.horiz.length; y++) {
		for (x = 0; x < m.horiz[y].length; x++) {
			if(m.horiz[y][x]) {
				maze[y*2+1][x*2+2] = 1
			}
		}
	}

	// break down vertical walls:
	for (y = 0; y < m.verti.length; y++) {
		for (x = 0; x < m.verti[y].length; x++) {
			if(m.verti[y][x]) {
				maze[y*2+2][x*2+1] = 1
			}
		}
	}
	// create 2 entries (top left, bottom right):
	maze[0][1] = 1;
	maze[maze.length-1][maze[0].length-2] = 1;
	return maze;
}
