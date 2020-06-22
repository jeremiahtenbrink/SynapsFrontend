import React from "react";
import styled, { css } from "styled-components";
import { BaseContainer } from "./BaseContainer";
import { onThemeValue } from "../../utilities/themeHelper";

/**
 *   InsideRouteContainer
 *
 *  @component
 *
 */
export const InsideRouteContainer = ( props ) => {
  return ( <Container{ ...props }>
  
  </Container> );
};

const styles = onThemeValue( "appView" )`
desktop: ${ () => css`
padding: 47px;
` };
mobile: ${ () => css`
padding: 18px;
` }
`;

const Container = styled( BaseContainer )`
display: flex;
flex-direction: column;
${ styles };
`;

InsideRouteContainer.propTypes = {};
