const postcss = require( "postcss" );
const autoPrefix = require( "autoprefixer" );
const stylelint = require( "stylelint" );
const postcssJs = require( "postcss-js" );
const fs = require( "fs" );
const syntax = require( "postcss-styled" )( {
  // syntax for parse css blocks (non-required options)
  css: require( "postcss-safe-parser" ),
  
} );

var css = fs.readFileSync( "./src/routes/RouteContainer.js", "utf8" );

const processesFiles = ( dir ) => {
  fs.readdir( "./src/", {}, ( req, res ) => {
    res.forEach( fileName => {
      
      if( fileName.isDirectory() ){
        return processesFiles( fileName );
      }
      
      fs.readFile( fileName, ( req, res ) => {
        postcss( [ stylelint( { fix: true } ), autoPrefix() ] )
          .process( css, { syntax: syntax, from: "stylelint", to: "/styles" } )
          .then( result => {
            result.warnings().forEach( warn => {
              console.warn( warn.toString() );
            } );
            fs.writeFile( fiileName, result.css, ( req, res ) => {
              console.log( fileName );
            } );
            
          } ).catch( err => {
          console.log( err );
        } );
      } );
      
    } );
  } );
};