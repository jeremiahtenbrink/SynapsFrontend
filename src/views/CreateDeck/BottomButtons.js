import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";
import SvgButton from "../../components/Button/SvgButton";
import { APP_VIEW_DESKTOP, APP_VIEW_MOBILE } from "../../utilities/constants";
import { onAppView } from "../../utilities/themeHelper";

/**
 *   BottomButtons
 *
 *  @component
 *
 */
const BottomButtons = ( { submitForm, doneSubmit, appView, ...props } ) => {
  return ( <Container data-testid={ "submit-buttons" } { ...props }>
    <ButtonContainer>
      <BottomButton
        secondary
        onClick={ submitForm }
      >{ "Add Another Card" }</BottomButton>
    </ButtonContainer>
    <ButtonContainer>
      <BottomButton
        white
        onClick={ doneSubmit }
      >{ appView === APP_VIEW_MOBILE ? "Done" :
        "Done Adding Cards" }</BottomButton>
    </ButtonContainer>
  </Container> );
};

const BottomButton = styled( SvgButton )`
  ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "margin-top: 10px;" :
  "" }
`;

const ButtonContainer = styled.div``;

const appViewStyles = onAppView`
desktop: ${ () => css`
width: 30%;
height: 100%;
margin-top:10%;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px 0 0 0;
` };
mobile: ${ () => css`
width: 100%;
height: 70px;
justify-content: space-around;
padding: 0 0 40px 0;
` }
`;

const Container = styled.div`
display: flex;
p {
  width: 100%;
}
${ appViewStyles };
`;

BottomButtons.propTypes = {
  appView: PropTypes.string.isRequired,
  doneSubmit: PropTypes.func.isRequired,
  props: PropTypes.any,
  submitForm: PropTypes.func.isRequired
};

export default BottomButtons;