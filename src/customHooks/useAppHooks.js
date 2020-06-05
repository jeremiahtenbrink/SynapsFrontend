import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChangePath } from "./useHistoryAndPath.js";
import { useHistory } from "react-router-dom";
import { useTheme } from "styled-components";
import {
  APP_VIEW_DESKTOP, APP_VIEW_MOBILE, SIZES,
} from "../utilities/constants.js";

/**
 * Use App Hooks
 *
 * @description This custom hook combines most of the hooks we have been
 * using in this application.
 *
 * @category Custom Hooks
 * @function
 * @name useAppHooks
 * @returns UseAppHooksReturn
 *
 */
export const useAppHooks = () => {
  const { setHookVariable, hooks } = useContext( AppHooksContext );
  /**
   * @typedef {object} Theme
   * @property {function} changeTheme
   * @property {ThemeState} themeState
   * @property {object.<THEMING_VALUE, {string}>}
   *
   */
  
  const theme = useTheme();
  const dispatch = useDispatch();
  const changePath = useChangePath();
  const history = useHistory();
  const [ deleteClicked, setDeleteClicked ] = useState( false );
  const [ editClicked, setEditClicked ] = useState( false );
  const [ selectingCards, setSelectingCards ] = useState( false );
  const { usersState, photosState, cardsState, decksState } = useSelector(
    reducerState => reducerState );
  
  console.log( theme );
  
  useEffect( () => {
    if( history.location.pathname !== hooks.path ){
      setHookVariable( "path", history.location.pathname );
    }
  } );
  
  const getHooks = () => {
    /**
     * @typedef {object} UseAppHooksReturn
     * @property {function} setHookVariable
     * @property {Dispatch}  dispatch
     * @property {UsersReducerState} usersState
     * @property {CardsState} cardsState
     * @property {PhotoReducerState} photosState
     * @property {{}} deckState
     * @property {Theme} theme
     * @property {ThemeRuleValues} themeRules
     * @property {AppView} appView
     * @property {APP_PATH} path,
     * @property {number} height
     * @property {ChangePath} changePath
     * @property {{any}} pushedState
     * @property {number} width
     * @property {number} height
     * @property {bool} selectingCards
     * @property {bool} deleteClicked
     * @property {function} setSelectingCards
     * @property {function} setDeleteClicked
     */
    return {
      path: history.location.pathname,
      pushedState: history.location.pushedState,
      theme,
      setHookVariable,
      dispatch,
      usersState,
      cardsState,
      photosState,
      decksState,
      changePath,
      deleteClicked,
      setDeleteClicked,
      editClicked,
      setEditClicked,
      selectingCards,
      setSelectingCards, ...hooks,
    };
  };
  
  /**
   * @typedef {object} UseAppHooksReturn
   * @property {function} setHookVariable
   * @property {Dispatch}  dispatch
   * @property {UsersReducerState} usersState
   * @property {CardsState} cardsState
   * @property {PhotoReducerState} photosState
   * @property {{}} deckState
   * @property {Theme} theme
   * @property {ThemeRuleValues} themeRules
   * @property {AppView} appView
   * @property {APP_PATH} path,
   * @property {number} height
   * @property {ChangePath} changePath
   * @property {{any}} pushedState
   * @property {number} width
   * @property {number} height
   * @property {bool} deleteClicked
   * @property {function} setDeleteClicked
   */
  return {
    path: history.location.pathname,
    theme: theme,
    setHookVariable,
    dispatch,
    usersState,
    cardsState,
    photosState,
    decksState,
    changePath,
    getHooks,
    deleteClicked,
    setDeleteClicked, ...hooks,
  };
};

/**
 * Use App Hook State
 * App Hooks Theme Provider State manager.
 * @typedef {function} useAppAHooksState
 *
 * @return {{setHookVariable: setHookVariable, hooks: {pushedState: {}, path:
 *   string, appView: (string | string), width: number,
 *   history: *, height: number}}}
 */
export const useAppHooksState = () => {
  
  const history = useHistory();
  const path = history.location.pathname;
  const appView = window.innerWidth > SIZES.tablet ? APP_VIEW_DESKTOP :
    APP_VIEW_MOBILE;
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  /**
   * @typedef {object} AppProviderState
   * @property {object} pushedState
   * @property {AppView} appView
   * @property {number} width
   * @property {number} height
   */
  const initialState = {
    appView, width, height, path,
  };
  
  const [ hooks, setHooks ] = useState( initialState );
  
  const setHookVariable = ( name, value, items = undefined ) => {
    if( items === undefined ){
      setHooks( hooks => ( { ...hooks, [ name ]: value } ) );
    }else{
      const newHooks = { ...hooks };
      items.forEach( item => {
        newHooks[ item.name ] = item.value;
      } );
      setHooks( newHooks );
    }
  };
  
  /**
   *
   */
  return {
    hooks, setHookVariable,
  };
};

export const AppHooksContext = React.createContext();
