import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as DeckCardSvg } from "../svgs/DeckCard.svg";
import { APP_VIEW_DESKTOP } from "../utilities/constants.js";
import { useAppHooks } from "../customHooks/useAppHooks.js";
import { callEveryNode } from "../utilities/callEveryNode.js";
import { APP_PATHS } from "../utilities/constants.js";

/**
 *   DeckCard
 *
 *  @component
 *
 */
const DeckCard = ( { deck } ) => {
  
  const deckCardRef = useRef();
  const { changePath } = useAppHooks();
  const [ heartCenter, setHeartCenter ] = useState( null );
  const [ addButton, setAddButton ] = useState( null );
  const [ textEl, setTextEl ] = useState( null );
  
  useEffect( () => {
    if( deckCardRef.current ){
      callEveryNode( deckCardRef.current, setDeckCardElements );
    }
  }, [ deck ] );
  
  const deckClicked = ( e ) => {
    if( !deck ){
      changePath( APP_PATHS.CREATE_DECK_PATH );
    }else{
      changePath( APP_PATHS.PREVIEW_DECK_PATH + "/" + deck.deck_name );
    }
    
  };
  
  const favoriteClicked = ( e ) => {
    e.stopPropagation();
  };
  
  /**
   * @property {HTMLElement} el
   */
  const setDeckCardElements = ( el ) => {
    
    if( el.id === "heart" ){
      if( !deck ){
        el.setAttribute( "opacity", 0 );
      }else{
        el.addEventListener( "click", favoriteClicked );
      }
    }else if( el.id === "heartCenter" ){
      if( !deck || !deck.favorite ){
        el.setAttribute( "opacity", 0 );
      }
      setHeartCenter( el );
    }else if( el.id === "addButton" ){
      if( deck ){
        el.setAttribute( "opacity", 0 );
      }
      setAddButton( addButton );
    }else if( el.id === "text" ){
      el.childNodes[ 0 ].childNodes[ 0 ].childNodes.forEach( ( child, i ) => {
        if( i === 0 ){
          child.textContent = "";
        }else{
          child.textContent = "";
        }
      } );
    }
  };
  
  return ( <Container onClick={ deckClicked }>
    <DeckCardSvg ref={ deckCardRef }/>
    <p>{ deck ? deck.deck_name : "Create Deck" }</p>
  </Container> );
};

const Container = styled.div`
cursor: pointer;
position: relative;;
p {
transform-box: fill-box;
position: absolute;
top:30%;
left:50%;
transform: translate(-50%, -50%);
font-weight: 600;

}
${ ( { theme } ) => {
  if( theme.appView === APP_VIEW_DESKTOP ){
    return css`
    height: 200px;
    width: 155px;
    margin-right: 20px;
    color: ${ theme.themeState.SYNAPS_DARK };
    
    p {
    font-size: 32px;
    }
    `;
  }else{
    return css`
      height: 140px;
      width: 108px;
      margin-right: 10px;
      color: ${ theme.themeState.SYNAPS_DARK };
      
      p{
      font-size: 18px;
      }
`;
  }
  
} }
`;

DeckCard.propTypes = {};

export default DeckCard;