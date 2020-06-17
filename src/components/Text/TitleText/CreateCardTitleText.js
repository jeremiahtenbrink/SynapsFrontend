import React from "react";
import styled, { css } from "styled-components";
import { onThemeValue } from "../../../utilities/themeHelper";

/**
 * Title Text
 *
 * @component
 * @example
 *  <TitleText text={"Create Deck"} />
 *
 */
export const CreateCardTitleText = ( { children, ...props } ) => {
  return <StyledTitle { ...props }>{ children }</StyledTitle>;
};

const styles = onThemeValue( "appView" )`
desktop: ${ () => css`
color:  #36405C;
font-weight: 600;
font-size: 47px;
 line-height: 30px;
` };
mobile: ${ () => css`
color:  #2A685B;
font-weight: 900;
font-size: 45px;
 line-height: 1;
` }
`;

const StyledTitle = styled.h1`
  font-style: normal;
  text-align: left;
  h1 {
    margin: 0;
  }
  ${ styles };
`;

CreateCardTitleText.propTypes = {
};
