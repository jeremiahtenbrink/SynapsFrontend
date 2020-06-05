import React from "react";
import { LoginSignUpRoute, ProtectedRoute } from "./index.js";
import {
  CreateDeck, Dashboard, LandingPage, PreviewDeck, SignIn, Testing,
} from "../views";
import { Switch, Route } from "react-router";
import { BaseContainer } from "../components/Container/BaseContainer.js";
import { THEMING_VALUES } from "../customHooks/themingRules.js";
import { APP_PATHS } from "../utilities/constants.js";
import QuizMode from "../views/QuizMode.js";
import styled from "styled-components";

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


const RouteContainerDiv = styled( BaseContainer )`

align-self: center;
background: white;
max-width: 1140px;
position: relative;
border-radius: 10px;
padding: 47px;
z-index: 10;

${ ( { theme } ) => {
  debugger;
  return `
height: ${ calcMinHeight( theme ) }px;
background: ${ getColor( theme ) };
margin-top: ${ getMarginTop( theme ) }px;
`;
} };
`;

/**
 * Gets what the margin top should be for route container div
 * @param {Theme} theme
 * @return {number} marginTop
 */
const getMarginTop = theme => theme.themeState.navBarTopHeight + 25;

/**
 * Gets the color of the background of the div element should be.
 * @param {Theme} theme
 * @return {string} color
 */
const getColor = theme => {
  const transparentPaths = [
    APP_PATHS.LANDING_PAGE, APP_PATHS.SIGN_IN_PATH, APP_PATHS.SIGN_UP_PATH,
  ];
  return transparentPaths.includes( theme.path ) ? "transparent" :
    theme.themeState.white;
};

/**
 * Calculates the height the div element should be.
 * @param {Theme} theme
 * @return number minHeight
 */
const calcMinHeight = theme => {
  let minHeight = theme.height - theme.themeState.navBarTopHeight;
  if( theme.FOOTER === THEMING_VALUES.VISIBLE ){
    minHeight -= theme.footerHeight;
  }
  return minHeight;
};

RouteContainer.propTypes = {};
