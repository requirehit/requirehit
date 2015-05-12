module.exports = exports = require( './lib/requirehit.js' ) || {};

// Needed by our main engine (this repo)
exports.Package = require( 'requirehit-package' );

// Exposing part of our engine that is modulated
exports.Browser = require( 'requirehit-browser' );

// Extendable classes
// exports.Adapter = require( 'requirehit-adapter' );
// exports.Storage = require( 'requirehit-storage' );
// exports.Builder = require( 'requirehit-builder' );
