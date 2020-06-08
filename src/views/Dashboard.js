import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BaseContainer } from "../components/Container/BaseContainer.js";
import PropTypes from "prop-types";
import RowOfDecksAndTitle from "../components/RowOfDecks/RowOfDecksTitle.js";
import {
  APP_PATHS,
} from "../utilities/constants.js";
import { getUserDecks } from "../actions";
import { useAppHooks } from "../customHooks/useAppHooks.js";
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
 * @param {Object} props
 * @property {GetHooksFunction} getHooks
 */
export const Dashboard = () => {
  
  const { dispatch, usersState, decksState, theme } = useAppHooks();
  const [ searchTerm, setSearchTerm ] = useState( "" );
  
  useEffect( () => {
    dispatch( getUserDecks( usersState.user.uid ) );
  }, [] );
  
  const search = ( e ) => {
    setSearchTerm( e.target.value );
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
  
  return (
    <StyledDashboard key={ "dashboard-container" } data-testid={ "dashboard" }
                     name={ "dashboard" } flexDirection={ "column" }
                     minHeight={ "100%" }>
      <RowOfDecksAndTitle key={ "favorites" } name={ "Favorites" }
                          searchFunction={ search }
                          decks={ decksState.decks.filter( deck => deck.favorite ===
                            true ) }/>
      <RowOfDecksAndTitle key={ "decks" }
                          decks={ getDecks() }
                          name={ "My Flashcard Decks" }/>
    
    </StyledDashboard> );
};

Dashboard.propTypes = {
  history: PropTypes.object,
};

const StyledDashboard = styled( BaseContainer )`
  display: flex;
  min-height: 700px;
  overflow-y: scroll;
  
  /* width */
::-webkit-scrollbar {
display: none;
}

`;

