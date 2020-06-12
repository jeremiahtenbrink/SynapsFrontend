import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theming from "styled-theming";
import { deleteCard, getAllCardsForDeck } from "../actions/cardActions.js";
import {
  PreviewDeckCards, SearchBar, BasicButton, TitleText,
} from "../components";
import {
  APP_PATHS, APP_VIEW_DESKTOP, APP_VIEW_MOBILE, THEME,
} from "../utilities/constants.js";
import { Icon } from "antd";
import {
  THEMING_VALUES, THEMING_VARIABLES,
} from "../customHooks/themingRules.js";
import Fuse from "fuse.js";
import { useAppHooks } from "../customHooks/useAppHooks.js";
import { useParams } from "react-router";
import { setUpCssValues } from "../utilities/getStyles.js";

const { css } = require(
  "styled-components/dist/styled-components.browser.cjs.js" );

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
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
export const PreviewDeck = ( { computedMatch } ) => {
  // @type CardState
  
  const [ searchTerm, setSearchTerm ] = useState( "" );
  
  const {
    cardsState, dispatch, usersState, changePath, height, appView, setSelectingCards, deleteClicked, setDeleteClicked, decksState,
  } = useAppHooks();
  const { deck_name } = useParams();
  const deck = decksState.decks.filter( deck => deck.deck_name.toLowerCase() ===
    deck_name )[ 0 ];
  const cardCount = cardsState.cards.filter( card => card.deck_id ===
    deck.deck_id ).length;
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
  
  const cardClicked = card => {
    if( !selectMode ){
      return;
    }
    if( !!cardsSelected[ card.card_id ] ){
      delete cardsSelected[ card.card_id ];
      setCardsSelected( { ...cardsSelected } );
    }else{
      setCardsSelected( { ...cardsSelected, [ card.card_id ]: card } );
    }
  };
  
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
  
  return ( <StyledPreviewDeck key={ "preview-container" }
                              data-testid={ "preview-deck-container" }
                              heigth={ height }>
    
    <DeckDisplayContainer>
      <Container className={ "container" }>
        <TopContainer className={ "top-container" }>
          <BackArrow className={ "back-arrow" }>
            <StyledIconLeft type="left"/>
            <p
              onClick={ () => changePath( APP_PATHS.DASHBOARD_PATH ) }>Back</p>
          </BackArrow>
          
          <SearchContainer className={ "search-container" }>
            <SearchBar
              height={ appView === APP_VIEW_DESKTOP ? "37px" : "24px" }
              borderRadius={ "14px" }
              onChange={ search }
              onSearch={ search }
              placeholder={ "Search all cards" }
            />
          </SearchContainer>
          <Selected className={ "select-text" } selected={ selectMode }
                    onClick={ unSelected }>
            { selectMode === false ? "Select" : "Cancel" }
          </Selected>
        </TopContainer>
        <LeftContainer>
          <TitleText
            text={ ( deck && deck.deck_name ) || "Preview" }
            count={ cardCount }
            appView={ appView }
            deckCreatedDate={ deck.created_at }
            color={ appView === APP_VIEW_DESKTOP ? "#0d2545" : "#2A685B" }
          />
          
          { appView === APP_VIEW_DESKTOP && <StudyButton
            onClick={ () => changePath( APP_PATHS.QUIZ_MODE + "/" +
              deck.deck_name ) }
            height={ "54px" }
            width={ "264px" } text={ "Study Deck" }
            type={ "secondary" }/> }
        </LeftContainer>
      
      </Container>
      <StyledPreviewDeckHolder className={ "deck-holder" }>
        <PreviewDeckCards cardType={ "card" } key={ 0 }
                          onClick={ () => changePath( APP_PATHS.CREATE_DECK_PATH +
                            "/" + deck.deck_name ) }
        />
        { getCards().map( card => {
          if( card[ "item" ] ){
            card = card[ "item" ];
          }
          
          return <PreviewDeckCards onClick={ () => cardClicked( card ) }
                                   cardType={ "card" }
                                   key={ card.card_id }
                                   selected={ !!cardsSelected[ card.card_id ] }
                                   card={ card }/>;
        } ) }
      </StyledPreviewDeckHolder>
    </DeckDisplayContainer>
    { appView === APP_VIEW_MOBILE && <StudyButton
      onClick={ () => changePath( APP_PATHS.QUIZ_MODE + "/" + deck.deck_name ) }
      height={ "73px" } width={ "90%" } text={ "Study Deck" }
      type={ "secondary" }/> }
  </StyledPreviewDeck> );
};

