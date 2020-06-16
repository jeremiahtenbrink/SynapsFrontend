import React from "react";
import styled, { css } from "styled-components";
import {
  fontStyles, onPropVal, onThemeValue, positionAbsoluteCenter
} from "../../utilities/themeHelper";
import { Button } from "antd";
import { darken, lighten } from "polished";
import { withDimensions } from "../withHocs/withDimensions";
import { colorPallet as THEME } from "../../utilities/colorPallet";

/**
 *   Button
 *
 *  @component
 *
 */
export const BasicButton = ( { children, dimensions, ...props } ) => {
  
  const ContainerWithDimension = withDimensions( dimensions, Container );
  
  return ( <ContainerWithDimension { ...props }
                                   shape={ "round" }>
    { children }
  </ContainerWithDimension> );
  
};

const lightOrDark = ( props, color ) => {
  if( props.light ){
    color = lighten( .2, color );
  }else if( props.dark ){
    color = darken( .2, color );
  }
  return color;
};

const themeDark = onPropVal( "buttonType" )`
primary: ${ ( props ) => {
  const background = lightOrDark( props,
    props.theme.colors.PRIMARY_COLOR_LIGHTER_4
  );
  return css`
background: ${ background };
`;
} };
secondary: ${ ( props ) => {
  const background = lightOrDark( props, "#4CB69F" );
  return css`
background: ${ background };
`;
} };
gradient: ${ ( props ) => {
  const background = lightOrDark( props, "#4CB69F" );
  return css`
background: ${ background };
`;
} };
transparent: ${ ( props ) => {
  const background = lightOrDark( props, "#4CB69F" );
  return css`
background: ${ background };
`;
} };
`;

const themeLight = onPropVal( "buttonType" )`
primary: ${ ( props ) => {
  const background = lightOrDark( props,
    props.theme.colors.PRIMARY_COLOR_LIGHTER_4
  );
  return css`
${ background };
`;
} };
secondary: ${ ( props ) => {
  const background = lightOrDark( props, "#4CB69F" );
  return css`
${ background };
`;
} };
transparent: ${ ( props ) => {
  const background = lightOrDark( props, "#4CB69F" );
  
  return css`
${ background };
`;
} },
gradient: ${ ( props ) => {
  const background = THEME.GREEN_TO_BLUE_GRADIENT.backgroundImage;
  
  return css`
${ background };
`;
} }
`;

const onTheme = onThemeValue( "background" )`
dark: ${ themeDark };
light: ${ themeLight }
`;

const Container = styled( Button )`


&& {
${ onTheme };
  display: flex;
  border: 4px solid white;
  p{
    
    ${ fontStyles( "28px", "white", 700, 1.1 ) };
    width: 100%;
    height: 100%;
    ${ positionAbsoluteCenter() };
    top: 70%;
  }
  .one{
     top: 50%;
     left: 50%;
     opacity: .8;
     color: ${ THEME.WHITE_DARKER_1 };
  }
  
  .two{
     top: 50.2%;
     left: 50.2%;
     opacity: .6;
     color: ${ THEME.WHITE_DARKER_2 };
  }
  
  .three{
     top: 50.4%;
     left: 50.4%;
     opacity: .4;
     color: ${ THEME.WHITE_DARKER_3 };
  }
  
  .four{
     top: 50.6%;
     left: 50.6%;
     opacity: .2;
     color: ${ THEME.WHITE_DARKER_4 };
  }
  
  .five{
     top: 50.8%;
     left: 50.8%;
     opacity: .1;
     color: ${ THEME.WHITE_DARKER_4 };
  }
  
}`;



