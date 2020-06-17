import React from "react";
import styled, { css } from "styled-components/macro";
import { onAppView } from "../../utilities/themeHelper";

const StyledCardText = ( { text, highlighted, appView } ) => {
  return ( <StyledTitle appView={ appView } highlighted={ highlighted }
                        data-testid={ "card-text-component" }>
    { text }
  </StyledTitle> );
};

const styles = onAppView`
desktop: ${ () => css`
color: #36405C;
font-weight: normal;
line-height: 30px;
` }
mobile: ${ () => css`
color: #2A685B;
font-weight: bold;
` }
`;

const StyledTitle = styled.h1`
  text-align: left;
  ${ styles };
`;

export default StyledCardText;
