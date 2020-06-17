import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import CardAnimation from "../../CardCountAnimation/cardAnimation.js";
import { APP_VIEW_DESKTOP, } from "../../../utilities/constants.js";
import moment from "moment";
import { onThemeValue } from "../../../utilities/themeHelper";

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
  
  return ( <StyledTitleContainer data-testid={ "title-container" }>
    <StyledTitle color={ color }>{ text }</StyledTitle>
    { count && appView !== APP_VIEW_DESKTOP &&
    <CardAnimation open={ true } count={ count }/> }
    { appView === APP_VIEW_DESKTOP &&
    <><p>{ count } cards</p><p>created { moment( deckCreatedDate )
      .format( "MM.DD.YYYY" ) }</p> </> }
  </StyledTitleContainer> );
};

const titleStyles = onThemeValue( "appView" )`
mobile: ${ () => css`
flex-direction: row;
justify-content: space-around;
` };
desktop: ${ () => css`
align-items: flex-start;
margin-left: 5%;

` }
`;

const StyledTitleContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
${ titleStyles };
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
