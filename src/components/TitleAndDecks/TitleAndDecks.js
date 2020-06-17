import React from "react";
import styled, { css } from "styled-components";
import { BaseContainer, SearchBar, TitleText } from "..";
import { DeckRow } from "./DeckRow.js";
import { onThemeValue } from "../../utilities/themeHelper";

/**
 *   TitleAndDecks
 *
 *  @component
 *
 */
const TitleAndDecks = ( { onSearch, decks, title, ...props } ) => {
  
  return (
    <Container data-testis={ "title-and-deck-row-container" } { ...props }>
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
`;

const titleStyles = onThemeValue( "appView" )`
mobile: ${ () => css`
flex-direction: column;
height: 60px;
align-items: flex-start;
` };
desktop: ${ () => css`
flex-direction: row;
height: 50px;
align-items: center;
` }
`;

const TitleContainer = styled( BaseContainer )`
display: flex;
${ titleStyles };

/* width */
::-webkit-scrollbar { display: none; }
    
`;

export default TitleAndDecks;