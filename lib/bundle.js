var Package = require( './package' );

var Bundle = function ( packages, options ) {

    this.packages = Util.Array.filter( packages, function ( package ) {
        return Util.is.instanceof( Compiler, package );
    });

    if ( this.packages.length === 0 ) {
        throw new Error( "Sorry bro, i need some packages to do that" );
    }

    // Options handling

        // Check if options argument is valid or create one
        this.options = Util.is.Object( options ) && options || {};

        // Inherit options from defaults trought prototype
        this.options.__proto__ = Bundle.defaultOptions;

    // Return this instance of bundler
    return this;
};

// Inherit properties from Array
Bundle.prototype = Object.create( Array.prototype );

Bundle.defaultOptions = {
    // TODO
};

Bundle.prototype.list = function () {
    return Util.Array.map( this.packages, function ( package ) {
        return package.name;
    });
};

Bundle.prototype.compile = function () {
    // TODO
};

// Export Bundle
module.exports = Bundle;
