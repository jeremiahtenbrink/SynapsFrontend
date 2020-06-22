import React from "react";
import styled from "styled-components";

/**
 *   StyledSvg
 *
 *  @component
 *
 */
const StyledSvg = ( props ) => {
  
  const newProps = parseProps( props );
  
  return ( <StyledSvgComponent { ...newProps } >
    { props.children }
  </StyledSvgComponent> );
};

export const parseProps = ( props = {} ) => {
  const newProps = {};
  Object.keys( props ).forEach( key => {
    if( key.includes( "-" ) ){
      const keyArray = key.split( "-" );
      let newKey;
      for( let i = 0; i < keyArray.length; i++ ){
        if( i === 0 ){
          newKey = keyArray[ i ];
        }else{
          newKey += keyArray[ i ].charAt( 0 ).toUpperCase() +
            keyArray[ i ].slice( 1 );
        }
      }
      newProps[ newKey ] = props[ key ];
    }else{
      newProps[ key ] = props[ key ];
    }
    
  } );
  
  return newProps;
};

const StyledSvgComponent = styled.svg`
overflow: visible;
`;

StyledSvg.propTypes = {};

export default StyledSvg;