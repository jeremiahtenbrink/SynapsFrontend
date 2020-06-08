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
      return <Styledh2 onClick={ () => changePath( APP_PATHS.SIGN_IN_PATH ) }>Sign
        In</Styledh2>;
    }else if( path === APP_PATHS.SIGN_IN_PATH ){
      return <Styledh2 onClick={ () => changePath( APP_PATHS.SIGN_UP_PATH ) }>Sign
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

const StyledBar = styled.div`
  background: transparent;
  display: flex;
  justify-content: center;
  z-index: 15;
  position: absolute;
  top: 0;
  width: 100%;
  height: ${ THEME.NAV_BAR_HEIGHT + "px" };

 
`;

const color = theming( THEMING_VARIABLES.BACKGROUND, {
  [ THEMING_VALUES.DARK ]: THEME.TEXT_LIGHT,
  [ THEMING_VALUES.LIGHT ]: THEME.TEXT_DARK,
} );

const Styledh2 = styled.h2`
  display: flex;
  align-items: center;
  color: ${ color };
  margin: 0 10% 0 0;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 24px;
`;

