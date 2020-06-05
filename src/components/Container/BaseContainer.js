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
width: 100%;
height: 100%;
`;

BaseContainer.propTypes = {};
