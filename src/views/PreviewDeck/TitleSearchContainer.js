import React from "react";
import styled from "styled-components";
import { APP_PATHS, APP_VIEW_DESKTOP } from "../../utilities/constants";
import { SearchBar, TitleText } from "../../components";
import { Icon } from "antd";
import { useAppHooks } from "../../customHooks/useAppHooks";
import StudyButton from "./StudyButton";

/**
 *   TitleSearchContainer
 *
 *  @component
 *
 */
const TitleSearchContainer = ( { selectMode, unSelected, search, deck } ) => {
  const { changePath, appView, cardsState } = useAppHooks();
  const cardCount = cardsState.cards.filter( card => card.deck_id ===
    deck.deck_id ).length;
  
  return ( <Container data-testid={ "title-search-container" }>
    <TopContainer className={ "top-container" }>
      <BackArrow className={ "back-arrow" }>
        <StyledIconLeft type="left"/>
        <p
          onClick={ () => changePath( APP_PATHS.DASHBOARD_PATH ) }>Back</p>
      </BackArrow>
      
      <SearchContainer className={ "search-container" }>
        <SearchBar
          height={ appView === APP_VIEW_DESKTOP ? "37px" : "24px" }
          borderRadius={ "14px" }
          onChange={ search }
          onSearch={ search }
          placeholder={ "Search all cards" }
        />
      </SearchContainer>
      <Selected className={ "select-text" } selected={ selectMode }
                onClick={ unSelected }>
        { selectMode === false ? "Select" : "Cancel" }
      </Selected>
    </TopContainer>
    <LeftContainer>
      <TitleText
        text={ ( deck && deck.deck_name ) || "Preview" }
        count={ cardCount }
        appView={ appView }
        deckCreatedDate={ deck.created_at }
        color={ appView === APP_VIEW_DESKTOP ? "#0D2545" : "#2A685B" }
      />
      
      <StudyButton
        deck={ deck }
        render={ appView === APP_VIEW_DESKTOP }
        height={ "54px" }
        width={ "264px" }
      />
    </LeftContainer>
  
  
  </Container> );
};

const Selected = styled.p`
  color: ${ props => ( props.selected === true ? "#14E59E" : "#000000" ) };
  margin-right: 9%;
`;

const StyledIconLeft = styled( Icon )`
  margin-right: 9%;
`;

const SearchContainer = styled.div`
  margin:${ props => props.theme.appView === APP_VIEW_DESKTOP ? "0 21% 2px 0" :
  "0 auto" };
  width: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "58%" : "50%" };
  max-width: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "70%" :
  "100%" };
`;

const LeftContainer = styled.div`
display: flex;
margin: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "0 0 0 6.5%" :
  "0" };
flex-direction: column;
width: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "50%" : "100%" };
order: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "1" : "2" };
`;

const BackArrow = styled.div`

`;

const TopContainer = styled.div`
display: flex;
flex-direction: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "row" :
  "row" };
font-size: 12px;
width: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "50%" : "100%" };
justify-content: ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "flex-end" : "center" };
align-items: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "flex-end" :
  "center" };
margin-top: 15px;
order: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "2" : "1" };

.back-arrow{
display: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "none" :
  "flex" };
justify-content: center;
width: 20%;
}

.select-text{
display: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "none" :
  "block" }
}
`;

const Container = styled.div`
display: flex;
margin-top: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "2rem" : "" };
flex-direction: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "row" :
  "column" };

`;

TitleSearchContainer.propTypes = {};

export default TitleSearchContainer;