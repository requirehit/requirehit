#!/usr/bin/env node

'use strict';

var package = require( '../package' );

global.yargs = require( 'yargs' )
    .usage('$0 command [options]')
    .help( 'help' ).alias( 'help', 'h' )
    .version( package.version , 'version' ).alias( 'version', 'V' )

    // Commands

  .command( 'skeleton', 'initializes a skeleton for an rh package' )
  .command( 'init', 'creates a .rh config based on your package.json if you have one' )
  .command( 'build', 'builds a distribution package and optional packages if you have them')
  .command( 'serve', 'builds all dependecy tree packages, creates a tmp folder and serves all built packages' )

  .demand( 1, 'must provide a valid command' );

var command = global.yargs._[0];

switch ( command ) {

    case 'init':
    case 'compile':
    case 'serve':
        require( './'+ command );
        break;

    default:
        console.error( "Command not found, please check --help" );
        break;
}
