var Package = require( './package' );

var Bundler = function ( packages, options ) {

    this.packages = Util.Array.filter( packages, function ( package ) {
        return Util.is.instanceof( Compiler, package );
    });

    if( this.packages.length === 0 ) {
        throw new Error("Sorry bro, i need some packages to do that");
    }

    // Options handling

        // Check if options argument is valid or create one
        this.options = Util.is.Object( options ) && options || {};

        // Inherit options from defaults trought prototype
        this.options.__proto__ = Bundler.defaultOptions;

    // Return this instance of bundler
    return this;
};

Bundler.defaultOptions = {
    // TODO
};

Bundler.prototype.list = function () {
    return Util.Array.map( this.packages, function ( package ) {
        return package.name;
    });
};

Bundler.prototype.saveFile = function () {
    // TODO
};

// Export Bundler
module.exports = Bundler;
