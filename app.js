var maze = new Maze($('#maze'));
var solver = new MazeSolver(maze);

$('#startAsync').on('click', function(){
    maze.reset();
    $('#startAsync').attr('disabled',true);
    $('#startSync').attr('disabled',true);
    $('#reset').attr('disabled',true);

    $('#output').html('wait, searching exit ...');
    solver.findExitAsync().then(function(){
        $('#output').html('<div>found the exit! Use the following directions</div>').append(solver.getDirections().join(', '));
    }).fail(function(){
        $('#output').html('found no exit :-(((');
    }).done(function(){
        $('#startAsync').attr('disabled',false);
        $('#startSync').attr('disabled',false);
        $('#reset').attr('disabled',false);
    });
});

$('#startSync').on('click', function(){
    maze.reset();
    $('#startAsync').attr('disabled',true);
    $('#startSync').attr('disabled',true);
    $('#reset').attr('disabled',true);

    $('#output').html('');
    if (solver.findExit()) {
        $('#output').html('<div>found the exit! Use the following directions</div>').append(solver.getDirections().join(', '));
    } else {
        $('#output').html('found no exit :-(((');
    }
    $('#startAsync').attr('disabled',false);
    $('#startSync').attr('disabled',false);
    $('#reset').attr('disabled',false);
});

$('#reset').on('click', function(){
    maze.reset();
});
