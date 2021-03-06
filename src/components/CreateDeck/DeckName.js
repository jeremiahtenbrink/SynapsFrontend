import React from "react";
import { FormInput } from "..";
import styled, { css } from "styled-components";
import { CardEditDeleteIcons } from "../Icon/CardEditDeleteIcons.js";
import {
  APP_VIEW_DESKTOP, APP_VIEW_MOBILE
} from "../../utilities/constants.js";
import { onAppView } from "../../utilities/themeHelper";

export const DeckName = ( {
  value, name, setNewDeck, newDeck, setDisableInput, highlighted, setHighlighted, clickHandler, changeHandler, appView, ...props
} ) => {
  
  return (
    <DeckNameContainer data-testid={ "desk-name-component" } { ...props }>
      <DeckNameIconContainer data-testid={ "deck-name-container" }>
        <DeckTitlePrompt appView={ appView } highlighted={ highlighted }
                         data-testid={ "deck-title-prompt" }>
          { appView === APP_VIEW_MOBILE ? "Title of Deck" : "Name of Deck" }
        </DeckTitlePrompt>
        { appView === APP_VIEW_MOBILE && ( <CardEditDeleteIcons
          setNewDeck={ setNewDeck }
          newDeck={ newDeck }
          type={ "clear" }
          name={ name }
          setDisableInput={ setDisableInput }
        /> ) }
      </DeckNameIconContainer>
      
      <FormInput
        placeholder={ appView === APP_VIEW_MOBILE ? "Start typing..." :
          "Name of Deck" }
        fontWeight={ "normal" }
        appView={ appView }
        className="formClassSynaps"
        onChange={ changeHandler }
        name="title"
        onClick={ clickHandler }
        borderStyle={ highlighted ? "2px solid #4CB69F" : "2px solid #908A7D" }
        width={ appView === APP_VIEW_MOBILE ? "100%" : "35%" }
        bordered={ true }
        value={ value }
      />
    </DeckNameContainer> );
};

const DeckNameContainer = styled.div`
  width: 100%;
  height: ${ props => ( props.appView === APP_VIEW_DESKTOP ? "50%" : "60%" ) };
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
  ${ onAppView`
  desktop:${ props => css`
margin-left: 25px;
` };
  ` }
`;

const DeckTitlePrompt = styled.h1`
  color: ${ props => props.highlighted && props.appView === APP_VIEW_MOBILE ?
  "#4CB69F" : "#888888" };
  ${ props => ( props.appView === APP_VIEW_DESKTOP ? "color: #36405C;" : "" ) };
  font-style: normal;
  font-weight: ${ props => ( props.appView === APP_VIEW_MOBILE ? "bold" :
  "600" ) };
  font-size: ${ props => ( props.appView === APP_VIEW_MOBILE ? "26px" :
  "24px" ) };
  text-align: left;
  line-height: 33px;
  margin: 0;
`;

const DeckNameIconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
