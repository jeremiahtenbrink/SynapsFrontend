import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { getComponentDisplayName } from "../../utilities/getComponentDisplayName";

/**
 *   WithIcon
 *
 *  @component
 *
 */
const withIcon = ( Component, Icon,
  ...withIconProps ) => ( { children, ...props } ) => {
  const IconInfused = React.memo( Component );
  IconInfused.displayName = `WithIcon(${ getComponentDisplayName( Component ) }`;
  
  return ( <IconInfused { ...props } { ...withIconProps }>
    <StyledIcon { ...withIconProps }>
      { Icon && <Icon/> }
      { children }
    </StyledIcon>
  </IconInfused> );
  
};

const StyledIcon = styled.div`
${ props => {
  if( props.iconLeft && props.iconTop ){
    return css`
position: absolute;
left: ${ props.iconLeft };
top: ${ props.iconTop };
transform: translate(-50%, -50%);
`;
  }
} };
`;

withIcon.propTypes = {
  Component: PropTypes.func.isRequired,
  Icon: PropTypes.func,
  iconProps: PropTypes.objectOf( {
    iconLeft: PropTypes.number, iconTop: PropTypes.number,
  } )
};

export default withIcon;