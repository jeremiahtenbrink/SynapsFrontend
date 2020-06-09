import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import BasicButton from "./Button.js";

/**
 * Button Component
 *
 * @component
 *
 * @example
 * return (
 *    <PrimaryButton  />
 *    )
 */
export const PrimaryButton = ( {
  text, height, width, type = "primary", size = "default", icon, shape, loading, block, color, appView, allFieldsValidated, ...props
} ) => {
  return ( <StyledAntdButton
    type={ type }
    size={ size }
    icon={ icon }
    shape={ shape }
    loading={ loading }
    block={ block && "block" }
    height={ height }
    width={ width }
    { ...props }
  >
    { text }
  </StyledAntdButton> );
};

PrimaryButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf( [
    "primary", "primaryCreateCard", "defaultCreateCard", "default", "dashed",
    "danger", "link", "darkgray",
  ] ),
  size: PropTypes.oneOf( [ "large", "default", "small" ] ),
  icon: PropTypes.string,
  shape: PropTypes.oneOf( [ "circle", "round" ] ),
  loading: PropTypes.bool,
  block: PropTypes.bool,
  background: PropTypes.string,
};

const StyledAntdButton = styled( BasicButton )`
  && {
    border: ${ props => {
  debugger;
  if( props.type === "defaultCreateCard" && props.appView ===
    "APP_VIEW_MOBILE" ){
    return "3px solid #4CB69F";
  }else if( props.type === "defaultCreateCard" && props.appView ===
    "APP_VIEW_DESKTOP" ){
    return "1px solid #343D58";
  }
} };

    height: ${ props => ( props.height ? props.height : "100%" ) };
    width: ${ props => ( props.width ? props.width : "100%" ) };

    color: ${ props => {
  debugger;
  if( props.appView === "APP_VIEW_MOBILE" ){
    if( props.type === "secondary" ){
      return "white";
    }else if( props.type === "defaultCreateCard" ){
      return "#4CB69F";
    }else if( props.type === "primaryCreateCard" ){
      return "#fff";
    }else{
      return "black";
    }
  }else{
    if( props.type === "defaultCreateCard" ){
      return "#343D58";
    }else if( props.type === "primaryCreateCard" ){
      return "#fff";
    }
  }
} };


    :active {
      background-color: ${ props => {
  debugger;
  if( props.type === "primaryCreateCard" && props.allFieldsValidated ){
    return "#235449";
  }else if( props.type === "defaultCreateCard" ){
    return "#6FEDB7";
  }
} };
      border: ${ props => {
  if( props.appView === "APP_VIEW_MOBILE" && props.allFieldsValidated ){
    if( props.type === "primaryCreateCard" ){
      return "3px solid #235449";
    }else if( props.type === "defaultCreateCard" ){
      return "3px solid #6FEDB7";
    }else{
      return 0;
    }
  }
} };
    }
    ${ props => {
  debugger;
  if( props.type === "primaryCreateCard" || props.type ===
    "defaultCreateCard" ){
    if( props.appView === "APP_VIEW_MOBILE" ){
      return "width: 136px; height: 42px; border-radius: 11px;";
    }else{
      return "width: 264px; height: 54px; border-radius: 33px;";
    }
  }
} }
    ${ props => {
  debugger;
  if( props.type === "primaryCreateCard" || props.type ===
    "defaultCreateCard" ){
    if( props.appView === "APP_VIEW_DESKTOP" ){
      return "font-size: 21px;";
    }
  }
} }
  }
`;

