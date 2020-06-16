import React from "react";
import styled from "styled-components";
import { ContainerDiv } from "..";
import {
  SvgBrainPic, SvgSynapsFavicon, SvgSynapsLogoText,
} from "../../svgComponents";
import {
  APP_PATHS, APP_VIEW_DESKTOP, THEME,
} from "../../utilities/constants.js";
import { THEMING_VALUES } from "../../customHooks/themingRules.js";
import { useAppHooks } from "../../customHooks/useAppHooks.js";

/**
 *  LogoLeft
 *
 *  @component
 *
 */
const LogoLeft = () => {
  const { appView, changePath, usersState, theme } = useAppHooks();
  
  const logoClicked = () => {
    
    if( usersState.user.uid ){
      changePath( APP_PATHS.DASHBOARD_PATH );
    }else{
      changePath( APP_PATHS.LANDING_PAGE );
    }
  };
  
  if( appView === APP_VIEW_DESKTOP ){
    
    return ( <ContainerDiv
      height={ "100%" } position={ "relative" }
      id={ "logo-left-container" }
      width={ "250px" } flexDirection={ "row" }
      backgroundColor={ "transparent" }
      alignItems={ "flex-end" } margin={ "2% 0 0 10%" }
    >
      
      <SvgSynapsFavicon onClick={ () => logoClicked() } height={ "100%" }
                        width={ "40%" }
                        top={ "-10px" }/>
      <SvgSynapsLogoText onClick={ () => logoClicked() }
                         svgFill={ theme.BACKGROUND === THEMING_VALUES.DARK ?
                           theme.white : theme.SYNAPS_DARK }
                         width={ "60%" }
                         height={ "100%" }
      />
    </ContainerDiv> );
  }else{
    return ( <ContainerDiv
      height={ "100%" } width={ "120px" } margin={ "0 0 0 5%" }
      alignItems={ "flex-start" } justifyContent={ "flex-end" }
      flexDirection={ "row" } overFlowY={ "visible" } overFlowX={ "visible" }
      position={ "relative" }>
      <SvgSynapsLogoText onClick={ () => logoClicked() }
                         svgFill={ THEME.BACGROUDND } zIndex={ 10 }
                         margin={ "15% auto 0 auto" }/>
      
      <Brain containerPosition={ "absolute" } height={ "300px" }
             zIndex={ 5 } svgFill={ THEME.BRAIN_PIC_DARK }
             maxWidth={ "600px" }
             maxHeight={ "600px" }
             width={ "300px" } top={ "-25%" } svgWidth={ "100%" }
             svgHeight={ "100%" }
             left={ "-40%" }/>
    </ContainerDiv> );
  }
  
};

const Brain = styled( SvgBrainPic )`
transform: rotateY("180deg");
`;

LogoLeft.propTypes = {};

export default LogoLeft;