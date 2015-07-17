
/**
 * Exercise: Program a MazeSolver class, which is able to solve the given Maze.
 * --------------------------------------------------------------------------------
 *
 * MazeSolver is a class requiring the following functions:
 *
 * new MazeSolver(maze): A constructor function that gets a Maze object. See below for functions available on the Maze.
 *
 * MazeSolver.findExit(): Finds the exit from the maze, returning true if found, false if not.
 *    It should somehow track the directions taken, so that a later call to getDirections() can deliver them.
 *
 * MazeSolver.getDirections(): Returns an array with directions (e.g.['down','left',right']) that lead from the
 *    start point to the exit.
 *
 *
 * The Maze object
 * -----------------
 *
 * The Maze object supports the following functions:
 *
 * Maze.explore(direction): Without walking, peek around you in a specific direction: direction is any of
 *    'left','right','up','down'. The explore function returns an info about the next cell in the given direction:
 *   0: No way, wall or otherwise blocked
 *   1: passage, can move to
 *   2: start cell
 *   3: exit! Hoorray!
 *   9: like 1, but already visited
 *
 * Maze.move(direction): Moves the player one cell in the given direction, if possible: move(dir) returns true
 *   if the movement can be done (so cell is traversable), or false if not (e.g. because there is a wall).
 *   Possible directions are 'left','right','up','down'
 *
 * Maze.isExit(): returns true if the player is on the exit pad right now. False if not.
 *
 *
 * Example movement:
 * if (maze.explore('up') === 1) {
 *    maze.move('up');
 * }
 *
 * Note
 * -------
 * jQuery ($) is available.
 *
 * Bonus
 * ----------
 *
 * Implement a MazeSolver.findExitAsync() function, which finds the maze exit in an asynchronous (background) way,
 * and returns a Promise object ($.Deferred().promise()), which will be resolved when the exit was found, and is
 * rejected when no exit was found.
 */
var MazeSolver = function(maze) {
    // your code here ....

    // Implement at least (see instructions above):
    // - this.findExit()
    // - this.getDirections()

    // Bonus:
    // - this.findExitAsync()
};
