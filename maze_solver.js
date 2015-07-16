var MazeSolver = function(maze) {
    var directions = [];

    var findExitAsync = function() {
        var deferred = $.Deferred();

        if (maze.isExit() === true) {
            deferred.resolve();
        } else {
            setTimeout(function(){
                if (maze.explore('left') !== 9 && maze.left()) {
                    findExitAsync()
                    .then(function(){
                        directions = ['left'].concat(directions);
                        return deferred.resolve();
                    })
                    .fail(function(){
                        maze.right();
                        findExitAsync().then(deferred.resolve).fail(deferred.reject);
                    });
                } else if (maze.explore('up') !== 9 && maze.up()) {
                    findExitAsync().then(function(){
                        directions = ['up'].concat(directions);
                        return deferred.resolve();
                    }).fail(function(){
                        maze.down();
                        findExitAsync().then(deferred.resolve).fail(deferred.reject);
                    });
                } else if (maze.explore('right') !== 9 && maze.right()) {
                    findExitAsync().then(function(){
                        directions = ['right'].concat(directions);
                        return deferred.resolve();
                    }).fail(function(){
                        maze.left();
                        findExitAsync().then(deferred.resolve).fail(deferred.reject);
                    });
                } else if (maze.explore('down') !== 9 && maze.down()) {
                    findExitAsync().then(function(){
                        directions = ['down'].concat(directions);
                        return deferred.resolve();
                    }).fail(function(){
                        maze.up();
                        deferred.reject();
                    });
                } else {
                    deferred.reject();
                }
            },50);
        }
        return deferred.promise();
    };

    var findExit = function() {
        if (maze.isExit() === true) {
            return true;
        }
        if (maze.explore('left') !== 9 && maze.left()) {
            if (findExit()) {
                directions = ['left'].concat(directions);
                return true;
            } else {
                maze.right();
            }
        }

        if (maze.explore('up') !== 9 && maze.up()) {
            if (findExit()) {
                directions = ['up'].concat(directions);
                return true;
            } else {
                maze.down();
            }
        }

        if (maze.explore('right') !== 9 && maze.right()) {
            if (findExit()) {
                directions = ['right'].concat(directions);
                return true;
            } else {
                maze.left();
            }
        }

        if (maze.explore('down') !== 9 && maze.down()) {
            if (findExit()) {
                directions = ['down'].concat(directions);
                return true;
            } else {
                maze.up();
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