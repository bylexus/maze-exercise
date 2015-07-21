var MazeSolver = function(maze) {
    var directions = [];

    var findExitAsync = function() {
        var deferred = $.Deferred();

        if (maze.isExit() === true) {
            deferred.resolve();
        } else {
            setTimeout(function(){
                if (maze.explore('left') !== 9 && maze.move('left')) {
                    findExitAsync()
                    .then(function(){
                        directions = ['left'].concat(directions);
                        return deferred.resolve();
                    })
                    .fail(function(){
                        maze.move('right');
                        findExitAsync().then(deferred.resolve).fail(deferred.reject);
                    });
                } else if (maze.explore('up') !== 9 && maze.move('up')) {
                    findExitAsync().then(function(){
                        directions = ['up'].concat(directions);
                        return deferred.resolve();
                    }).fail(function(){
                        maze.move('down');
                        findExitAsync().then(deferred.resolve).fail(deferred.reject);
                    });
                } else if (maze.explore('right') !== 9 && maze.move('right')) {
                    findExitAsync().then(function(){
                        directions = ['right'].concat(directions);
                        return deferred.resolve();
                    }).fail(function(){
                        maze.move('left');
                        findExitAsync().then(deferred.resolve).fail(deferred.reject);
                    });
                } else if (maze.explore('down') !== 9 && maze.move('down')) {
                    findExitAsync().then(function(){
                        directions = ['down'].concat(directions);
                        return deferred.resolve();
                    }).fail(function(){
                        maze.move('up');
                        deferred.reject();
                    });
                } else {
                    deferred.reject();
                }
            },20);
        }
        return deferred.promise();
    };

    var findExit = function() {
        if (maze.isExit() === true) {
            return true;
        }
        if (maze.explore('left') !== 9 && maze.move('left')) {
            if (findExit()) {
                directions = ['left'].concat(directions);
                return true;
            } else {
                maze.move('right');
            }
        }

        if (maze.explore('up') !== 9 && maze.move('up')) {
            if (findExit()) {
                directions = ['up'].concat(directions);
                return true;
            } else {
                maze.move('down');
            }
        }

        if (maze.explore('right') !== 9 && maze.move('right')) {
            if (findExit()) {
                directions = ['right'].concat(directions);
                return true;
            } else {
                maze.move('left');
            }
        }

        if (maze.explore('down') !== 9 && maze.move('down')) {
            if (findExit()) {
                directions = ['down'].concat(directions);
                return true;
            } else {
                maze.move('up');
            }
        }
        return false;
    };

    this.getDirections = function() {
        return directions;
    };
    this.findExitAsync = function(){
        directions = [];
        return findExitAsync();
    };

    this.findExit = function(){
        directions = [];
        return findExit();
    };
};
