import React from "react";
import styled, { css } from "styled-components";
import { onThemeValue } from "../../utilities/themeHelper";
import SvgButton from "../../components/Button/SvgButton";
import { useAppHooks } from "../../customHooks/useAppHooks";
import { APP_PATHS } from "../../utilities/constants";

/**
 *   StudyButton
 *
 *  @component
 *
 */
const StudyButton = ( { render, deck } ) => {
  const { path, changePath } = useAppHooks();
  
  if( !render ){
    return <></>;
  }
  
  const study = () => {
    changePath( APP_PATHS.QUIZ_MODE + "/" + deck.deck_name );
  };
  return ( <Container data-testid={ "study-button-container" }>
    <SvgButton onClick={ study } secondary
               page={ path }>Study</SvgButton>
  </Container> );
};

StudyButton.propTypes = {};

export default StudyButton;

const studyOnAppView = onThemeValue( "appView" )`
desktop: ${ () => css`
align-self: flex-start;
border-radius: 33px;
margin: 0 0 0 0;
> span {
font-size: 24px;
}
` };
mobile: ${ () => css`
align-self: center;
border-radius: 5px;
margin-left: 0;
> span {
font-size: 32px;
}
` }
`;

const Container = styled.div`
box-sizing: border-box;
margin-top: 20px;
margin-bottom: 6px;
line-height: 0;
  > span {
  font-weight: bold;
  color: white;
  }
${ studyOnAppView };

`;