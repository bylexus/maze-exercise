$(document).ready(function(){
    var maze,solver;

    var configureMaze = function() {
        $('#mazecontainer').html('');
        maze = new Maze(
            $('#mazecontainer'),
            $('#blocksX').val(),
            $('#blocksY').val(),
            $('#blockWidth').val(),
            $('#generator').val());
        solver = new MazeSolver(maze);
        window.maze = maze;
        window.solver = solver;
    };

    configureMaze();

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

    $('#configureMaze').on('click', function(){
        configureMaze();
    });

});
