import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InsideRouteContainer, TitleText } from "../components";
import BigFlashCard from "../components/BigFlashCard/BigFlashCard.js";
import { ReactComponent as SvgBack } from "../svgs/BackButton.svg";
import { ReactComponent as SvgNext } from "../svgs/NextButton.svg";
import { ReactComponent as Nope } from "../svgs/Nope.svg";
import { ReactComponent as KindOf } from "../svgs/KindOf.svg";
import { ReactComponent as Absolutely } from "../svgs/Absolutley.svg";
import { updateCard } from "../actions/cardActions.js";
import moment from "moment";
import { APP_VIEW_DESKTOP } from "../utilities/constants.js";
import { useAppHooks } from "../customHooks/useAppHooks.js";

export default function QuizMode( { getHooks, computedMatch } ){
  const { cardsState, dispatch, usersState, appView, decksState } = useAppHooks();
  const [ quizCards, setQuizCards ] = useState( {} );
  const [ filteredQuizCards, setFilteredQuizCards ] = useState( {} );
  const [ displayedCard, setDisplayedCard ] = useState( {} );
  const [ cardIndex, setCardIndex ] = useState( 0 );
  const [ quizComplete, setQuizComplete ] = useState( false );
  const [ completeAlert, setCompleteAlert ] = useState( false );
  const deck = decksState.decks.filter( deck => deck.deck_name.toLowerCase() ===
    computedMatch.params.deck_name );
  
  useEffect( () => {
    if( quizComplete ){
      setTimeout( () => {
        setCompleteAlert( false );
      }, 5000 );
    }
  }, [ quizComplete ] );
  
  useEffect( () => {
    const displayCards = {};
    let arrNums = [];
    for( let i = 0; i < cardsState.cards.length; i++ ){
      arrNums.push( i );
    }
    cardsState.cards.forEach( card => {
      let randomIndex = Math.floor( Math.random() * arrNums.length );
      let displayIndex = arrNums[ randomIndex ];
      let firstHalf = arrNums.slice( 0, randomIndex );
      let secondHalf = arrNums.slice( randomIndex + 1, arrNums.length );
      arrNums = [ ...firstHalf, ...secondHalf ];
      
      displayCards[ displayIndex ] = card;
    } );
    
    //BELOW REPLACES PREVIOUS GETFILTEREDCARDS() FUNCTION
    let filteredCards = { ...displayCards };
    
    Object.keys( filteredCards ).map( key => {
      let currentCard = filteredCards[ key ];
      
      let if1 = moment()
        .diff( moment.unix( currentCard.last_viewed ), "minutes" );
      let if2 = moment()
        .diff( moment.unix( currentCard.last_viewed ), "hours" );
      
      if( !currentCard.quiz_results ){
      
      }else if( currentCard.quiz_results === 2 ){
        if( moment().diff( moment.unix( currentCard.last_viewed ), "minutes" ) >
          10 ){
          
        }else{
          delete filteredCards[ key ];
        }
      }else if( currentCard.quiz_results === 3 ){
        if( moment().diff( moment.unix( currentCard.last_viewed ), "hours" ) >
          4 ){
          
        }else{
          delete filteredCards[ key ];
        }
      }
    } );
    
    setFilteredQuizCards( filteredCards );
    
    let keys = Object.keys( filteredCards );
    let arrKeysCurrentIndex = keys.indexOf( cardIndex.toString() );
    let arrKeysNextIndex = arrKeysCurrentIndex + 1;
    let arrKeysPrevIndex = arrKeysCurrentIndex - 1;
    let currentCardKey = keys[ arrKeysCurrentIndex ];
    let nextCardKey = keys[ arrKeysNextIndex ];
    let prevCardKey = keys[ arrKeysPrevIndex ];
    
    if( Object.keys( displayedCard ).length === 0 &&
      Object.keys( filteredCards ).length > 0 ){
      setCardIndex( keys[ 0 ] );
      setDisplayedCard( filteredCards[ keys[ 0 ] ] );
    }else if( Object.keys( displayedCard ).length > 0 &&
      Object.keys( filteredCards ).length > 0 ){
      if( currentCardKey === undefined ){
        if( nextCardKey === undefined ){
          setCardIndex( prevCardKey );
          setDisplayedCard( filteredCards[ prevCardKey ] );
        }else{
          setCardIndex( nextCardKey );
          setDisplayedCard( filteredCards[ nextCardKey ] );
        }
      }
    }else if( currentCardKey === undefined &&
      Object.keys( filteredCards ).length === 0 ){
      let QuizCardsKeys = Object.keys( displayCards );
      setFilteredQuizCards( displayCards );
      setDisplayedCard( displayCards[ QuizCardsKeys[ 0 ] ] );
      setQuizComplete( true );
    }else if( currentCardKey !== undefined ){
      setCardIndex( currentCardKey );
      setDisplayedCard( filteredCards[ currentCardKey ] );
    }
  }, [ cardsState.cards ] );
  
  function back(){
    let keys = Object.keys( filteredQuizCards );
    let arrKeysCurrentIndex = keys.indexOf( cardIndex.toString() );
    let arrKeysPrevIndex = arrKeysCurrentIndex - 1;
    let prevCardKey = keys[ arrKeysPrevIndex ];
    
    if( prevCardKey !== undefined ){
      setCardIndex( prevCardKey );
      setDisplayedCard( filteredQuizCards[ prevCardKey ] );
    }
    
  }
  
  function next(){
    let keys = Object.keys( filteredQuizCards );
    let arrKeysCurrentIndex = keys.indexOf( cardIndex.toString() );
    let arrKeysNextIndex = arrKeysCurrentIndex + 1;
    let nextCardKey = keys[ arrKeysNextIndex ];
    
    if( nextCardKey !== undefined ){
      setCardIndex( nextCardKey );
      setDisplayedCard( filteredQuizCards[ nextCardKey ] );
    }
    
  }
  
  function updateQuizResults( name ){
    let quiz_results;
    switch( name ){
      case "Nope":
        quiz_results = 1;
        break;
      case "Sort of":
        quiz_results = 2;
        break;
      case "100%":
        quiz_results = 3;
    }
    
    let currentCard = filteredQuizCards[ cardIndex ];
    currentCard.quiz_results = quiz_results;
    currentCard.last_viewed = moment()
      .unix()
      .toString();
    
    dispatch( updateCard( currentCard, usersState.user.uid ) );
  }
  
  return ( <Container data-testid={ "quiz-mode-container" }>
    { quizComplete && <TitleText text={ `All cards have been memorized!` }
                                 color={ "#0C2545" }/> }
    <TitleText text={ deck.deck_name } color={ "#2A685B" }/>
    { Object.keys( filteredQuizCards ).length > 0 &&
    Object.keys( filteredQuizCards )[ 0 ] && ( <>
      { completeAlert && <SynapsH1>Quiz Complete!</SynapsH1> }
      <FlashCardContainer data-testid={ "flash-card-container" }>
        <BigFlashCard appView={ appView }
                      flashCard={ displayedCard }> </BigFlashCard>
      </FlashCardContainer>
    </> ) }
    
    <ButtonContainer data-testid={ "button-card-container" }>
      <Button>
        <SvgBack onClick={ () => back() }/>
      </Button>
      { !quizComplete && ( <CardAnswerButton>
        <NopeButton onClick={ () => updateQuizResults( "Nope" ) }/>
        <KindOfButton onClick={ () => updateQuizResults( "Sort of" ) }/>
        
        <AbsolutelyButton
          onClick={ () => updateQuizResults( "100%" ) }/>
      </CardAnswerButton> ) }
      <Button>
        <SvgNext onClick={ () => next() }/>
      </Button>
    </ButtonContainer>
  </Container> );
}

const NopeButton = styled( Nope )`
margin-right: 5px;

`;
const AbsolutelyButton = styled( Absolutely )`


`;
const KindOfButton = styled( KindOf )`
margin: 5px 5px;
order: 3;
`;

const CardAnswerButton = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "20px 0" :
  "50px 0" };
width: 90%;
`;

const Button = styled.div`
margin: 0 20px;
`;

const FlashCardContainer = styled.div`
margin-top: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "-4rem" :
  "0" };
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  justify-content: space-between;
  align-items: center;
  padding-top: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "7rem" :
  "30px" };
`;

const Container = styled( InsideRouteContainer )`
  width: 100%;
  max-width: 1140px;
  border-radius: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "10px" :
  "0" };
  height: 100%;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
`;

const SynapsH1 = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;
