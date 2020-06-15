import React, { useState } from "react";
import { InputWithLine } from "../components";
import styled, { css } from "styled-components";
import { EMAIL_PROVIDER, GOOGLE_PROVIDER, signIn } from "../actions";
import theming from "styled-theming";
import { useTheming } from "../customHooks/useTheming.js";
import {
  THEMING_VALUES, THEMING_VARIABLES,
} from "../customHooks/themingRules.js";
import { APP_PATHS, MEDIA_QUERIES } from "../utilities/constants.js";
import { useAppHooks } from "../customHooks/useAppHooks.js";
import { ReactComponent as SignUpModel } from "../svgs/SignUpModel.svg";
import { ReactComponent as SignInModel } from "../svgs/SignInModel.svg";
import SvgButton from "../components/Button/SvgButton";
import { between } from "polished";

/**
 * Sign In
 * @category Views
 * @component
 * @example return (<SignIn />);
 */

export function SignIn( props ){
  const { dispatch, theme, path, appView, height } = useAppHooks();
  const [ info, setInfo ] = useState( { email: "", password: "", error: {} } );
  const getValue = useTheming();
  
  const handleChange = e => {
    setInfo( { ...info, [ e.target.name ]: e.target.value } );
  };
  
  const handleSignInClick = type => {
    if( type === EMAIL_PROVIDER ){
      if( info.email !== "" && info.password !== "" ){
        dispatch( signIn( EMAIL_PROVIDER, info.email, info.password ) );
      }else{
        if( info.email === "" ){
          setInfo( {
            ...info, error: { email: "You must enter a email address." },
          } );
        }else{
          setInfo( {
            ...info, error: {
              password: "You must first enter a password.",
            },
          } );
        }
      }
    }else{
      dispatch( signIn( GOOGLE_PROVIDER ) );
    }
  };
  
  const switchWelcomeTitle = () => {
    if( path === APP_PATHS.SIGN_IN_PATH ){
      return <StyledH2>Hey! Welcome Back.</StyledH2>;
    }else{
      return ( <StyledH2
        style={ {
          display: "none",
        } }
      ></StyledH2> );
    }
  };
  
  return ( <StyledSignIn data-testid={ "sign-in-container" }>
    { path === APP_PATHS.SIGN_IN_PATH ? <SignInModelSvg/> : <SignUpModel/> }
    <PaddingContainer>
      <LeftSideModel>
        <SignInGoogleButton text={ "Sign In" } primary page={ path }
                            dimensions={ { width: 353, height: 72 } } google
                            onClick={ () => handleSignInClick( "google" ) }/>
  
      </LeftSideModel>
  
      <RightSideModel>
        <SignInEmailButton onClick={ () => handleSignInClick( "email" ) }
                           dimensions={ { width: 353, height: 72 } }
                           email gradient page={ path }/>
        <Form>
          <Input maxWidth={ "326px" } elId={ "username-signIn" }
                 for={ "username" }/>
          <Input maxWidth={ "326px" } password elId={ "password-signIn" }/>
        </Form>
      </RightSideModel>

    </PaddingContainer>

  </StyledSignIn> );
}

const Form = styled.div`
margin-top: 2rem;

`;

const backgroundColor = theming( THEMING_VARIABLES.BACKGROUND, {
  [ THEMING_VALUES.DARK ]: () => {
    return css`
fill: {linearGradient('#00EFA9','#3F56F0'), 90};
 `;
  }, [ THEMING_VALUES.LIGHT ]: () => {
    return css`
fill: #36405C;
`;
  }
} );

const Input = styled( InputWithLine )`
max-width: 326px;
`;

const RightSideModel = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
width: 45%;
height: 100%;
max-height: 251px;
`;

const LeftSideModel = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
width: 55%;
height: 100%;
max-height: 251px;
align-items: center;
`;

const SignInModelSvg = styled( SignInModel )`
position: absolute;
height: 450px;
top:50%;
left:50%;
transform: translate(-50%, -50%);
z-index: -1;
${ props => {
  if( props.width < 12 ){
    return css`
width: ${ between( "700px", "1100px", "767px", "1200px" ) };
`;
  }
} }
`;

const switchText = theming( THEMING_VARIABLES.BACKGROUND, {
  [ THEMING_VALUES.DARK ]: "white", [ THEMING_VALUES.LIGHT ]: ( { theme } ) => {
    return theme.primaryColor36405C;
  },
} );

const SignInEmailButton = styled( SvgButton )`
display: flex;

`;

const SignInGoogleButton = styled( SvgButton )`
display: flex;
`;

const PaddingContainer = styled.div`
position: absolute;
display: flex;
flex-direction: row;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
height: 73%;
width: 97%;
align-items: center;
`;

const StyledSignIn = styled.div`
position: relative;
z-index: 200;
color: ${ switchText };
display: flex;
flex-direction: column;
height: 450px;
width: 1105px;
@media ${ MEDIA_QUERIES.desktop } {
  height: 100%;
}
`;

const StyledH2 = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 24px;
  margin: 1rem 0 1em;
  color: #b7bfbc;
  @media screen and ${ MEDIA_QUERIES.tablet } {
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 24px;
  }
`;

