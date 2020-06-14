import { THEME } from "./constants";
import { css } from "styled-components";

export const onPropVal = ( key ) => ( args, ...funcs ) => {
  
  const values = { key };
  mapKeyValuePairs( args, funcs, values );
  return ( props ) => {
    
    if( key in props ){
      let value = props[ key ];
      if( value in values ){
        value = values[ value ];
        if( typeof value === "function" ){
          return value( props );
        }else{
          
          return value;
        }
      }
    }else{
      console.warn( "The theme props doesn't seem to have your desired key" );
      console.warn( "key: ", key );
    }
    
  };
};

export const onThemeValue = ( key ) => ( args, ...funcs ) => {
  debugger;
  const values = { key };
  mapKeyValuePairs( args, funcs, values );
  
  return ( props ) => {
    const { theme } = props;
    if( theme ){
      if( key in theme ){
        const themeVal = theme[ key ];
        if( themeVal in values ){
          if( typeof values[ themeVal ] === "function" ){
            return values[ themeVal ]( props );
          }else{
            
            return values[ themeVal ];
          }
        }
      }else{
        console.warn( "The theme props doesn't seem to have your desired key" );
        console.warn( "key: ", key );
      }
    }
  };
};

const mapKeyValuePairs = ( args, funcs, storage ) => {
  
  debugger;
  args.forEach( ( key, i ) => {
    const split = key.split( ":" );
    
    if( split.length !== 2 ){
      return;
    }
    
    let keyValuePairs = [];
    
    split.some( word => {
      const returnedString = stripChar( word );
      if( returnedString !== "" ){
        keyValuePairs.push( returnedString );
      }
    } );
    
    if( keyValuePairs.length === 2 ){
      storage[ keyValuePairs[ 0 ] ] = keyValuePairs[ 1 ];
    }else if( keyValuePairs.length === 1 ){
      storage[ keyValuePairs[ 0 ] ] = funcs.shift();
    }
  } );
};

const stripChar = ( str ) => {
  const strArray = str.split( "" );
  let strToSendBack = "";
  let started = false;
  strArray.some( ( letter, l ) => {
    if( letter.match( /^[A-Za-z_]+$/ ) ){
      if( !started ){
        started = true;
      }
      strToSendBack += letter;
    }else{
      if( started ){
        return true;
      }
    }
  } );
  
  return strToSendBack;
};

/**
 *
 */
const size = ( max, min, dynamicallyResize = true, maxAt = { x: 1400, y: 700 },
  minAt = { x: 300, y: 600 } ) => {
  
};

/**
 *
 * @param {string} size
 * @param {string} color
 * @param {string} weight
 * @param {string} lineHeight
 * @param {string} family
 */
const fontStyles = ( size, color, weight, lineHeight, family ) => {
  return css`
font-family:  ${ family || THEME.FONT_FAMILY };
font-size: ${ size || THEME.FONT_FAMILY };
color: ${ family || THEME.FONT_FAMILY };
font-weight: ${ weight || THEME.FONT_FAMILY };
line-height: ${ lineHeight || THEME.FONT_FAMILY };
  `;
};

const inputPlaceholer = ( content ) => {
  return css`
input::placeholder,
input::placeholder.placeholder,
input::placeholder:-moz-placeholder,
input::placeholder:-ms-input-placeholder,
input::placeholder::-webkit-input-placeholder {
${ content };
}

`;
};
