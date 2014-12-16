#!/usr/bin/env node

var requirehit = require( '../index' )
    Util = require( 'findhit-util' );

var yargs = require( '../lib/cli' )( "rh.serve", "creates a distribution folder with all needed modules" )
    .options({

        config: {
            alias: 'c',
            description: 'js file that exports a rh.serve configuration object'
        },

    });

// Initialize yargs
var options = yargs.argv;

// Check if we should load config
if( options.config ) {
    var origconfig = require( options.config );

    if( Util.is.Object( origconfig ) ) {

        // Extend recursively
        Util.extend( true, options, origconfig );
    }
}

// If target folder exists:
    // Empty it
// Otherwise
    // Create it

// Load all modules into folder

// Generate a bundle for initializing requirehit correctly
    // Save it as requirehit.bundle.js on target folder
