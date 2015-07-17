$(document).ready(function(){
    var maze = new Maze($('#maze2'));
    var solver = new MazeSolver(maze);
    window.maze = maze;
    window.solver = solver;

    $('#startAsync').on('click', function(){
        if (!solver.findExitAsync) return alert('Async method not implemented.');
        maze.reset();
        $('button').attr('disabled',true);

        $('#output').html('wait, searching exit ...');
        solver.findExitAsync().then(function(){
            $('#output').html('<div>found the exit! Use the following directions</div>').append(solver.getDirections().join(', '));
        }).fail(function(){
            $('#output').html('found no exit :-(((');
        }).done(function(){
            $('button').attr('disabled',false);
        });
    });

    $('#startSync').on('click', function(){
        maze.reset();
        $('button').attr('disabled',true);

        $('#output').html('');
        if (solver.findExit()) {
            $('#output').html('<div>found the exit! Use the following directions</div>').append(solver.getDirections().join(', '));
        } else {
            $('#output').html('found no exit :-(((');
        }
        $('button').attr('disabled',false);
    });

    $('#reset').on('click', function(){
        maze.reset();
    });

});
