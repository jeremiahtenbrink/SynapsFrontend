import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { CreateCardTitleText } from "../../components/Text/TitleText/CreateCardTitleText";
import { APP_VIEW_DESKTOP, APP_VIEW_MOBILE } from "../../utilities/constants";
import CardAnimation from "../../components/CardCountAnimation/cardAnimation";
import { onThemeValue } from "../../utilities/themeHelper";
import BottomButtons from "./BottomButtons";

/**
 *   CardHeader
 *
 *  @component
 *
 */
const CardHeader = ( { appView, passedInDeckName, cardNum, highlighted, doneSubmit, submitForm, ...props } ) => {
  return ( <Container { ...props } data-testid={ "create-card-header" }>
    <CreateCardTitleText>{ passedInDeckName ? "Create Cards" :
      appView === APP_VIEW_MOBILE ? "Create Deck" :
        "Create New Deck of Flashcards" }</CreateCardTitleText>
    { appView === APP_VIEW_DESKTOP ?
      <BottomButtons appView={ appView } doneSubmit={ doneSubmit }
                     submitForm={ submitForm }/> : <CardAnimation
        open={ cardNum > 1 || highlighted.question || highlighted.answer }
        count={ cardNum +
        ( highlighted.question || highlighted.answer ? 0 : -1 ) }/> }
  
  </Container> );
};

const styles = onThemeValue( "appView" )`
desktop: ${ () => css`
height: 50%;
` };
`;
const Container = styled.div`
width: 100%;
padding: 0 2px;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: row;
margin-top: 0;
  ${ styles };
  h1 {
    margin: 0;
  }
`;

CardHeader.propTypes = {
  appView: PropTypes.string.isRequired,
  cardNum: PropTypes.number.isRequired,
  doneSubmit: PropTypes.func.isRequired,
  highlighted: PropTypes.object,
  passedInDeckName: PropTypes.string,
  submitForm: PropTypes.func.isRequired
};

export default CardHeader;