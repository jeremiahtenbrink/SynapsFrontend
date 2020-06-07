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
  
  const { dispatch, usersState, decksState } = useAppHooks();
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
  
  return ( <StyledDashboard className={ "dashboard" }>
    <RowOfDecksAndTitle key={ "favorites" } name={ "Favorites" }
                        searchFunction={ search }
                        decks={ decksState.decks.filter( deck => deck.favorite ===
                          true ) }/>
    <RowOfDecksAndTitle key={ "decks" }
                        decks={ getDecks() }
                        name={ "My Flashcard Decks" }/>
  
  </StyledDashboard> );
};

const DeckRow = styled( BaseContainer )`
align-items: center;
`;

Dashboard.propTypes = {
  history: PropTypes.object,
};

const Selected = styled.p`
  color: ${ props => props.selected === ( true ) ? "#14E59E" : "#000" };
  margin-right: 9%;
`;

const StyledDeckHolder = styled.div`
  max-width: 100%;
  display: flex;
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

