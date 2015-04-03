var Class = require( 'findhit-class' ),
    Package = require( './package' );

// Create and export bundler
var Bundler = module.exports = Class.extend({

    options: {
        packages: false,
    },

    initialize: function ( options ) {

        // Sanitize
        this.packages = [];

        if ( options .packages ) {
            this.addPackages( packages );
        }

        // Options handling

            // Check if options argument is valid or create one
            this.options = Util.is.Object( options ) && options || {};

            // Inherit options from defaults trought prototype
            this.options.__proto__ = Bundler.defaultOptions;
    }

});

Bundler.prototype.list = function () {
    return Util.Array.map( this.packages, function ( package ) {
        return package.name;
    });
};

Bundler.prototype.addPackages = function ( packages ) {
    return ( Util.is.Array( packages ) && packages || [] )
    .map( this.addPackage.bind( this ) );
};

Bundler.prototype.addPackage = function ( package ) {

    if ( Util.isnt.instanceof( Package, package ) ) {
        throw new TypeError( "please provide a valid package instance" );
    }

    return this.packages.push( package );
};

Bundler.prototype.saveToFile = function () {

    if( this.packages.length === 0 ) {
        throw new Error( "Sorry bro, i need some packages to do that" );
    }
};
