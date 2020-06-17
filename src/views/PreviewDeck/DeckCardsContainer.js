import React from "react";
import styled, { css } from "styled-components";
import { PreviewDeckCards } from "../../components";
import { APP_PATHS } from "../../utilities/constants";
import { useAppHooks } from "../../customHooks/useAppHooks";
import { onThemeValue } from "../../utilities/themeHelper";

/**
 *   DeckCardsContainer
 *
 *  @component
 *
 */
const DeckCardsContainer = ( { cardsSelected, cards, deck, setCardsSelected, selectMode } ) => {
  const { changePath } = useAppHooks();
  
  const cardClicked = card => {
    if( !selectMode ){
      return;
    }
    if( !!cardsSelected[ card.card_id ] ){
      delete cardsSelected[ card.card_id ];
      setCardsSelected( { ...cardsSelected } );
    }else{
      setCardsSelected( { ...cardsSelected, [ card.card_id ]: card } );
    }
  };
  
  return ( <Container data-testid={ "deck-cards-container" }>
    <PreviewDeckCards cardType={ "card" } key={ 0 }
                      onClick={ () => changePath( APP_PATHS.CREATE_DECK_PATH +
                        "/" + deck.deck_name ) }
    />
    { cards.map( card => {
      if( card[ "item" ] ){
        card = card[ "item" ];
      }
      
      return <PreviewDeckCards onClick={ () => cardClicked( card ) }
                               cardType={ "card" }
                               key={ card.card_id }
                               selected={ !!cardsSelected[ card.card_id ] }
                               card={ card }/>;
    } ) }
  </Container> );
};

const containerStyles = onThemeValue( "appView" )`
mobile: ${ () => css`
justify-content: space-evenly;
margin: 0 6.4%;
` };
desktop: ${ () => css`
margin: 0;
` }
`;

const Container = styled.div`
  overflow-y: scroll;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 150px;
 ${ containerStyles };
 border: 1px solid red;

`;

DeckCardsContainer.propTypes = {};

export default DeckCardsContainer;