import React from "react";
import { LoginSignUpRoute, ProtectedRoute } from "./index.js";
import {
  CreateDeck, Dashboard, LandingPage, PreviewDeck, SignIn, Testing,
} from "../views";
import { Switch, Route } from "react-router";
import { BaseContainer } from "../components/Container/BaseContainer.js";
import {
  THEMING_VALUES, THEMING_VARIABLES,
} from "../customHooks/themingRules.js";
import { APP_PATHS, APP_VIEW_DESKTOP, THEME } from "../utilities/constants.js";
import QuizMode from "../views/QuizMode.js";
import styled, { css } from "styled-components";
import { setUpCssValues } from "../utilities/getStyles.js";

/**
 *   RouteContainer
 *
 *  @component
 *  @example
 *  return(
 *    <RouteContainer/>
 *  )
 *
 */
export const RouteContainer = ( props ) => {
  
  return ( <RouteContainerDiv className={ "route-container" }>
    <Switch>
      <LoginSignUpRoute path={ APP_PATHS.SIGN_UP_PATH }
                        component={ SignIn } { ...props } />
      <LoginSignUpRoute path={ APP_PATHS.SIGN_IN_PATH }
                        component={ SignIn } { ...props } />
      <ProtectedRoute path={ APP_PATHS.DASHBOARD_PATH }
                      component={ Dashboard } { ...props }/>
      <ProtectedRoute path={ APP_PATHS.CREATE_DECK_PATH + "/:deck_name?" }
                      component={ CreateDeck } { ...props }/>
      <ProtectedRoute
        path={ APP_PATHS.PREVIEW_DECK_PATH + "/:deck_name/:card_id?" }
        component={ PreviewDeck } { ...props }/>
      <ProtectedRoute path={ APP_PATHS.QUIZ_MODE + "/:deck_name" }
                      component={ QuizMode } { ...props }/>
      <Route path={ APP_PATHS.TESTING }
             render={ props => <Testing { ...props }/> }/>
      <LoginSignUpRoute path={ "/" }
                        component={ LandingPage } { ...props } />
    </Switch>
  </RouteContainerDiv> );
};

const rules = {};
rules[ THEMING_VARIABLES.APP_VIEW ] = {
  [ APP_VIEW_DESKTOP ]: {
    yes: theme => {
      
      let color = theme.themeState.CONTAINER_BG;
      const transparentPaths = [
        APP_PATHS.LANDING_PAGE, APP_PATHS.SIGN_IN_PATH, APP_PATHS.SIGN_UP_PATH,
      ];
      if( transparentPaths.includes( theme.path ) ){
        color = "transparent";
      }
      
      
      return css`
padding: 47px;
border-radius: 10px;
margin-top: ${ THEME.NAV_BAR_HEIGHT + 25 }px;
background: ${ color };
`;
    }, no: theme => {
      
      let color = theme.themeState.CONTAINER_BG;
      const transparentPaths = [
        APP_PATHS.LANDING_PAGE, APP_PATHS.SIGN_IN_PATH, APP_PATHS.SIGN_UP_PATH,
      ];
      if( transparentPaths.includes( theme.path ) ){
        color = "transparent";
      }
      
      return css`
background: ${ color };
padding: 15px;
border-radius: 0;
margin-top: ${ THEME.NAV_BAR_HEIGHT }px;
`;
    },
  },
}

;rules[ THEMING_VARIABLES.FOOTER ] = {
  [ THEMING_VALUES.VISIBLE ]: {
    yes: theme => css`
height: ${ theme.height - THEME.NAV_BAR_HEIGHT - THEME.FOOTER_HEIGHT }px;
`, no: theme => css`
height: ${ theme.height - THEME.NAV_BAR_HEIGHT }px;
`,
  },
};

const getCssStyles = setUpCssValues( rules );

const RouteContainerDiv = styled( BaseContainer )`
align-self: center;
max-width: 1140px;
position: relative;
z-index: 10;
${ ( { theme } ) => {
  
  const value = getCssStyles( theme );
  
  return value;
} };
`;

RouteContainer.propTypes = {};
