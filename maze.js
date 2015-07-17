// for maze generation, see e.g.:
// http://rosettacode.org/wiki/Maze_generation
var Maze = function(mazeContainer) {
    mazeContainer = $(mazeContainer);

    /*var originalMaze = [
        // 0 = wall
        // 1 = passage
        // 2 = start
        // 3 = target / exit
        // 9 = passage, visited
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,0,0,1,0,0,1,0,0,0,0],
        [0,1,0,1,0,0,0,1,1,1,1,0,0,0,0],
        [0,1,1,1,1,1,1,0,1,0,1,1,1,1,0],
        [0,1,0,0,0,0,1,0,1,1,1,0,0,1,0],
        [0,1,0,0,0,1,1,0,0,1,0,0,0,1,3],
        [1,1,1,0,0,1,0,0,0,1,0,0,0,1,0],
        [1,0,1,1,0,0,0,1,1,1,1,1,1,1,0],
        [1,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0]
    ]*/
    var originalMaze = amaze(10,10);
    var maze = null;


    var actPos = [0,0],
        blockWidth = 40;

    var cloneMaze = function(mazeArr) {
        var x = 0, y = 0;
        var newMaze = [];
        var line;
        for (y = 0; y < mazeArr.length; y++) {
            line = [];
            for (x = 0; x < mazeArr[y].length; x++) {
                line[x] = mazeArr[y][x];
            }
            newMaze.push(line);
        }
        return newMaze;
    };

    var init = function() {
        var x = 0, y = 0;

        // find player's start position
        for (x = 0; x < originalMaze[y].length; x++) {
            if (originalMaze[0][x] === 1 || originalMaze[0][x] === 2) {
                originalMaze[0][x] = 2;
                actPos = [0,x];
            }
            if (originalMaze[originalMaze.length-1][x] === 1) {
                originalMaze[originalMaze.length-1][x] = 3;
            }
        }

        maze = cloneMaze(originalMaze);

        mazeContainer.css({
            'position': 'relative',
            'width': (blockWidth * maze[0].length) + 'px',
            'height': (blockWidth * maze.length) + 'px',
            'border': '5px solid grey',
            'background-color': '#333'
        });
        move(actPos);
        drawMaze();

    };

    var getColorForBlockNr = function(nr) {
        switch (nr) {
            case 0: return '#333';
            case 1: return '#888';
            case 2: return '#888';
            case 3: return '#0f0';
            case 9: return '#ccc';
        }
    };

    var drawMaze = function() {
        var el,
            x = 0, y = 0;
        mazeContainer.html('');
        for (y = 0; y < maze.length; y++) {
            for (x = 0; x < maze[y].length; x++) {
                el = $('<div></div>')
                .css({
                    'position': 'absolute',
                    'width': blockWidth + 'px',
                    'height': blockWidth + 'px',
                    'left': (blockWidth * x) + 'px',
                    'top': (blockWidth * y) + 'px',
                    'background-color': getColorForBlockNr(maze[y][x])
                });
                mazeContainer.append(el);
            }
        }
        // player
        mazeContainer.append($('<div></div>').css({
            'position': 'absolute',
            'width': blockWidth + 'px',
            'height': blockWidth + 'px',
            'left': (actPos[1] * blockWidth) + 'px',
            'top': (actPos[0] * blockWidth) + 'px',
            'background-color': '#f22',
            'border-radius': blockWidth/2 + 'px'
        }));
    };

    var validPosition = function(pos) {
        if (pos[0] < 0) return false;
        if (pos[0] >= maze.length) return false;
        if (pos[1] < 0) return false;
        if (pos[1] >= maze[0].length) return false;
        if (maze[pos[0]][pos[1]] === 0) return false;
        return true;
    };

    var markVisited = function(pos) {
        maze[pos[0]][pos[1]] = 9;
    };

    var move = function(pos) {
        if (validPosition(pos)) {
            actPos = pos;
            markVisited(actPos);
            drawMaze();
            return true;
        } else {
            return false;
        }
    };

    var up = function() {
        return move([actPos[0]-1,actPos[1]]);
    };
    var down = function() {
        return move([actPos[0]+1,actPos[1]]);
    };
    var left = function() {
        return move([actPos[0],actPos[1]-1]);
    };
    var right = function() {
        return move([actPos[0],actPos[1]+1]);
    };

    this.move = function(dir) {
        switch(dir) {
            case 'up': return up();
            case 'down': return down();
            case 'left': return left();
            case 'right': return right();
        }
    };

    this.isExit = function() {
        return originalMaze[actPos[0]][actPos[1]] === 3;
    };

    this.explore = function(dir) {
        var pos = [actPos[0],actPos[1]];
        switch(dir) {
            case 'up': pos[0]--; break;
            case 'down': pos[0]++; break;
            case 'left': pos[1]--; break;
            case 'right': pos[1]++; break;
        }
        if (!validPosition(pos)) return 0;
        return maze[pos[0]][pos[1]];
    };

    this.reset = function(){
        init();
    };

    init();
};
