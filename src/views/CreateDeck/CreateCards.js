import React from "react";
import styled, { css } from "styled-components";
import { CreateCard } from "../../components/CreateCard/CreateCard";
import { APP_VIEW_MOBILE } from "../../utilities/constants";
import { onThemeValue } from "../../utilities/themeHelper";

/**
 *   CreateCards
 *
 *  @component
 *
 */
const CreateCards = ( { changeHandler, clickHandler, highlighted, visible, appView, cardNum, newCard, setNewCard, ...props } ) => {
  
  return ( <Container data-testid={ "create-cards-container" } { ...props }>
    <CreateCard
      id={ 1 }
      appView={ appView }
      changeHandler={ changeHandler }
      name={ "newCardQuestion" }
      drillName={ "question" }
      clickHandler={ clickHandler }
      highlighted={ highlighted.question }
      visible={ visible.question }
      text={ appView === APP_VIEW_MOBILE ? `Card ${ cardNum } - Question` :
        "Question" }
      value={ newCard.question }
      newCard={ newCard }
      setNewCard={ setNewCard }
    />
    <CreateCard
      id={ 2 }
      changeHandler={ changeHandler }
      name={ "newCardAnswer" }
      drillName={ "answer" }
      clickHandler={ clickHandler }
      highlighted={ highlighted.answer }
      visible={ visible.answer }
      text={ appView === APP_VIEW_MOBILE ? `Card ${ cardNum } - Answer` :
        "Answer" }
      value={ newCard.answer }
      newCard={ newCard }
      setNewCard={ setNewCard }
      appView={ appView }
    />
  </Container> );
};

const styles = onThemeValue( "appView" )`
desktop: ${ () => css`
height: 50%;
flex-direction: row;
justify-content: space-between;
align-self:flex-end;
` };
mobile: ${ () => css`
height: 60%;
flex-direction: column;
` }
`;

const Container = styled.div`
 width: 100%;
  display: flex;
  ${ styles };
`;

CreateCards.propTypes = {};

export default CreateCards;