#!/usr/bin/env node

var requirehit = require( '../index' );

var yargs = require( '../lib/cli' )( "rh.compile", "distribution package generator" )
    .options({

    });

// Initialize yargs
var options = yargs.argv;

// TODO
