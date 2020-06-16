import React from "react";
import styled from "styled-components";
import { getComponentDisplayName } from "../../utilities/getComponentDisplayName";

/**
 *   WithSize
 *
 *  @component
 *
 */
const withSize = ( Component, dimenstions ) => ( props ) => {
  const ref = useRef();
  Component.displayName = `WithSize(${ getComponentDisplayName( Component ) })`;
  const calcSize = ( props ) => {
    debugger;
    
    if( ref.current ){
      dimensions.default.height;
      dimenstions.default.width;
    }else{
    
    }
  };
  `
  
  
  
  return  <Component ref={ref}  {...props}/>
  
}

const Container = styled.div``;

WithSize.propTypes = {};

export default WithSize;