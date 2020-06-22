import React, { useState } from "react";
import { InputWithLine, InsideRouteContainer } from "../components";
import styled, { css } from "styled-components";
import { EMAIL_PROVIDER, GOOGLE_PROVIDER, signIn } from "../actions";
import { THEMING_VARIABLES } from "../customHooks/themingRules.js";
import { APP_PATHS, MEDIA_QUERIES } from "../utilities/constants.js";
import { useAppHooks } from "../customHooks/useAppHooks.js";
import { ReactComponent as SignUpModel } from "../svgs/SignUpModel.svg";
import { ReactComponent as SignInModel } from "../svgs/SignInModel.svg";
import SvgButton from "../components/Button/SvgButton";
import { between } from "polished";
import { APP_VIEW_MOBILE, THEME } from "../utilities/constants";
import { onThemeValue } from "../utilities/themeHelper";

/**
 * Sign In
 * @category Views
 * @component
 * @example return (<SignIn />);
 */

export function SignIn(){
  const { dispatch, path } = useAppHooks();
  const [ info, setInfo ] = useState( { email: "", password: "", error: {} } );
  
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
  
  let googleProps = { google: true, page: path };
  let emailProps = { email: true, page: path };
  if( path === APP_PATHS.SIGN_IN_PATH ){
    googleProps[ "primary" ] = true;
    emailProps[ "gradient" ] = true;
  }else{
    googleProps[ "secondary" ] = true;
    emailProps[ "primary" ] = true;
  }
  
  return ( <StyledSignIn data-testid={ "sign-in-container" }>
    { path === APP_PATHS.SIGN_IN_PATH ? <SignInModelSvg/> : <SignUpModelSvg/> }
    <PaddingContainer data-testid={ "padding-container" }>
      <LeftSideModel data-testid={ "left-side-model" }>
        
        <SignInGoogleButton text={ "Sign In" }{ ...googleProps }
                            onClick={ () => handleSignInClick( "google" ) }/>
      
      </LeftSideModel>
      
      <RightSideModel data-testid={ "right-side-model" }>
        <SignInEmailButton onClick={ () => handleSignInClick( "email" ) }
                           { ...emailProps } />
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

const inputStyles = onThemeValue( "appView" )`
mobile: ${ () => css`
width: 100%;
max-width: 300px;
` }
desktop: ${ () => css`
width: ${ between( `${ .63 * 300 }px`, "250px", "767px", "1200px" ) };
` }
`;

const Input = styled( InputWithLine )`
${ inputStyles };
`;

const rightSideModel = onThemeValue( "appView" )`
mobile: ${ () => {
  return css`
align-items: center;
`;
} };
desktop: ${ () => css`
align-items: flex-end;
` }
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
${ rightSideModel };
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

const SignUpModelSvg = styled( SignUpModel )`
position: absolute;
height: 530px;
top:50%;
left:50%;
transform: translate(-50%, -50%);
z-index: -1;
${ props => {
  if( props.theme.appView === APP_VIEW_MOBILE ){
    return css`
display: none;
`;
  }else{
    if( props.theme.width < 1200 ){
      return css`
width: ${ between( "700px", "1100px", "767px", "1200px" ) };
`;
    }
  }
} }
`;

const SignInModelSvg = styled( SignInModel )`
position: absolute;
height: 530px;
top:50%;
left:50%;
transform: translate(-50%, -50%);
z-index: -1;
${ props => {
  if( props.theme.appView === APP_VIEW_MOBILE ){
    return css`
display: none;
`;
  }else{
    if( props.theme.width < 1200 ){
      return css`
width: ${ between( "700px", "1100px", "767px", "1200px" ) };
`;
    }
  }
} }
`;

const switchText = onThemeValue( THEMING_VARIABLES.BACKGROUND )`
dark: ${ THEME.FONT_LIGHT };
light: ${ THEME.FONT_DARK };
`;

const svgButton = onThemeValue( "appView" )`
desktop: ${ props => {
  if( props.theme.width < 1200 ){
    return css`
  width: ${ between( `${ .63 * 352 }px`, "352px", "767px", "1200px" ) };
height: ${ between( `${ .63 * 76 }px`, "76px", "767px", "1200px" ) };
`;
  }else{
    return css`
width: 250px;
height: 76px;
`;
  }
} };
mobile: ${ () => css`
width: 250px;
height: 76px;
` }
`;

const appViewEmail = onThemeValue( "appView" )`
mobile: ${ () => css`
order: 4;
align-self: center;
` }
`;

const SignInEmailButton = styled( SvgButton )`
  ${ svgButton }
  ${ appViewEmail };
`;

const SignInGoogleButton = styled( SvgButton )`
  ${ svgButton }
`;

const paddingCont = onThemeValue( "appView" )`
mobile: ${ () => css`
flex-direction: column;
` } }
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
${ paddingCont };


`;

const StyledSignIn = styled( InsideRouteContainer )`
position: relative;
z-index: 200;
color: ${ switchText };
justify-self: center;
align-self: center;
height: 450px;
width: 1105px;
@media ${ MEDIA_QUERIES.desktop } {
  height: 100%;
}
`;


