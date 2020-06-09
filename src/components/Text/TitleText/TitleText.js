import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CardAnimation from "../../CardCountAnimation/cardAnimation.js";
import {
  APP_VIEW_DESKTOP, APP_VIEW_MOBILE,
} from "../../../utilities/constants.js";
import moment from "moment";

/**
 * Title Text
 *
 * @component
 * @example
 *  <TitleText text={"Create Deck"} />
 *
 * @param text
 * @param color
 * @param count
 * @param appView
 * @param deckCreatedDate
 * @return {*}
 */
export const TitleText = ( { text, color = "#2A685B", count, appView, deckCreatedDate } ) => {
  
  return ( <StyledTitleContainer b >
    <StyledTitle color={ color }>{ text }</StyledTitle>
    { count && appView !== APP_VIEW_DESKTOP &&
    <CardAnimation open={ true } count={ count }/> }
    { appView === APP_VIEW_DESKTOP &&
    <><p>{ count } cards</p><p>created { moment( deckCreatedDate )
      .format( "MM.DD.YYYY" ) }</p> </> }
  </StyledTitleContainer> );
};


/**
 * @typedef function StyledTitleContainer
 * @param {string} backGroundColor
 */
const StyledTitleContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "flex-start" : "center" };
p{
font-size: 24px;
font-weight: bold;
line-height: 1.1;
}
`;

const StyledTitle = styled.div`
  color: ${ props => props.color };
  font-weight: 600;
  font-size: 45px;
  text-align: left;
`;

TitleText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  count: PropTypes.number,
  appView: PropTypes.number,
  deckCreatedDate: PropTypes.number,
};
