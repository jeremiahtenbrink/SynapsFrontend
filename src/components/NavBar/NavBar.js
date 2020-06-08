import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ContainerDiv, NavBarAvatar } from "../index.js";
import { signOut } from "../../actions";
import theming from "styled-theming";
import LogoLeft from "./LogoLeft.js";
import { APP_PATHS, THEME } from "../../utilities/constants.js";
import {
  THEMING_VALUES, THEMING_VARIABLES,
} from "../../customHooks/themingRules.js";
import { useHistory } from "react-router";
import { useAppHooks } from "../../customHooks/useAppHooks.js";
import "./NavBar.css";

/**
 * Nav Bar
 *
 * @component
 * @example
 *  return (<NavBar />)
 */
export const NavBar = ( props ) => {
  const { usersState, dispatch, changePath } = useAppHooks();
  const history = useHistory();
  const path = history.location.pathname;
  const [ setMenuOpen ] = useState( false );
  const [ avatarUrl, setAvatarUrl ] = useState( "" );
  
  useEffect( () => {
    
    if( usersState.user && usersState.user.photoURL ){
      setAvatarUrl( usersState.user.photoURL );
      
    }else{
      setAvatarUrl( "" );
      
    }
  }, [ usersState ] );
  
  const logout = () => {
    setMenuOpen( false );
    signOut( dispatch );
  };
  
  const navBarRightContent = () => {
    
    if( path === APP_PATHS.SIGN_UP_PATH || path === APP_PATHS.LANDING_PAGE ){
      return <Styledh2 className={"nav-bar-h2"} onClick={ () => changePath( APP_PATHS.SIGN_IN_PATH ) }>Sign
        In</Styledh2>;
    }else if( path === APP_PATHS.SIGN_IN_PATH ){
      return <Styledh2 className={"nav-bar-h2"} onClick={ () => changePath( APP_PATHS.SIGN_UP_PATH ) }>Sign
        Up</Styledh2>;
    }
    
    return ( <NavBarAvatar
      onClick={ logout }
      avatarUrl={ avatarUrl }
      className={ "ant-dropdown-link" }
    /> );
    
  };
  
  return ( <StyledBar className={ "nav-bar" }>
    <ContainerDiv
      justifyContent={ "space-between" }
      className={ "nav-bar-container" }
      flexDirection={ "row" }
      width={ "100%" }
      height={ "75px" }
      position={ "relative" }
      overFlowY={ "hidden" }
      backgroundColor={ "transparent" }
    >
      <LogoLeft/>
      { navBarRightContent() }
    </ContainerDiv>
  </StyledBar> );
};

NavBar.propTypes = {};

const navBarTheme = theming( THEMING_VARIABLES.THEME, {
  [ THEMING_VALUES.DESKTOP_LIGHT ]: ( theme ) => {
    return `
    background: transparent;
    `;
  }, [ THEMING_VALUES.MOBILE_DARK ]: ( theme ) => {
    return `
    background: ${ THEME.NAV_BAR_DARK };
    `;
  }, [ THEMING_VALUES.MOBILE_LIGHT ]: ( theme ) => {
    return `
    background: ${ THEME.NAV_BAR_LIGHT };
    `;
  },
} );

const StyledBar = styled.div`
  height: ${ THEME.NAV_BAR_HEIGHT + "px" };
 ${ navBarTheme }
`;

const color = theming( THEMING_VARIABLES.THEME, {
  [ THEMING_VALUES.DESKTOP_DARK ]: THEME.WHITE_1,
  [ THEMING_VALUES.MOBILE_DARK ]: THEME.WHITE_1,
  [ THEMING_VALUES.DESKTOP_LIGHT ]: THEME.SYNAPS_DARK,
  [ THEMING_VALUES.MOBILE_LIGHT ]: THEME.SYNAPS_DARK,
} );

const Styledh2 = styled.h2`
  color: ${ color };
`;

