import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { APP_PATHS, SIZES } from "../../utilities/constants.js";
import { useAppHooks } from "../../customHooks/useAppHooks.js";

/**
 *   RouteContainer
 *
 *  @component
 *
 */
export const RouteContainerComponent = ( props ) => {
  const { appView, theme } = useAppHooks();
  const width = theme.width < SIZES.tablet ? "100%" : "1140px";
  
  useEffect( () => {
    console.log( appView );
  }, [ appView ] );
  
  return ( <Container id={ "route-container" } className={ props.className }
                      key={ "router-container" } minWidth={ width }>
    { props.children }
  </Container> );
};

const Container = styled.div`
&& {
display: flex;
align-self: center;
min-height: 700px;
z-index: 12;
max-width: ${ props => props.minWidth };
width: 100%;
margin-top: 100px;
border-radius: 15px;
flex-direction: row;
${ ( { theme } ) => {
  const pathsToExlude = [
    APP_PATHS.SIGN_IN_PATH, APP_PATHS.SIGN_UP_PATH, APP_PATHS.LANDING_PAGE,
  ];
  if( pathsToExlude.includes( theme.path ) ){
    return css`
            background: transparent;
            padding: 47px;
            `;
  }else{
    return css`
            background: white;
            padding: 15px;
            `;
  }
} };

}





`;

