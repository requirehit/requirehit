#!/usr/bin/env node

var requirehit = require( '../index' );

var yargs = require( '../lib/cli' )( "rh.init", "distribution package generator" )
.options({

});

// Initialize yargs
var options = yargs.argv;

// TODO
