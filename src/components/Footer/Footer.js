import React from "react";
import styled, { css } from "styled-components";
import { ContainerDiv } from "..";
import PropTypes from "prop-types";
import { APP_PATHS, THEME } from "../../utilities/constants.js";
import SvgPlusIcon from "../../svgComponents/SvgPlusIcon.js";
import { Icon } from "antd";
import { ReactComponent as Delete } from "../../svgs/delete.svg";
import { ReactComponent as Edit } from "../../svgs/edit.svg";
import { useAppHooks } from "../../customHooks/useAppHooks.js";
import { onThemeValue } from "../../utilities/themeHelper";

/**
 * Footer
 * @component
 * @example return (<Footer />)
 *
 */
export const Footer = ( props ) => {
  
  const { changePath, path, setDeleteClicked, selectingCards, setEditClicked } = useAppHooks();
  
  /**
   * Add Deck
   * @description Function called to add a deck to the users decks.
   * @function
   * @name addDeck
   */
  const addDeck = () => {
    changePath( "/create/deck" );
  };
  
  const getFooterIcons = () => {
    
    if( path === APP_PATHS.QUIZ_MODE ){
      return <Icons onClick={ () => changePath( APP_PATHS.DASHBOARD_PATH ) }
                    type={ "home" }/>;
    }else if( path.includes( APP_PATHS.PREVIEW_DECK_PATH ) ){
      
      if( selectingCards ){
        return ( <><Edit
          onClick={ () => setEditClicked( true ) }></Edit><Delete
          onClick={ () => setDeleteClicked( true ) }></Delete></> );
      }
    }else{
      return <PlusIcon onClick={ () => addDeck() }/>;
    }
  };
  
  return ( <StyledFooter { ...props } className={ "footer" }
                         pathname={ path }>
    { path === "./preview" && <Blur/> }
    <ContainerDiv
      className={ "footer-container" }
      maxHeight={ THEME.FOOTER_HEIGHT + "px" }
      height={ THEME.FOOTER_HEIGHT + "px" }
      alignItems={ "center" }
      justifyContent={ selectingCards ? "space-around" : "center" }
      position={ "relative" }
      overFlowY={ "visible" }
      flexDirection={ "row" }

    >
      { getFooterIcons() }

    </ContainerDiv>
  </StyledFooter> );
};

const PlusIcon = styled( SvgPlusIcon )`
height: 25px;
`;

const Icons = styled( Icon )`
font-size: 40px;
`;

Footer.prototypes = {
  getHooks: PropTypes.func.isRequired, navBarVis: PropTypes.bool,
};

const Blur = styled.div`
position: absolute;
top: -80px;
min-width: 100vw;
height: 80px;
background-image: linear-gradient(transparent, #ffffff8c);
`;

const onTheme = onThemeValue( "footer" )`
visible: ${ () => css`
bottom: 0;
` };
hidden: ${ () => css`
bottom: ${ -THEME.FOOTER_HEIGHT }px;
` }
`;
const StyledFooter = styled.div`
  position: absolute;
  display: flex;
  ${ onTheme };
  margin-top: auto;
  min-width: 100vw;
  z-index: 100;
  height: ${ THEME.FOOTER_HEIGHT }px;
  background: #E1DED7;
  align-items: center;
  overflow-x: hidden;
`;

