const postcss = require( "postcss" );
const autoPrefix = require( "autoprefixer" );
const stylelint = require( "stylelint" );
const postcssJs = require( "postcss-js" );
const fs = require( "fs" );
const syntax = require( "postcss-styled" )( {
  // syntax for parse css blocks (non-required options)
  css: require( "postcss-safe-parser" ),
  
} );
console.log( "running script" );
const readAndPostCss = ( fileName ) => {
  console.log( fileName );
  fs.readFile( fileName, ( req, res ) => {
    console.log( "read file" );
    postcss( [ stylelint( { fix: true } ), autoPrefix() ] )
      .process( res, { syntax: syntax, from: "stylelint", to: "/styles" } )
      .then( result => {
        result.warnings().forEach( warn => {
          console.warn( warn.toString() );
        } );
        console.log( "finished" );
        console.log( result.css );
        fs.writeFileSync( fileName, result.css );
      } ).catch( err => {
      console.log( err );
    } );
    
  } );
};

readAndPostCss(
  "F:\\currentProjects\\SynapsFrontend\\src\\svgComponents\\DeckCard.js" );



