#!/usr/bin/env node

'use strict';

var RequireHit = require( '../../index' ),
    Util = require( 'findhit-util' )

    package = require( '../package' ),

    prompt = require( 'prompt' ),
    Util = require( 'findhit-util' ),
    Promise = require( 'bluebird' ),
    fs = Promise.promisifyAll(require("fs")),
    Package = require( 'requirehit-package' );

global.yargs
    .reset()
    .options({

        'requirehit.path': {
            description: 'path to generic `requirehit.js`',
            default: 'requirehit.js'
        },

        'name': {
            description: 'package name',
            type: 'string',
        },

        'description': {
            description: 'package description',
            type: 'string',
        },

        'version': {
            description: 'package version',
            type: 'string',
        },

    });


// Initialize yargs
var options = prompt.override = global.yargs.argv;

prompt.message = 'Package'.rainbow;
prompt.delimiter = ' ';
prompt.start();

prompt.get = Promise.promisify( prompt.get );

// Start a promise chain! :)
Promise.cast()

    // Create a package for contextualize current promise chain
    .bind( new Package() )

    // If there is a package file, cancel
    .then(function () {


        console.log( fs.exists( options.requirehit.path ) );
        /*    .then(function ( exists ) {
                if( exists ) {
                    throw new Error( "It seems that there is already a `"+ options.rh.path +"` file" );
                }
            });*/
    })

    // I've gonna ask some questions so we can autoconfigure :)
    .then(function () {
        return prompt.get([

                {
                    name: 'name',
                    type: 'string',
                    required: true,
                    default: package.name,
                },

                {
                    name: 'description',
                    type: 'string',
                    required: true,
                    default: package.description,
                },

                {
                    name: 'version',
                    type: 'string',
                    required: true,
                    default: package.version || '0.0.1',
                },

                {
                    name: 'dependencies',
                    type: 'array',
                }

        ])
            // Now we should have results!
            .then(function ( results ) {
                // Merge results into Package
                Util.extend( this, results );
            });
    })

    // GOGOGO, save it
    .then(function () {
        return this.save( options['rh.path'] );
    })

    .catch(function ( err ) {
        console.error.call( console, [ "\n",
            "WARNING: It seems that something went wrong...",
            "Reason: " + err.message,
        ].join("\n"));
    });
