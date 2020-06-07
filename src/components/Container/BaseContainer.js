import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  return `
width: ${ props.width || "100%" };
height: ${ props.height || "100%" };
flex-direction: ${ props.flexDirection || "row" };
border: ${ props.border ? "1px solid red" : "" };
  `;
} };
`;

BaseContainer.propTypes = {};
