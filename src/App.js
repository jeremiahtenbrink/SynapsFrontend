import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Footer, NavBar, RouteContainer } from "./components";
import { BaseContainer } from "./components/Container/BaseContainer.js";
import { SvgBrainPic } from "./svgComponents";
import PropTypes from "prop-types";
import { Alert } from "antd";
import { useAuthStateChange } from "./customHooks/useAuthStateChange.js";
import {
  THEMING_VALUES, THEMING_VARIABLES,
} from "./customHooks/themingRules.js";
import { APP_VIEW_DESKTOP, THEME } from "./utilities/constants.js";
import { useTheming } from "./customHooks/useTheming.js";
import { useAppHooks } from "./customHooks/useAppHooks.js";

/**
 * App
 * @category Views
 * @component
 * @example return (<App />);
 * @param getHooks
 * @return {*}
 */
export default function App( props ){
  
  const [ alertMessage, setAlert ] = useState( "" );
  const { theme, usersState, getHooks, appView } = useAppHooks();
  const getValue = useTheming();
  
  useAuthStateChange( getHooks );
  
  const deleteClick = ( e ) => {
  
  };
  
  useEffect( () => {
    if( usersState.registerError && !alertMessage ){
      setAlert( "Error logging in. Please try again later." );
    }
  }, [ usersState ] );
  
  return ( <StyledApp data-testid={ "app" } key={ "app-container" }>
    { alertMessage && ( <Alert
      type={ "error" }
      onClose={ () => setAlert( false ) }
      message={ alertMessage }
      closable
      style={ {
        position: "absolute", top: "20px", zIndex: "15",
      } }
    /> ) }
    <NavBar getHooks={ getHooks }/>
    <RouteContainer getHooks={ getHooks } { ...props }/>
    <Footer deleteClick={ deleteClick } getHooks={ getHooks }/>
  </StyledApp> );
}

App.propTypes = {
  getHooks: PropTypes.func,
};

const StyledApp = styled( BaseContainer )`
  background: ${ THEME.BACKGROUND_DARK };
${ props => {
  if( props.theme[ THEMING_VARIABLES.BACKGROUND ] === THEMING_VALUES.LIGHT ){
    return `
    background: ${ THEME.BACKGROUND_LIGHT };
    `;
  }
} };
  box-sizing: border-box;
  position: relative;
  color: black;
  text-align: center;
  flex-direction: column;
  display: flex;
  max-width: 100vw;
  width: 100vw;
  align-items: center;
  max-height: 100vh;
  min-height: 100vh;
  overflow: hidden;
 
  
`;
