import React from "react";
import styled, { css } from "styled-components";
import DeckCard from "../../svgComponents/DeckCard.js";
import { APP_VIEW_DESKTOP } from "../../utilities/constants.js";
import { ReactComponent as EmptyCard } from "../../svgs/emtyDeckCard.svg";
import { onPropVal, onThemeValue } from "../../utilities/themeHelper";

/**
 *   DeckRow
 *
 *  @component
 *
 */
export const DeckRow = ( { decks, name, createDeckCard } ) => {
  return ( <Container data-testid={ "deck-row-" + name } name={ name }>
    { createDeckCard && <DeckCard key={ "create-deck" }/> }
    { decks.length === 0 && name === "Favorites" && <EmptyCardStyles/> }
    { decks.map( deck => {
      return <DeckCard key={ deck.deck_id } deck={ deck }/>;
    } ) }
  </Container> );
};

const emptyStyles = onThemeValue( "appView" )`
mobile: ${ () => css`
height: 150px;
width: 108px;
` }
`;

const EmptyCardStyles = styled( EmptyCard )`
${ emptyStyles };
`;

const favDeckStyles = onPropVal( "name" )`
Favorites: ${ () => css`
height: 200px;
margin-top:2.5rem;
` }
`;

const Container = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: flex-start;
${ ( { theme } ) => {
  if( theme.appView === APP_VIEW_DESKTOP ){
    return css`
    height: 216px;
  `;
  }else{
    return css`
    height: max-content;
    
`;
  }
} }
${ favDeckStyles };

`;
