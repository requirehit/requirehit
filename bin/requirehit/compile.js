#!/usr/bin/env node

'use strict';

var RequireHit = require( '../../index' ),
    Util = require( 'findhit-util' );

global.yargs
    .reset()
    .options({

    });

// Initialize yargs
var argv = global.yargs.argv;
