import React from "react";
import styled from "styled-components";
import { Button } from "antd";

/**
 *   Button
 *
 *  @component
 *
 */
const BasicButton = ( props ) => {
  return ( <Container data-testid={ "basic-button" }>
  
  </Container> );
};

const Container = styled( Button )`
border: 3px solid #4CB69F;
`;

Button.propTypes = {};

export default BasicButton;