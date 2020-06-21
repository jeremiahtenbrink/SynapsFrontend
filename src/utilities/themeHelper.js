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

export const onAppView = ( args, ...funcs ) => {
  
  const values = {};
  mapKeyValuePairs( args, funcs, values );
  
  return ( props ) => {
    const appView = props.theme && props.theme.appView;
    if( appView in values ){
      return values[ appView ]( props );
    }
  };
};

export const onThemeValue = ( key ) => ( args, ...funcs ) => {
  
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
        console.warn( "Theme doesn't seem to have your key" );
        console.warn( "key: ", key );
      }
    }
  };
};

const mapKeyValuePairs = ( args, funcs, storage ) => {
  
  args.forEach( ( key ) => {
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
  strArray.some( ( letter ) => {
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
export const size = ( max ) => {
  let parentNodeSize = null;
  
  return ( props ) => {
    
    if( parentNodeSize === null && props.containerRef.current ){
      parentNodeSize = {
        width: props.containerRef.current.parentNode.clientWidth,
        height: props.containerRef.current.parentNode.clientHeight
      };
      
    }
    
    if( !parentNodeSize ){
      return css`
width: ${ max.width }px;
height:${ max.height }px`;
    }else{
      const parentNode = props.containerRef.current.parentNode;
      const percentW = parentNode.clientWidth / parentNodeSize.width;
      const percentH = parentNode.clientHeight / parentNodeSize.height;
      const maxP = percentW > percentH ? percentH : percentW;
      return css`
width: ${ maxP * max.width }px;
height: ${ maxP * max.height }px;
`;
    }
  };
  
};

/**
 *
 * @param {string} size
 * @param {string} color
 * @param {string} weight
 * @param {string} lineHeight
 * @param {string} family
 */
export const fontStyles = ( size, color, weight, lineHeight, family ) => {
  return css`
font-family:  ${ family || THEME.FONT_FAMILY };
font-size: ${ size || THEME.FONT_FAMILY };
color: ${ color || THEME.FONT_LIGHT };
font-weight: ${ weight || THEME.FONT_FAMILY };
line-height: ${ lineHeight || THEME.FONT_FAMILY };
  `;
};

export const inputPlaceholer = ( content ) => {
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

export const positionAbsoluteCenter = () => {
  return css`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;
};
