import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Container Div
 *
 * @description Container component that is easy to set up and use to keep
 * other components within a container.
 *
 * @component
 * @example
 * return (
 *  <ContainerDiv >
 *    <PrimaryButton text="Click Me" />
 *  </ContainerDiv>
 *  )
 */
export const ContainerDiv = props => {
  
  return <Div { ...props }>{ props.children }</Div>;
};

ContainerDiv.propTypes = {
  alignItems: PropTypes.string,
  backgroundColor: PropTypes.string,
  children: PropTypes.any,
  flexDirection: PropTypes.string,
  height: PropTypes.string,
  justifyContent: PropTypes.string,
  left: PropTypes.string,
  margin: PropTypes.string,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  overFlowY: PropTypes.string,
  overFlowX: PropTypes.string,
  position: PropTypes.string,
  top: PropTypes.string,
  width: PropTypes.string,
  zIndex: PropTypes.number,
  padding: PropTypes.string,
  transform: PropTypes.string,
};

const Div = styled.div`
  box-sizing: border-box;
  display: flex;
  top: ${ props => props.top || 0 };
  left: ${ props => props.left || 0 };
  padding: ${ props => props.padding || 0 };
  margin: ${ props => props.margin || "0" };
  position: ${ props => props.position || "absolute" };
  width: ${ props => props.width || "100vw" };
  height: ${ props => props.height || "100vh" };
  max-height: ${ props => props.maxHeight || "100vh" };
  max-width: ${ props => props.maxWidth || "100vw" };
  z-index: ${ props => props.zIndex || 1 };
  align-items: ${ props => props.alignItems || "center" };
  flex-direction: ${ props => props.flexDirection || "column" };
  justify-content: ${ props => props.justifyContent || "center" };
  overflow-y: ${ props => props.overFlowY || "hidden" };
  overflow-x: ${ props => props.overFlowX || "hidden" };
  transform: ${ props => props.transform || "none" };
  ::-webkit-scrollbar {
    width: 0;
  }
`;
