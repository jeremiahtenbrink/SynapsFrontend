import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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
  
  
  const getDecks = () => {
    
    if( decksState && decksState.decks ){
      const decksToSend = decksState.decks.filter( deck => deck.favorite ===
        false );
      const fuse = new Fuse( decksToSend, options );
      if( searchTerm !== "" ){
    
        const decks = fuse.search( searchTerm );
        console.log( decks );
        return decks;
    
      }else{
        return decksToSend;
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

