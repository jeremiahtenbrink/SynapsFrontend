import React from "react";
import styled, { css } from "styled-components";
import { Uploader } from "..";
import TextArea from "../FormItems/Input/TextArea.js";
import CreateCardText from "../Text/CreateCardText.js";
import { CardEditDeleteIcons } from "../Icon/CardEditDeleteIcons.js";
import propTypes from "prop-types";
import { APP_VIEW_MOBILE, } from "../../utilities/constants.js";
import {
  onAppView, onPropVal, onThemeValue
} from "../../utilities/themeHelper";

export const CreateCard = ( {
  newDeck, setNewDeck, newCard, setNewCard, name, changeHandler, value, highlighted, visible, text, drillName, clickHandler, appView, getHooks, ...props
} ) => {
  
  return ( <StyledCreateCardContainer visible={ visible } { ...props }
                                      data-testid={ "create-card-component" }>
    <StyledCreateCardHeaderContainer>
      <CreateCardText
        appView={ appView }
        highlighted={ highlighted }
        text={ text }
      />
      { appView === APP_VIEW_MOBILE && ( <CardEditDeleteIcons
        type={ "clear" }
        name={ name }
        newCard={ newCard }
        setNewCard={ setNewCard }
      /> ) }
    </StyledCreateCardHeaderContainer>
    <StyledCreateCard highlighted={ highlighted } data-testid={ "create-card" }>
      <TextArea
        data-testid={ "text-area" }
        height={ `40%` }
        appView={ appView }
        value={ value }
        clickHandler={ clickHandler }
        drillName={ drillName }
        onChange={ changeHandler }
        placeholder={ appView === APP_VIEW_MOBILE ? "Start typing..." :
          "Add Text" }
      />
      { appView === APP_VIEW_MOBILE ?
        ( <Uploader id={ drillName } getHooks={ getHooks }/> ) :
        ( <UploaderContainer>
          <Uploader id={ drillName } getHooks={ getHooks }/>
        </UploaderContainer> ) }
    </StyledCreateCard>
  </StyledCreateCardContainer> );
};

CreateCard.propTypes = {
  frontCardText: propTypes.string, backCardText: propTypes.string,
};

const borderStyled = onPropVal( "highlighted" )`
true: ${ () => {
  
  return css`
border: 2px solid #4CB69F;
`;
} };
false: ${ () => {
  
  return css`
border: 2px solid #908a7d
`;
} }
`;

const styles = onAppView`
desktop: ${ () => {
  
  return css`
border: 1px solid #36405C;
border-radius: 10px;
flex-direction: column;
background-color: #eeece8;
`;
} };
mobile: ${ () => {
  
  return css`
border-radius: 4px;
`;
} }
`;

const StyledCreateCard = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
  ${ borderStyled };
  ${ styles };
`;

const createCardStyles = onThemeValue( "appView" )`;
desktop: ${ () => css`
width:47%;
height:100%;
margin-bottom: 30px;
visibility: hidden;
` };
mobile: ${ () => css`
width:100%;
height:40%;
margin-bottom: 30px;
visibility: hidden;
` }`;

const visible = onPropVal( "visible" )`
true: ${ () => {
  
  return css`
visibility: visible;
`;
} };
false: ${ () => {
  return css`
visibility: hidden;
`;
} };
`;

const StyledCreateCardContainer = styled.div`
display: flex;
flex-direction: column;
justify-content:space-between;
${ createCardStyles };
${ visible };

`;

const StyledCreateCardHeaderContainer = styled.div`
width: 100%;
height: 10%;
display: flex;
justify-content:space-between;
align-items:center;
`;

const UploaderContainer = styled.div`
width: 100%;
height: 60%;
display: flex;
justify-content:center;
`;
