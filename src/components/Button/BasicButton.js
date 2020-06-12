import React from "react";
import styled, { css } from "styled-components";
import { mapToTheme } from "styled-map";
import theme from "../../utilities/theme.js";
import { Button } from "antd";
import { lighten, darken } from "polished";

/**
 *   Button
 *
 *  @component
 *
 */
export const BasicButton = ( { children, ...props } ) => {
  
  return ( <Container { ...props }
                      shape={ "round" }>
    { children }
  </Container> );
};

const bgColor = {
  primary: "#5C6078",
  secondary: "#4CB69F",
  transparent: "transparent",
};

export const ButtonTheme = ( props ) => {
  
  let background = bgColor[ props.type ];
  if( props.light ){
    background = lighten( .3, background );
  }else if( props.darken ){
    background = darken( .3, background );
  }
  return css`
background:  ${ background };
  `;
};

const Container = styled( Button )`
&&{
display: flex;
${ ButtonTheme };
}
};
`;