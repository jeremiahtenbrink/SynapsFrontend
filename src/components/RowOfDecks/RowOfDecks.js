import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../Container/BaseContainer.js";
import DeckCard from "../../svgComponents/DeckCard.js";
import { ReactComponent as EmptyFav } from "../../svgs/EmptyFavDeckCard.svg";
import DeckContainer from "../Container/DeckContainer.js";

/**
 *   RowOfDecks
 *
 *  @component
 *
 *  @param decks
 *  @param createDeckCard
 *  @param emptyFavCard
 *  @param {Object} props
 *
 */
const RowOfDecks = ( { decks, createDeckCard = false, emptyFavCard = false, ...props } ) => {
  
  return ( <Container name={'row-container'}
    className={ props.name ? props.name + "-container" : "deck-row-container" }>
    { emptyFavCard &&
    <DeckContainer key={ "empty-fav-card" }><EmptyFav/></DeckContainer> }
    { createDeckCard && <DeckCard key={ "create-card" }/> }
    { decks.map( deck => {
      return <DeckCard deck={ deck } key={ deck.deck_name }/>;
    } ) }
  </Container> );
};

const Container = styled( BaseContainer )`
min-height:190px;
align-items: center;
flex-wrap: wrap;
`;

export default RowOfDecks;