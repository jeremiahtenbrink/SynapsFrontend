import React from "react";
import styled from "styled-components";

/**
 *   BaseContainer
 *
 *  @component
 *
 */
export const BaseContainer = ( { children, ...props } ) => {
  return ( <Container { ...props } key={ props.name }>
    { children }
  </Container> );
};

const Container = styled.div`
display: flex;
${ props => {
  return `
width: ${ props.minWidth || "100%" };
height: ${ props.minHeight || "100%" };
flex-direction: ${ props.flexDirection || "row" };
border: ${ props.border ? "1px solid red" : "" };
  `;
} };

`;

export default BaseContainer;
