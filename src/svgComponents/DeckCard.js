import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as DeckCardSvg } from "../svgs/DeckCard.svg";
import { APP_PATHS } from "../utilities/constants.js";
import { useAppHooks } from "../customHooks/useAppHooks.js";
import { callEveryNode } from "../utilities/callEveryNode.js";
import { onThemeValue } from "../utilities/themeHelper";
import { updateDeck } from "../actions";

/**
 *   DeckCard
 *
 *  @component
 *
 */
const DeckCard = ( { deck } ) => {
  
  const deckCardRef = useRef();
  const { changePath, dispatch, usersState } = useAppHooks();
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
  
    deck.favorite = !deck.favorite;
    dispatch( updateDeck( usersState.user.uid, deck.deck_id, deck ) );
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
  
  return (
    <Container data-testid={ "deck-card-container" } onClick={ deckClicked }>
      <DeckCardSvg ref={ deckCardRef }/>
      <p>{ deck ? deck.deck_name : "Create Deck" }</p>
    </Container> );
};

const appView = onThemeValue( "appView" )`
desktop: ${ ( { theme } ) => {
  
  return css`
height: 200px;
 width: 155px;
margin-right: 20px;
color: ${ theme.SYNAPS_DARK };

p {
  font-size: 26px;
}
`;
} };
mobile: ${ ( { theme } ) => css`
height: 140px;
width: 108px;
 margin-right: 10px;
color: ${ theme.SYNAPS_DARK };
p{
  font-size: 18px;
}
` }
`;

const Container = styled.div`
cursor: pointer;
position: relative;
${ appView };
margin-bottom: 2rem;
p {
transform-box: fill-box;
position: absolute;
top:45%;
left:50%;
transform: translate(-50%, -50%);
font-weight: 600;

}
`;

DeckCard.propTypes = {};

export default DeckCard;