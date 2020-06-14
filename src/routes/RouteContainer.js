import React from "react";
import { LoginSignUpRoute, ProtectedRoute } from "./index.js";
import {
  CreateDeck, Dashboard, LandingPage, PreviewDeck, SignIn, Testing,
} from "../views";
import { Route, Switch } from "react-router";
import { BaseContainer } from "../components";
import { THEMING_VARIABLES } from "../customHooks/themingRules.js";
import { APP_PATHS, THEME } from "../utilities/constants.js";
import QuizMode from "../views/QuizMode.js";
import styled, { css } from "styled-components";
import { onThemeValue } from "../utilities/themeHelper";

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

let containerBGColor = THEME.CONTAINER_BG;
const transparentPaths = [
  APP_PATHS.LANDING_PAGE, APP_PATHS.SIGN_IN_PATH, APP_PATHS.SIGN_UP_PATH,
];

const appView = onThemeValue( THEMING_VARIABLES.APP_VIEW )`
desktop: ${ ( { theme } ) => {
  if( transparentPaths.includes( theme.path ) ){
    containerBGColor = "transparent";
  }else{
    containerBGColor = THEME.CONTAINER_BG;
  }
  
  let padding = 47;
  let borderRadius = 10;
  let marginTop = theme.NAV_BAR_HEIGHT + 25;
  return css`
padding: ${ padding }px;
border-radius: ${ borderRadius }px;
margin-top: ${ marginTop }px;
background: ${ containerBGColor };
`;
} };

mobile : ${ ( { theme } ) => {
  if( transparentPaths.includes( theme.path ) ){
    containerBGColor = "transparent";
  }else{
    containerBGColor = THEME.CONTAINER_BG;
  }
  
  let padding = 15;
  let borderRadius = 0;
  let marginTop = theme.NAV_BAR_HEIGHT;
  return css`
padding: ${ padding }px;
border-radius: ${ borderRadius }px;
margin-top: ${ marginTop }px;
background: ${ containerBGColor };
`;
} };
`;

const footerStyle = onThemeValue( THEMING_VARIABLES.FOOTER )`
visible:${ ( { theme } ) => {
  return css`
height: ${ ( theme.height - theme.NAV_BAR_HEIGHT - theme.FOOTER_HEIGHT ) }px;`;
} };
hidden: ${ ( { theme } ) => {
  return css`
height: ${ ( theme.height - theme.NAV_BAR_HEIGHT ) }px;
`;
} }
`;

const RouteContainerDiv = styled( BaseContainer )`
align-self: center;

      max-width: 1140px;
position: relative;
z-index: 10;
      ${ footerStyle };
${ appView };
`;

RouteContainer.propTypes = {};

