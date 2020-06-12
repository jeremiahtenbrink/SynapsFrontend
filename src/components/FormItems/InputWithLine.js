import React, { useRef } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Input, Form } from "antd";
import { ReactComponent as Line } from "../../svgs/inputLine.svg";

/**
 *   InputWithLine
 *
 *  @component
 *
 */
export const InputWithLine = ( props ) => {
  const inputRef = useRef();
  
  return ( <FormItem data-testid={ "form-item" } { ...props }>
    { props.password ? <Input.Password ref={ inputRef } { ...props }
                                       id={ "password-" + props.elId }
                                       currentRef={ inputRef.current }/> :
      <FormInput id={ "input-" + props.elId } ref={ inputRef }
                 data-testid={ "form-input" }
                 currentRef={ inputRef.current }
                 placeholder={ props.for }{ ...props }/> }
    <InputLine
      style={ { backgroundColor: "transparent!important" } } { ...props }/>
  </FormItem> );
};

const InputLine = styled( Line )`

`;

const FormItem = styled( Form.Item )`
&&{
& ::placeholder {
color: white;
font-size: 20px;
padding-bottom: 0;
margin-bottom: 0;
}

 & .ant-form-item-control-wrapper .ant-form-item-control {
  line-height: 24px;
 }
}

`;

const FormInput = styled( Input )`
${ props => {
  debugger;
  if( props.currentRef ){
    return css`
input#${ props.id }, :before, :after, :hover, :active, :focus {
background-color: green!important;
}
`;
  }
  
} }`;

InputWithLine.propTypes = {};