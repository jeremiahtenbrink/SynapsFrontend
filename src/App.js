import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Footer, NavBar, RouteContainer } from "./components";
import { SvgBrainPic } from "./svgComponents";
import PropTypes from "prop-types";
import { Alert } from "antd";
import { useAuthStateChange } from "./customHooks/useAuthStateChange.js";
import {
  THEMING_VALUES, THEMING_VARIABLES,
} from "./customHooks/themingRules.js";
import { THEME } from "./utilities/constants.js";
import { useTheming } from "./customHooks/useTheming.js";
import { useAppHooks } from "./customHooks/useAppHooks.js";
import { onThemeValue } from "./utilities/themeHelper";

/**
 * App
 * @category Views
 * @component
 * @example return (<App />);
 * @return {*}
 */
export default function App(){
  
  const [ alertMessage, setAlert ] = useState( "" );
  const { theme, usersState, getHooks } = useAppHooks();
  const getValue = useTheming();
  
  useAuthStateChange();
  
  const deleteClick = () => {
  
  };
  
  useEffect( () => {
    if( usersState.registerError && !alertMessage ){
      setAlert( "Error logging in. Please try again later." );
      if( usersState.registerError && !alertMessage ){
        setAlert( "Error logging in. Please try again later." );
      }
    }
  }, [ usersState ] );
  
  return ( <StyledApp className="App">
    { theme.brainSvg !== THEMING_VALUES.HIDDEN && ( <SvgBrainPic
      maxWidth={ "3000px" }
      maxHeight={ "3000px" }
      height={ getValue( THEMING_VARIABLES.BRAIN_SVG, {
        [ THEMING_VALUES.BOTTOM ]: "1800px",
        [ THEMING_VALUES.TOP ]: "1800px",
        [ THEMING_VALUES.MOBILE ]: "624px",
      } ) }
      width={ getValue( THEMING_VARIABLES.BRAIN_SVG, {
        [ THEMING_VALUES.BOTTOM ]: "1800px",
        [ THEMING_VALUES.TOP ]: "1800px",
        [ THEMING_VALUES.MOBILE ]: "624px",
      } ) }
      left={ "50%" }
      transform={ "translate(-50%, 0)" }
      top={ getValue( THEMING_VARIABLES.BRAIN_SVG, {
        [ THEMING_VALUES.BOTTOM ]: "65px",
        [ THEMING_VALUES.TOP ]: "65px",
        [ THEMING_VALUES.MOBILE ]: "624px",
      } ) }
      fill={ getValue( THEMING_VARIABLES.BACKGROUND, {
        [ THEMING_VALUES.DARK ]: THEME.BRAIN_PIC_DARK,
        [ THEMING_VALUES.LIGHT ]: THEME.BRAIN_PIC_LIGHT,
      } ) }
    /> ) }
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
    <RouteContainer getHooks={ getHooks }/>
    
    <Footer deleteClick={ deleteClick } getHooks={ getHooks }/>
  </StyledApp> );
}

App.propTypes = {
  getHooks: PropTypes.func,
};

const backgroundColor = onThemeValue( THEMING_VARIABLES.BACKGROUND )`
dark: ${ THEME.PRIMARY_COLOR };
light:${ THEME.COLOR_WHITE };
  `;

const StyledApp = styled.div`
  background: ${ backgroundColor };
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
  fill: ${ backgroundColor };
  
}
`;
