const postcss = require( "postcss" );
const stylelint = require( "stylelint" );
const reporter = require( "postcss-reporter" );
const syntax = require( "postcss-styled" )( {
  // syntax for parse css blocks (non-required options)
  css: require( "postcss-safe-parser" ),
} );

postcss( [
  stylelint( { fix: true } ), reporter( { clearReportedMessages: true } ),
] )
  .process( [ "./**/*.js" ], { syntax: syntax, from: undefined } )
  .then( function( result ){
    // An alias for the result.css property. Use it with syntaxes that generate
    // non-CSS output.
    result.content;
  } );