import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PreviewDeckCards, SearchBar, TitleText } from "../components";
import { BaseContainer } from "../components/Container/BaseContainer.js";
import PropTypes from "prop-types";
import {
  APP_PATHS, APP_VIEW_DESKTOP, APP_VIEW_MOBILE, MEDIA_QUERIES, THEME,
} from "../utilities/constants.js";
import { getUserDecks } from "../actions";
import Fuse from "fuse.js";

const options = {
  keys: [
    "deck_name",
  ],
};

/**
 * Dashboard
 * @category Views
 * @component
 * @example return (<Dashboard />);
 */
export const Dashboard = ( { getHooks } ) => {
  
  const [ searchTerm, setSearchTerm ] = useState( "" );
  const {
    appView, changePath, dispatch, usersState, decksState, theme,
  } = getHooks();
  const search = e => {
    setSearchTerm( e.target.value );
  };
  
  useEffect( () => {
    
    dispatch( getUserDecks( usersState.user.uid ) );
  }, [] );
  
  const deckClicked = ( deck = undefined ) => {
    
    if( !deck ){
      console.log( APP_PATHS.CREATE_DECK_PATH );
      changePath( APP_PATHS.CREATE_DECK_PATH );
      return;
    }
    changePath( APP_PATHS.PREVIEW_DECK_PATH + "/" + deck.deck_name );
    
  };
  
  const getDecks = () => {
    
    if( decksState && decksState.decks ){
      const fuse = new Fuse( decksState.decks, options );
      if( searchTerm !== "" ){
        
        const decks = fuse.search( searchTerm );
        console.log( decks );
        return decks;
        
      }else{
        return decksState.decks;
      }
    }
    return [];
    
  };
  
  return ( <StyledDashboard className={ "dashboard" }>
    <TitleContainer className={ "title-container" }>
      <TitleText color={ "#36405C" }
                 text={ appView === APP_VIEW_MOBILE ? "Dashboard" :
                   "My" + " Flash Cards" }
      />
      <SearchBar
        theme={ theme }
        onSearch={ search }
        onChange={ search }
      />
    </TitleContainer>
    
    
    <StyledDeckHolder className={ "deck-container" }>
      <PreviewDeckCards
        border={ "dashed" }
        getHooks={ getHooks }
        onClick={ e => deckClicked() }
      
      />
      { getDecks().map( deck => {
        if( deck[ "item" ] ){
          deck = deck[ "item" ];
        }
        
        return ( <PreviewDeckCards
          key={ deck.deck_id }
          getHooks={ getHooks }
          deck={ deck }
          border={ "solid" }
          onClick={ e => deckClicked( deck ) }
        /> );
      } ) }
    </StyledDeckHolder>
  </StyledDashboard> );
};



Dashboard.propTypes = {
  history: PropTypes.object,
};

const Selected = styled.p`
  color: ${ props => props.selected === ( true ) ? "#14E59E" : "#000" };
  margin-right: 9%;
`;

const TitleContainer = styled( BaseContainer )`
display: flex;
flex-direction: ${ props => {
  return props.theme.appView === APP_VIEW_DESKTOP ? "row" : "column";
} };

  /* width */
::-webkit-scrollbar {
display: none;
}

`;

const StyledDeckHolder = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: min-content;
  left: 10%;
`;
const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  
  
  /* width */
::-webkit-scrollbar {
display: none;
}

`;

