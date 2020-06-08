import React from "react";
import { LoginSignUpRoute, ProtectedRoute } from "./index.js";
import {
  CreateDeck, Dashboard, LandingPage, PreviewDeck, SignIn, Testing,
} from "../views";
import { Switch, Route } from "react-router";
import { RouteContainerComponent } from "../components/Container/RouteContainerComponent.js";
import {
  APP_PATHS,
} from "../utilities/constants.js";
import QuizMode from "../views/QuizMode.js";

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
  
  return ( <RouteContainerComponent key={ "route-container" } name={ "route-container" }
                                    data-testid={ "route-container" }>
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
  </RouteContainerComponent> );
};

RouteContainer.propTypes = {};
