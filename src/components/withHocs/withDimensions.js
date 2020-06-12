import React from "react";

/**
 *   WithDimensions
 *
 *  @component
 *
 */
export const withDimensions = ( dimensions, Component ) => {
  
  const calcHeight = ( props ) => {
    let percent = props.theme.width / 1440;
    if( percent > 1 ){
      percent = 1;
    }
    console.log( "cal size" );
    return `
    height: ${ dimensions.height * percent }px;
    width: ${ dimensions.width * percent }px;
    `;
  };
  
  if( dimensions && Component.componentStyle.rules ){
    let setNewValue = false;
    Component.componentStyle.rules.forEach( ( rule, i ) => {
      if( typeof rule !== "string" ){
        if( rule.name === "calcHeight" ){
          setNewValue = true;
        }
      }
    } );
    if( !setNewValue ){
      debugger;
      Component.componentStyle.rules.push( calcHeight );
    }
  }
  
  return ( props ) => ( <Component { ...props } >
  
  </Component> );
};

withDimensions.propTypes = {};
