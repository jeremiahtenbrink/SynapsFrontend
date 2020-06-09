import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { PreviewDeckCards, SearchBar, TitleText } from "../components";
import { BaseContainer } from "../components/Container/BaseContainer.js";
import PropTypes from "prop-types";
import {
  APP_PATHS, APP_VIEW_DESKTOP, APP_VIEW_MOBILE, MEDIA_QUERIES, THEME,
} from "../utilities/constants.js";
import { getUserDecks } from "../actions";
import Fuse from "fuse.js";
import TitleAndDecks from "../components/TitleAndDecks/TitleAndDecks.js";
import { useAppHooks } from "../customHooks/useAppHooks.js";

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
export const Dashboard = () => {
  
  const [ searchTerm, setSearchTerm ] = useState( "" );
  const {
    appView, changePath, dispatch, usersState, decksState, theme,
  } = useAppHooks();
  
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
    
    <TitleAndDecks decks={ decksState.decks.filter( deck => deck.favorite ) }
                   title={ "Favorites" } onSearch={ search }
    >
    </TitleAndDecks>
    <TitleAndDecks decks={ getDecks() } title={ "My Decks" }/>
  </StyledDashboard> );
};

Dashboard.propTypes = {
  history: PropTypes.object,
};

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

