import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../Container/BaseContainer.js";
import PropTypes from "prop-types";
import { SearchBar, TitleText } from "..";
import { APP_VIEW_DESKTOP } from "../../utilities/constants.js";
import RowOfDecks from "./RowOfDecks.js";
import { useAppHooks } from "../../customHooks/useAppHooks.js";

/**
 *   RowOfDecksTitle
 *
 *  @component
 *
 */
const RowOfDecksAndTitle = ( { searchFunction, searchTerm, decks, name, ...props } ) => {
  
  const { appView } = useAppHooks();
  const key = name.split( " " ).join( "" );
  
  return ( <Container key={ key + "-container" } minHeight={ "100%" }
                      data-testid={ key + "-container" }{ ...props }
                      flexDirection={ "column" }
  >
    <TitleContainer data-testid={ "title-container" } flexDirection={ "row" }
    >
      <TitleText color={ "#36405C" } data-testid={ "title-text-" + key }
                 text={ name || "My Flash Cards" }
      />{ searchFunction && <SearchComponent
      data-testid={ "search-container-" + key }
      placeholder={ "Search Decks" }
      onSearch={ searchFunction }
      onChange={ searchFunction }
      value={ searchTerm }
    /> }
    
    </TitleContainer>
    <RowOfDecks decks={ decks } searchTerm={ searchTerm }
                deck={ props.deck } name={ name }
                createDeckCard={ name !== "Favorites" }
                emptyFavCard={ name === "Favorites" }
    />
  </Container> );
};

const Container = styled( BaseContainer )`
`;

const TitleContainer = styled( BaseContainer )`
display: flex;
${ props => {
  if( props.theme.appView === APP_VIEW_DESKTOP ){
    return `
    flex-direction: row;
    height: 37px;
    `;
  }else{
    return `
    flex-direction: column;
    height: 100%;
    `;
  }
} };


  /* width */
::-webkit-scrollbar {
display: none;
}
`;

const SearchComponent = styled( SearchBar )`

> input{
  border-radius: 14px;
}
${ ( { theme } ) => {
  if( theme.appView === APP_VIEW_DESKTOP ){
    return `
    align-self: flex-end;
    width: 337px;
    height: 100%;
    `;
  }else{
    return `
    align-self: center;
    width: "95%;
    height: 40px;
    `;
  }
} }

`;

RowOfDecksAndTitle.propTypes = {
  name: PropTypes.string.isRequired, searchFunction: PropTypes.func,
  
};

export default RowOfDecksAndTitle;