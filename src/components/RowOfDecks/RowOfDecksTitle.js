import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BaseContainer } from "../Container/BaseContainer.js";
import PropTypes from "prop-types";
import { SearchBar, TitleText } from "..";
import {
  APP_VIEW_DESKTOP, APP_VIEW_MOBILE,
} from "../../utilities/constants.js";
import DeckCard from "../../svgComponents/DeckCard.js";
import RowOfDecks from "./RowOfDecks.js";
import { useAppHooks } from "../../customHooks/useAppHooks.js";

const options = {
  keys: [
    "deck_name",
  ],
};

/**
 *   RowOfDecksTitle
 *
 *  @component
 *
 */
const RowOfDecksAndTitle = ( { searchFunction, searchTerm, decks, name, ...props } ) => {
  
  const { appView } = useAppHooks();
  
  return ( <Container className={ props.name + "-container" }{ ...props }
                      data-testid={ "top-container" } flexDirection={ "column" }
                      height={ appView === APP_VIEW_DESKTOP ? "261px" :
                        "38px" }>
    <TitleContainer className={ "title-container" } flexDirection={ "row" }
                    height={ "38px" }>
      <TitleText color={ "#36405C" }
                 text={ name || "My Flash Cards" }
      />{ searchFunction && <SearchComponent
      placeholder={ "Search Decks" }
      onSearch={ searchFunction }
      onChange={ searchFunction }
      value={ searchTerm }
    /> }
    
    </TitleContainer>
    <RowOfDecks decks={ decks } searchTerm={ searchTerm }
                deck={ props.deck }
                createDeckCard={ name !== "Favorites" }
                emptyFavCard={ name === "Favorites" }
    />
  </Container> );
};

const Container = styled( BaseContainer )`
`;

const TitleContainer = styled( BaseContainer )`
display: flex;
flex-direction: ${ props => {
  return props.theme.appView === APP_VIEW_DESKTOP ? "row" : "column";
} };

  /* width */
::-webkit-scrollbar {
display: none;
}
`;

const SearchComponent = styled( SearchBar )`
height: 37px;
width: 337px;
> input{
  border-radius: 14px;
}

`;

RowOfDecksAndTitle.propTypes = {
  getHooks: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  searchFunction: PropTypes.func,
  
};

export default RowOfDecksAndTitle;