import React from "react";
import styled, { css } from "styled-components";
import { SearchBar, TitleText } from "..";
import { BaseContainer } from "../Container/BaseContainer.js";
import {
  APP_VIEW_DESKTOP,
} from "../../utilities/constants.js";
import { DeckRow } from "./DeckRow.js";

/**
 *   TitleAndDecks
 *
 *  @component
 *
 */
const TitleAndDecks = ( { onSearch, decks, title, ...props } ) => {
  
  return ( <Container data-testis={ "title-and-deck-row-container" }>
    <TitleContainer className={ "title-container" }>
      <TitleText color={ "#36405C" }
                 text={ title }
      />
      
      { onSearch && <SearchBar height={ "37px" }
                               borderRadius={ "15px" }
                               onSearch={ onSearch }
                               onChange={ onSearch }
                               width={ "90%" }
      /> }
    </TitleContainer>
    <DeckRow decks={ decks } name={ title }
             createDeckCard={ title === "My" + " Decks" }/>
  </Container> );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    ${ ( { theme } ) => {
  if( theme.appView === APP_VIEW_DESKTOP ){
    return css`
    height: 262px;
`;
  }else{
    return css`
    height: 100%;
`;
  }
} }
    `;

const TitleContainer = styled( BaseContainer )`
    display: flex;
    ${ props => {
  return css`
flex-direction: ${ props.theme.appView === APP_VIEW_DESKTOP ? "row" : "column" };
height: ${ props.theme.appView === APP_VIEW_DESKTOP ? "50px" : "30px" };
align-items: center;
`;
} };
    /* width */
    ::-webkit-scrollbar { display: none; }
    
    `;

TitleAndDecks.propTypes = {};

export default TitleAndDecks;