const DeckDisplayContainer = styled.div`
overflow-y: scroll;

  /* width */
::-webkit-scrollbar {
display: none;
}
`;

const BackArrow = styled.div`
display: flex;
`;

const LeftContainer = styled.div`
display: flex;
margin: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "0 0 0 6.5%" :
  "0" };
flex-direction: column;
width: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "50%" : "100%" };
order: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "1" : "2" };
`;

const Container = styled.div`
display: flex;
margin-top: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "2rem" : "" };
flex-direction: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "row" :
  "column" };

  /* width */
::-webkit-scrollbar {
display: none;
}
`;

const Selected = styled.p`
  color: ${ props => ( props.selected === true ? "#14E59E" : "#000" ) };
  margin-right: 9%;
`;

const Blur = styled.div`
  position: absolute;
  top: -80px;
  min-width: 100vw;
  height: 80px;
  background-image: linear-gradient(transparent, #ffffff8c);
`;

const StudyButton = styled( BasicButton )`
box-sizing: border-box;
align-self: ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "flex-start" : "center" };
border-radius: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "33px" :
  "5px" };
margin-top: 20px;
margin-bottom: 6px;
margin-left: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "9%;" :
  "0" };
  > span {
  font-weight: bold;
  color: white;
  font-size:${ props => props.theme.appView === APP_VIEW_DESKTOP ? "24px" :
  "32px" };
  }

`;

const TopContainer = styled.div`
display: flex;
flex-direction: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "row" :
  "row" };
font-size: 12px;
width: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "50%" : "100%" };
justify-content: ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "flex-end" : "center" };
align-items: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "flex-end" :
  "center" };
margin-top: 15px;
order: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "2" : "1" };

.back-arrow{
display: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "none" :
  "flex" };
justify-content: center;
width: 20%;
}

.select-text{
display: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "none" :
  "block" }
}
`;

const StyledIconLeft = styled( Icon )`
  margin-right: 9%;
`;

const SearchContainer = styled.div`
  margin:${ props => props.theme.appView === APP_VIEW_DESKTOP ? "0 21% 2px 0" :
  "0 auto" };
  width: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "58%" : "50%" };
  max-width: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "70%" :
  "100%" };
`;

const previewDeckStyles = setUpCssValues( {
  [ THEMING_VARIABLES.APP_VIEW ]: {
    [ APP_VIEW_DESKTOP ]: {
      yes: css`
border-radius: 10px;
`, no: css`
border-radius: 0;
`,
    },
  }, [ THEMING_VARIABLES.FOOTER ]: {
    [ THEMING_VALUES.VISIBLE ]: {
      yes: ( props => {
        css`
height:( ${ props.theme.height } - ${ THEME.NAV_BAR_HEIGHT } - ${ THEME.FOOTER_HEIGHT }) + px;
padding-bottom: ${ THEME.FOOTER_HEIGHT }+ px;
`;
      } ), no: ( props => {
        css`
height:( ${ props.theme.height } - ${ THEME.NAV_BAR_HEIGHT } - ${ THEME.FOOTER_HEIGHT }) + px;
padding-bottom:0;
`;
      } ),
    },
  },
} );

const StyledPreviewDeck = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  max-width: 1140px;
  width: 100%;
  ${ props => previewDeckStyles( props ) };
  
    /* width */
::-webkit-scrollbar {
display: none;
}
`;

const StyledPreviewDeckHolder = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: 150px;
  margin: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "0 6.4%" :
  "0px" };
    /* width */
::-webkit-scrollbar {
display: none;
}

`;

