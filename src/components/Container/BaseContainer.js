import React from "react";
import styled, { css } from "styled-components";

/**
 *   BaseContainer
 *
 *  @component
 *
 */
export const BaseContainer = ( { children, ...props } ) => {
  return ( <Container { ...props }>
    { children }
  </Container> );
};

const Container = styled.div`
display: flex;
${ props => {
  return css`
width: ${ props.width || "100%" };
height: ${ props.height || "100%" };
flex-direction: ${ props.flexDirection || "row" };
border: ${ props.border ? "1px solid red" : "" };
  `;
} };
`;

BaseContainer.propTypes = {};
