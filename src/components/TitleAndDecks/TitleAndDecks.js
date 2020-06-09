import React from "react";
import styled, { css } from "styled-components";
import { SearchBar, TitleText } from "..";
import { BaseContainer } from "../Container/BaseContainer.js";
import {
  APP_VIEW_DESKTOP, APP_VIEW_MOBILE,
} from "../../utilities/constants.js";
import { DeckRow } from "./DeckRow.js";
import {
  THEMING_VARIABLES,
} from "../../customHooks/themingRules.js";
import { setUpCssValues } from "../../utilities/getStyles.js";

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

const themeValues = {
  [ THEMING_VARIABLES.APP_VIEW ]: {
    [ APP_VIEW_DESKTOP ]: { prop: "height", yes: "267px", no: "100%" },
  },
};

const containerCss = setUpCssValues( themeValues );

const Container = styled.div`
${ ( { theme } ) => containerCss( theme ) };

`;

const themingVariables = {
  [ THEMING_VARIABLES.APP_VIEW ]: {
    [ APP_VIEW_DESKTOP ]: {
      yes: css`
flex-direction: row;
height: 50px;
align-items: center;
`, no: css`
flex-direction: column;
height: 60px;
align-items: flex-start;
`,
    },
  },
};

const sendProps = setUpCssValues( themingVariables );

const TitleContainer = styled( BaseContainer )`
display: flex;
${ props => sendProps( props ) };

/* width */
::-webkit-scrollbar { display: none; }
    
`;

export default TitleAndDecks;