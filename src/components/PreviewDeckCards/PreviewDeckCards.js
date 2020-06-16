import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Card } from "antd";
import { ReactComponent as AddCardButton } from "../../svgs/addCardButton.svg";
import { APP_VIEW_DESKTOP } from "../../utilities/constants.js";
import { ReactComponent as Check } from "../../images/Vector.svg";
import { useAppHooks } from "../../customHooks/useAppHooks.js";
import { onThemeValue } from "../../utilities/themeHelper";

/**
 * Preview Deck Cards
 *
 * @description This component shows the users all the different decks in
 * the deck.
 *
 * @component
 *
 * @example
 * return (
 *  <PreviewDeckCards text={"Card Title"} />
 * )
 * @param text
 * @param loading
 * @param block
 * @param hoverEffect
 * @param selected
 * @param {Deck}deck
 * @param {Card}card
 * @param type
 * @param size
 * @param props
 * @return {*}
 */
export const PreviewDeckCards = ( {
  loading, block, hoverEffect, selected = false, cardType = "deck", deck, type = "inner", size = "default", card, ...props
} ) => {
  
  const { appView } = useAppHooks();
  
  const removeExtraLetters = ( str ) => {
    str = str.split( " " );
    
    str = str.map( word => {
      if( word.length > 40 ){
        
        word = word.slice( 0, 40 );
      }
      return word;
    } );
    return str.join( " " );
  };
  
  return ( <StyledAntdCard
    type={ type }
    size={ size }
    block={ block && "block" }
    selected={ selected }
    { ...props }
  >
    { ( !deck && cardType === "deck" || !card && cardType === "card" ) &&
    ( <p className={ "deck-text" }>
      Add { cardType === "deck" ? "Deck" : "Card" }
    </p> ) }
    { ( !deck && cardType === "deck" || !card && cardType === "card" ) &&
    <AddCardButton width={ appView === APP_VIEW_DESKTOP ? "55px" : "49PX" }
                   height={ appView === APP_VIEW_DESKTOP ? "55px" : "49PX" }/> }
    { ( deck || card ) &&
    <p className={ "deck-text" }>{ cardType === "deck" ? deck.deck_name :
      card.question }</p> }
    { selected && <StyledCheck> </StyledCheck> }
  
  
  </StyledAntdCard> );
};

const StyledCheck = styled( Check )`
  align-self: flex-end;
  text-align: right;
  position: absolute;
  bottom: 7px;
  right: 10px;

`;

const size = onThemeValue( "appView" )`
mobile: ${ props => {
  return css`
width: 108px;
height: 153px;
`;
} },
desktop: ${ props => {
  return css`
width: 153px;
height: 196px;
`;
} }
`;

const StyledAntdCard = styled( Card )`


  && {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    ${ size };
    margin-top: 20px;
    border-radius: 13px;
    border: ${ props => props.selected === true ? "4px solid D7EEE7" :
  "3px solid #d7eee7" };
    background: #eeece8;
    box-sizing: border-box;
    font-size: 13px;
    margin-left: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "30px" :
  "3px" };
    margin-right: ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "30px" : "3px" };

    &.ant-card.ant-card-bordered.ant-card-type-inner {
      background-color: ${ props => props.selected === true ? "#8CB1AA" :
  "#EEECE8" };
    }


    > .ant-card-body {
      padding: 10px;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;

      > p.deck-text {
      word-break: break-word;
        text-overflow: hidden;
        overflow-x: hidden;
        font-weight: bold;
        color: #5c6078;
        line-height: 15px;
        margin-bottom: 1.2rem;
      }
    }
  }
`;

PreviewDeckCards.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.bool,
  block: PropTypes.bool,
  hoverEffect: PropTypes.bool,
  deck: PropTypes.object,
  type: PropTypes.oneOf( [ "inner" ] ),
  size: PropTypes.oneOf( [ "default" ] ),
};
