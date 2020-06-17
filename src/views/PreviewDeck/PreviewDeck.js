import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { deleteCard, getAllCardsForDeck } from "../../actions";
import { APP_VIEW_MOBILE, THEME, } from "../../utilities/constants.js";
import Fuse from "fuse.js";
import { useAppHooks } from "../../customHooks/useAppHooks.js";
import { useParams } from "react-router";
import DeckCardsContainer from "./DeckCardsContainer";
import { onThemeValue } from "../../utilities/themeHelper";
import TitleSearchContainer from "./TitleSearchContainer";
import StudyButton from "./StudyButton";

const options = {
  keys: [
    "question", "answer",
  ],
};

/**
 * Preview Deck
 * @category Views
 * @component
 * @example return (<PreviewDeck />);
 */
export const PreviewDeck = ( {} ) => {
  // @type CardState
  
  const [ searchTerm, setSearchTerm ] = useState( "" );
  
  const {
    cardsState, dispatch, usersState, appView, setSelectingCards, deleteClicked, setDeleteClicked, decksState,
  } = useAppHooks();
  const { deck_name } = useParams();
  const deck = decksState.decks.filter( deck => deck.deck_name.toLowerCase() ===
    deck_name )[ 0 ];
  
  const [ cardsSelected, setCardsSelected ] = useState( {} );
  const [ selectMode, setSelectMode ] = useState( false );
  
  useEffect( () => {
    
    if( !selectMode ){
      setDeleteClicked( false );
      return;
      
    }
    if( Object.values( cardsSelected ).length > 0 ){
      Object.values( cardsSelected ).forEach( card => {
        dispatch( deleteCard( card, usersState.user.uid ) );
      } );
    }
    setDeleteClicked( false );
  }, [ deleteClicked ] );
  
  useEffect( () => {
    if( deck === undefined ){
    }else{
      dispatch( getAllCardsForDeck( deck.deck_id, usersState.user.uid ) );
    }
  }, [ decksState ] );
  
  const unSelected = () => {
    if( selectMode ){
      setCardsSelected( [] );
    }
    setSelectMode( !selectMode );
    setSelectingCards( !selectMode );
    
  };
  
  const search = e => {
    setSearchTerm( e.target.value );
  };
  
  const getCards = () => {
    if( cardsState && cardsState.cards ){
      const cards = cardsState.cards.filter( card => card.deck_id ===
        deck.deck_id );
      
      if( searchTerm !== "" ){
        const fuse = new Fuse( cards, options );
        const decks = fuse.search( searchTerm );
        console.log( cards );
        return decks;
  
      }else{
        return cards;
      }
    }
    return [];
  };
  
  return ( <StyledPreviewDeck data-testid={ "preview-deck-container" }>
    <TitleSearchContainer selectMode={ selectMode } unSelected={ unSelected }
                          search={ search } deck={ deck }/>
    
    <DeckCardsContainer cards={ getCards() } deck={ deck }
                        cardsSelected={ cardsSelected }
                        setCardsSelected={ setCardsSelected }
                        selectMode={ selectMode }/>
    
    
    <StudyButton height={ "73px" } width={ "90%" } text={ "Study Deck" }
                 deck={ deck }
                 render={ appView === APP_VIEW_MOBILE }/>
  </StyledPreviewDeck> );
};

const appViewPrevDeck = onThemeValue( "appView" )`
desktop: ${ () => css`
border-radius: 10px;
` };
mobile: ${ props => css`
height:( ${ props.theme.height } - ${ THEME.NAV_BAR_HEIGHT } - ${ THEME.FOOTER_HEIGHT }) + px;
padding-bottom:0;
` }
`;

const footerStyles = onThemeValue( "footer" )`
visible: ${ props => css`
height:( ${ props.theme.height } - ${ THEME.NAV_BAR_HEIGHT } - ${ THEME.FOOTER_HEIGHT }) + px;
padding-bottom: ${ THEME.FOOTER_HEIGHT }+ px;
` };
hidden:
`;

const StyledPreviewDeck = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  max-width: 1140px;
  width: 100%;
  ${ appViewPrevDeck };
  ${ footerStyles };
`;


