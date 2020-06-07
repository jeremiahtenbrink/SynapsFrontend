import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../Container/BaseContainer.js";
import DeckCard from "../../svgComponents/DeckCard.js";
import { ReactComponent as EmptyFav } from "../../svgs/EmptyFavDeckCard.svg";

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
  
  return ( <Container
    className={ props.name ? props.name + "-container" : "deck-row-container" }>
    { emptyFavCard && <EmptyFav/> }
    { createDeckCard && <DeckCard/> }
    { decks.map( deck => {
      return <DeckCard deck={ deck }/>;
    } ) }
  </Container> );
};

const Container = styled( BaseContainer )`
min-height:190px;
align-items: center;
`;

export default RowOfDecks;