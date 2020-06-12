import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Form, Input } from "antd";
import { ReactComponent as Line } from "../../svgs/inputLine.svg";

/**
 *   InputWithLine
 *
 *  @component
 *
 */
export const InputWithLine = ( props ) => {
  const inputRef = useRef();
  
  const [ userName, setUserName ] = useState( "username" );
  const [ password, setPassword ] = useState( "password" );
  
  return ( <FormItem data-testid={ "form-item" } { ...props }>
    { props.password ? <Input.Password ref={ inputRef } { ...props }
                                       style={ { background: "transparent!important" } }
                                       onChange={ e => setPassword( e.target.value ) }
                                       id={ "password-" + props.elId }
                                       value={ password }
                                       currentRef={ inputRef.current }/> :
      <FormInput id={ "input-" + props.elId } ref={ inputRef }
                 data-testid={ "form-input" }
                 onChange={ e => setUserName( e.target.value ) }
                 currentRef={ inputRef.current } value={ userName }
                 placeholder={ props.for }{ ...props }/> }
    <InputLine></InputLine>
  
  </FormItem> );
};

const SVGInput = styled.svg`
      position:absolute;
      left:0;
      top:0;
      transform: translate(-50%,0);
      `;

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
      
      & .ant-form-item-controlWrapper .ant-form-item-control {
      line-height: 24px;
      }
      }
      
      `;

const FormInput = styled( Input )`
      ${ props => {
  
  if( props.currentRef ){
    return css`
      input#${ props.id }, :before, :after, :hover, :active, :focus {
      background: rgba(255,255,255,0);
      backface-visibility: hidden;
      
      }
      `;
  }
  
} }`;

InputWithLine.propTypes = {};