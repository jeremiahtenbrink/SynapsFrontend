import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import PropTypes from "prop-types";
import { BaseContainer } from "../Container/BaseContainer.js";

const { Search } = Input;
/**
 * Search Bar
 * @component
 * @example
 * const search = () => {};
 * return (
 *  <SearchBar onSearch={search} />
 * )
 */
export const SearchBar = ( { borderRadius, ...props } ) => {
  return <StyledAntdSearch name={'search'} data-testid={ "search-container" }
                           borderRadius={ borderRadius }>
    <Search onSearch={ props.onSearch } placeholder={ props.placeholder }/>
  </StyledAntdSearch>;
};

const StyledAntdSearch = styled( BaseContainer )`
  && {
  > .ant-input-search input.ant-input {
    height: min-content;
    width:  100%;
    border-radius: 15px;
    border-color: #343D58;
    border-width: 2px;
    font-size: 18px;
    :focus {
      box-shadow: none;
      border-color: ${ props => props.theme.gray };
    }
  }
  
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
  onSearch: PropTypes.func.isRequired, placeholder: PropTypes.string,
};

