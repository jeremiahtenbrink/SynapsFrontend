import React from "react";
import styled, { css } from "styled-components";
import { onPropVal, onThemeValue } from "../../utilities/themeHelper";
import { Button } from "antd";
import { darken, lighten } from "polished";
import { withDimensions } from "../withHocs/withDimensions";

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
    { props.text && <p>{ props.text }</p> }
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
  debugger;
  return css`
${ background };
`;
} };
`;

const onTheme = onThemeValue( "background" )`
dark: ${ themeDark };
light: ${ themeLight }
`;

const Container = styled( Button )`


&& {
${ onTheme };
  display: flex;
}`;



