import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Form, Input } from "antd";
import { ReactComponent as Line } from "../../svgs/inputLine.svg";

/**
 *   InputWithLine
 *
 *  @component
 *
 */
export const InputWithLine = ( props ) => {
  
  const [ userName, setUserName ] = useState( "username" );
  const [ password, setPassword ] = useState( "password" );
  
  return ( <FormItem data-testid={ "form-item" } { ...props }>
    { props.password ? <FormPassword  { ...props }
                                      style={ { background: "transparent!important" } }
                                      onChange={ e => setPassword( e.target.value ) }
                                      id={ "password-" + props.elId }
                                      value={ password }/> :
      <FormInput id={ "input-" + props.elId }
                 data-testid={ "form-input" }
                 onChange={ e => setUserName( e.target.value ) }
                 value={ userName }
                 placeholder={ props.for }{ ...props }/> }
    <InputLine></InputLine>

  </FormItem> );
};

const InputLine = styled( Line )`

      `;

const FormItem = styled( Form.Item )`
      &&{
      & ::placeholder {
      color: white;
      background: transparent!important;
      font-size: 20px;
      padding-bottom: 0;
      margin-bottom: 0;
      }
      
      & .ant-form-item-controlWrapper .ant-form-item-control {
      line-height: 12px;
      }
      }
      
      `;

const input = keyframes`
0%,100% {
        color: #666;
        background: transparent;
    }
`;

const FormInput = styled( Input )`


`;

const FormPassword = styled( Input.Password )`

`;

InputWithLine.propTypes = {};