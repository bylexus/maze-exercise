// for maze generation, see e.g.:
// http://rosettacode.org/wiki/Maze_generation
var Maze = function(mazeContainer, mazeWidth, mazeHeight) {
    var originalMaze,
        maze = null,
        canvas = null,
        borderWidth = 10,
        actPos = [0,0],
        blockWidth = 20,
        cloneMaze = function(mazeArr) {
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
        }.bind(this),

        initMazeData = function() {
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
        }.bind(this),

        init = function() {
            mazeContainer = $(mazeContainer);
            mazeWidth = mazeWidth || 10;
            mazeHeight = mazeHeight || 10;
            originalMaze = amaze(mazeWidth, mazeHeight);
            initMazeData();

            canvas = $('<canvas></canvas>').attr({
                width: blockWidth * maze[0].length + 2*borderWidth,
                height: (blockWidth * maze.length + 2*borderWidth)})[0];

            mazeContainer.html(canvas);
            move(actPos);

        }.bind(this),

        getColorForBlockNr = function(nr) {
            switch (nr) {
                case 0: return '#333';
                case 1: return 'rgba(127,127,127,0.3)';
                case 2: return '#888';
                case 3: return '#0f0';
                case 9: return '#ccc';
            }
        }.bind(this),

        drawMaze = function() {
            var el,
                x = 0, y = 0,
                ctx = canvas.getContext("2d"),
                backGradient = ctx.createLinearGradient(0,0,0,canvas.height);
                backGradientRev = ctx.createLinearGradient(0,0,0,canvas.height);

            backGradient.addColorStop(0,'#fff');
            backGradient.addColorStop(1,'#aaa');

            backGradientRev.addColorStop(1,'#ccc');
            backGradientRev.addColorStop(0,'#888');

            ctx.setTransform(1, 0, 0, 1, 0, 0); // reset any transformation
            ctx.fillStyle = backGradientRev;
            ctx.fillRect(0,0,canvas.width,canvas.height);


            ctx.fillStyle = backGradient;
            ctx.fillRect(borderWidth,borderWidth,canvas.width-2*borderWidth,canvas.height-2*borderWidth);

            ctx.translate(borderWidth,borderWidth);

            for (y = 0; y < maze.length; y++) {
                for (x = 0; x < maze[y].length; x++) {
                    ctx.fillStyle = getColorForBlockNr(maze[y][x]);
                    ctx.fillRect(
                        blockWidth * x,
                        blockWidth * y,
                        blockWidth,
                        blockWidth
                    );
                }
            }
            // player
            ctx.beginPath();
            ctx.fillStyle = '#f22';
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.arc(
                actPos[1] * blockWidth+(blockWidth/2.0),
                actPos[0] * blockWidth+(blockWidth/2.0),
                blockWidth/2.0*0.8,
                0,
                2*Math.PI
            );
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
                actPos[1] * blockWidth+(blockWidth/2.0),
                actPos[0] * blockWidth+(blockWidth/2.0),
                blockWidth/2.0*0.8,
                0,
                2*Math.PI
            );
            ctx.stroke();
        }.bind(this),

        validPosition = function(pos) {
            if (pos[0] < 0) return false;
            if (pos[0] >= maze.length) return false;
            if (pos[1] < 0) return false;
            if (pos[1] >= maze[0].length) return false;
            if (maze[pos[0]][pos[1]] === 0) return false;
            return true;
        }.bind(this),

        markVisited = function(pos) {
            maze[pos[0]][pos[1]] = 9;
        }.bind(this),

        move = function(pos) {
            if (validPosition(pos)) {
                actPos = pos;
                markVisited(actPos);
                drawMaze();
                return true;
            } else {
                return false;
            }
        }.bind(this),

        up = function() {
            return move([actPos[0]-1,actPos[1]]);
        }.bind(this),

        down = function() {
            return move([actPos[0]+1,actPos[1]]);
        }.bind(this),

        left = function() {
            return move([actPos[0],actPos[1]-1]);
        }.bind(this),

        right = function() {
            return move([actPos[0],actPos[1]+1]);
        }.bind(this);

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



    this.reset = function() {
        initMazeData();
        move(actPos);
    };

    init();
};
