var Yargs = require( 'yargs' ),
    package = require( '../package' );

module.exports = function ( command, description ) {

    return Yargs
        .usage([
            '',
            package.name + ' ' + package.version + ' - ' + package.description,
            '',
            command + ' [options]',
            description
        ].join( '\n'))
        .help( 'help' ).alias( 'help', 'h' )
        .version( package.version , 'version' ).alias( 'version', 'V' )

};
