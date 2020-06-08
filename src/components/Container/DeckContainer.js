import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BaseContainer } from "./BaseContainer.js";
import {
  APP_VIEW_DESKTOP, APP_VIEW_MOBILE, THEME,
} from "../../utilities/constants.js";

/**
 *   DeckContainer
 *
 *  @component
 *
 */
const DeckContainer = ( props ) => {
  
  return ( <Container name={'card'} { ...props } key={ props.name }>
    { props.children }
  </Container> );
};

const Container = styled( BaseContainer )`
position: relative;
cursor: pointer;
#favorite {
cursor: pointer;
}
.deck-name {
position: absolute;
top: 20%;
left: 50%;
transform: translate(-50%, 0);
font-size: ${ props => props.theme.appView === APP_VIEW_MOBILE ? "18px" :
  "32px" };
font-weight: 600;
color: ${ THEME.TEXT_DARK };
}

#heart {
cursor: pointer;
}

${ props => {
  return `
  opacity ${ props.deck ? 0 : 1 };
  `;
} }
  
  ${ ( props ) => {
  if( props.theme.appView === APP_VIEW_DESKTOP ){
    return `
  margin-right: 40px;
  width: 150px;
  height: 195px;
  `;
  }else{
    return `
  margin-right: 20px;
  width: 108px;
  height: 140px;
  
`;
  }
}

};

`;

DeckContainer.propTypes = {};

export default DeckContainer;