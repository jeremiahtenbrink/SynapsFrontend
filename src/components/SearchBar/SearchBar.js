import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import PropTypes from "prop-types";

/**
 * Search Bar
 * @component
 * @example
 * const search = () => {};
 * return (
 *  <SearchBar onSearch={search} />
 * )
 */
export const SearchBar = props => {
  return <StyledAntdSearch data-testid={ "search-bar" } { ...props }/>;
};

const StyledAntdSearch = styled( Input.Search )`
height: ${ props => props.height || "100%" };
width: ${ props => props.width || "100%" };
justify-content:${ props => props.justifyContent || "center" };
  && > .ant-input {
    height: ${ props => props.height || "min-content" };
    border-radius: ${ props => props.borderRadius || props.theme.largeRadius };
    border-color: #343D58;
    border-width: 2px;
    font-size: 18px;
    :focus {
      box-shadow: none;
      border-color: ${ props => props.theme.gray };
    }
  }
  && {
    span.ant-input-suffix {
    font-size: 26px;
    
      svg {
        fill: #343D58;
        stroke: #343D58;
        stroke-width: 40px;
      }
    }
  }
`;

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  borderRadius: PropTypes.string,
  height: PropTypes.string,
  placeholder: PropTypes.string,
};

