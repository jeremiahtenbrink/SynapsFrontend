import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CreateCardTitleText } from "../components/Text/TitleText/CreateCardTitleText.js";
import { CreateCard } from "../components/CreateCard/CreateCard.js";
import { DeckName } from "../components/CreateDeck/DeckName.js";
import { SmallDeckSvg } from "../components/SmallDeckSvg/SmallDeckSvg.js";
import { SynapsButton } from "../components/Button/SynapsButton.js";
import { postDeck, updateDeck } from "../actions/decksActions.js";
import { createCard } from "../actions/cardActions.js";
import { useAppHooks } from "../customHooks/useAppHooks.js";
import { APP_VIEW_DESKTOP, APP_VIEW_MOBILE } from "../utilities/constants.js";
import { CardIcon } from "../components";
import CardAnimation from "../components/CardCountAnimation/cardAnimation.js";

/**
 * Create Deck View
 * @category Views
 * @component
 * @example return (<CreateDeck />);
 */
export const CreateDeck = props => {
  const {
    usersState, appView, dispatch, decksState, changePath, height, photosState,
  } = useAppHooks();
  
  const passedInDeckName = props.computedMatch.params.deck_name;
  const card_id = props.computedMatch.params.card_id;
  const [ newDeck, setNewDeck ] = useState( {} );
  const [ newCard, setNewCard ] = useState( {
    question: "", answer: "", deck_id: "",
  } );
  const [ cardNum, setCardNum ] = useState( 1 );
  const [ visible, setVisible ] = useState( {
    question: false, answer: false,
  } );
  const [ highlighted, setHighlighted ] = useState( {
    title: true, question: false, answer: false,
  } );
  const [ formError, setFormError ] = useState( false );
  const [ numberOfDecks, setNumberOfDecks ] = useState( decksState.decks.length );
  const [ deckCreated, setDeckCreated ] = useState( false );
  const [ allFieldsValidated, setAllFieldsValidated ] = useState( false );
  
  let uid = usersState.user.uid;
  
  useEffect( () => {
    if( photosState ){
      Object.values( photosState.photos ).forEach( photoObject => {
        
        if( photoObject.id === "question" && photoObject.file ){
          setNewCard( newCard => ( {
            ...newCard, image_front: photoObject.file.url,
          } ) );
        }else if( photoObject.id === "answer" && photoObject.file ){
          setNewCard( newCard => ( {
            ...newCard, image_back: photoObject.file.url,
          } ) );
        }
      } );
    }
  }, [ photosState ] );
  
  const fieldValidated = stateHook => {
    if( stateHook !== "" && typeof stateHook !== "undefined" ){
      return true;
    }else{
      return false;
    }
  };
  
  useEffect( () => {
    
    if( decksState.decks.length > numberOfDecks || passedInDeckName ){
      
      setDeckCreated( true );
      setNumberOfDecks( decksState.decks.length );
      
      if( passedInDeckName ){
        const deck = decksState.decks.filter( deck => deck.deck_name.toLowerCase() ===
          passedInDeckName )[ 0 ];
        setNewCard( { ...newCard, deck_id: deck.deck_id } );
        setNewDeck( { ...deck } );
        setHighlighted( { title: false, question: true, answer: false } );
        
        setVisible( { question: true, answer: false } );
      }else{
        const deck_id = decksState.decks[ decksState.decks.length - 1 ].deck_id;
        setNewCard( {
          ...newCard, deck_id,
        } );
        setNewDeck( { ...newDeck, deck_id } );
      }
      
    }
  }, [ decksState ] );
  
  useEffect( () => {
    if( appView === APP_VIEW_DESKTOP ){
      setHighlighted( { title: false, question: false, answer: false } );
      setVisible( { question: true, answer: true } );
    }
  }, [ appView ] );
  
  useEffect( () => {
    if( fieldValidated( newCard.question ) &&
      fieldValidated( newCard.answer ) && fieldValidated( newDeck.deck_name ) ){
      setAllFieldsValidated( true );
    }
  }, [ newCard ] );
  
  const clickHandler = e => {
    e.preventDefault();
    let clickedOn = e.target.name;
    
    if( clickedOn === "title" && highlighted.title === true ){
      setHighlighted( {
        ...highlighted, title: false, question: true,
      } );
      setVisible( {
        ...visible, question: true,
      } );
    }else if( clickedOn === "question" && highlighted.question === true &&
      fieldValidated( newDeck.deck_name ) ){
      setHighlighted( {
        ...highlighted, question: false, answer: true,
      } );
      setVisible( {
        ...visible, answer: true,
      } );
    }else if( fieldValidated( newCard.question ) ){
      if( deckCreated ){
        return;
      }
      dispatch( postDeck( uid, newDeck ) );
      setNewCard( {
        ...newCard,
      } );
      setHighlighted( {
        ...highlighted, answer: false,
      } );
    }
  };
  
  const changeHandler = e => {
    const targetName = e.target.name;
    switch( targetName ){
      case "title":
        setNewDeck( { deck_name: e.target.value } );
        break;
      default:
        setNewCard( { ...newCard, [ targetName ]: e.target.value } );
        break;
    }
  };
  
  const deckNameChanged = () => {
    
    let stateDeckName = decksState.decks[ decksState.decks.length -
    1 ].deck_name;
    
    if( newDeck.deck_name !== stateDeckName && cardNum > 1 ){
      return true;
    }else{
      return false;
    }
  };
  
  const updateDeckNameIfChange = () => {
    if( deckNameChanged() ){
      dispatch( updateDeck( uid,
        decksState.decks[ decksState.decks.length - 1 ].deck_id,
        newDeck,
      ) );
    }
  };
  
  const doneSubmit = e => {
    e.preventDefault();
    updateDeckNameIfChange();
    if( allFieldsValidated ){
      dispatch( createCard( newCard, uid ) );
    }
    changePath( "/dashboard" );
  };
  
  const submitForm = e => {
    e.preventDefault();
    if( allFieldsValidated ){
      dispatch( createCard( newCard, uid ) );
      setNewCard( {
        ...newCard, question: "", answer: "", deck_id: newDeck.deck_id,
      } );
      setCardNum( cardNum + 1 );
    }else{
      setFormError( true );
    }
    updateDeckNameIfChange();
  };
  
  return ( <StyledCreateDeck height={ height }>
    <CardNameContainer appView={ appView }>
      { appView === APP_VIEW_MOBILE && ( <CancelButtonContainer>
        <CancelButton onClick={ doneSubmit }>Cancel</CancelButton>
      </CancelButtonContainer> ) }
      <CardHeaderContainer appView={ appView }>
        <CreateCardTitleText
          appView={ appView }
          text={ passedInDeckName ? "Create Cards" :
            appView === APP_VIEW_MOBILE ? "Create Deck" :
              "Create New Deck of Flashcards" }
        />
        <SmallDeckSvg/>
        <CardAnimation
          open={ cardNum > 1 || highlighted.question || highlighted.answer }
          count={ cardNum }/>
      </CardHeaderContainer>
      <DeckName
        appView={ appView }
        setNewDeck={ setNewDeck }
        newDeck={ newDeck }
        name={ "newDeck" }
        changeHandler={ changeHandler }
        value={ newDeck.deck_name }
        clickHandler={ clickHandler }
        highlighted={ highlighted.title }
        setHighlighted={ setHighlighted }
      />
    </CardNameContainer>
    <CreateCardContainer appView={ appView }>
      <CreateCard
        id={ 1 }
        changeHandler={ changeHandler }
        name={ "newCardQuestion" }
        drillName={ "question" }
        clickHandler={ clickHandler }
        highlighted={ highlighted.question }
        visible={ visible.question }
        text={ appView === APP_VIEW_MOBILE ? `Card ${ cardNum } - Question` :
          "Question" }
        value={ newCard.question }
        newCard={ newCard }
        setNewCard={ setNewCard }
        appView={ appView }
      />
      <CreateCard
        id={ 2 }
        changeHandler={ changeHandler }
        name={ "newCardAnswer" }
        drillName={ "answer" }
        clickHandler={ clickHandler }
        highlighted={ highlighted.answer }
        visible={ visible.answer }
        text={ appView === APP_VIEW_MOBILE ? `Card ${ cardNum } - Answer` :
          "Answer" }
        value={ newCard.answer }
        newCard={ newCard }
        setNewCard={ setNewCard }
        appView={ appView }
      />
    </CreateCardContainer>
    <Bottom appView={ appView }>
      <ButtonContainer>
        <SynapsButton
          appView={ appView }
          onClick={ submitForm }
          text={ "Add Another Card" }
          type={ "primaryCreateCard" }
          allFieldsValidated={ allFieldsValidated }
        />
      </ButtonContainer>
      <ButtonContainer appView={ appView }>
        <SynapsButton
          appView={ appView }
          text={ appView === APP_VIEW_MOBILE ? "Done" : "Done Adding Cards" }
          type={ "defaultCreateCard" }
          onClick={ doneSubmit }
        />
      </ButtonContainer>
    </Bottom>
  </StyledCreateDeck> );
};

CreateDeck.propTypes = {};

const ButtonContainer = styled.div``;

const StyledCreateDeck = styled.div`
  width: ${ props => ( props.appView === APP_VIEW_MOBILE ? "375px" : "100%" ) };
  max-width: ${ props => props.appView === APP_VIEW_MOBILE ? "100%" : "1140px" };
  height: ${ props => ( props.height - 75 ).toString() + "px" };
  display: flex;
  padding: ${ ( { theme } ) => theme.appView === APP_VIEW_MOBILE ? "0 36px" :
  "63px 67px 15px 67px" };
  ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "padding: 63px 67px 0 67px;" : "" };
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "margin-top: 50px;" :
  "" };
`;

const CreateCardContainer = styled.div`
  width: 100%;
  height: ${ props => ( props.appView === APP_VIEW_MOBILE ? "60%" : "40%" ) };
  height: ${ props => props.theme.appView === APP_VIEW_MOBILE ? "425px" :
  "40%" };
  display: flex;
  flex-direction: ${ props => props.theme.appView === APP_VIEW_MOBILE ?
  "column" : "row" };
  ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "justify-content: space-between;" : "" };
`;

const CardHeaderContainer = styled.div`
  width: 100%;
  ${ props => ( props.theme.appView === APP_VIEW_DESKTOP ? "height: 50%;" :
  "" ) };
  padding: 0 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${ props => props.appView === APP_VIEW_MOBILE ? "30px" :
  "30px" };
  margin-top: ${ props => ( props.appView === APP_VIEW_MOBILE ? "30px" :
  "0px" ) };
`;

const CardNameContainer = styled.div`
  height: 30%;
  ${ props => ( props.theme.appView === APP_VIEW_DESKTOP ? "height: 25%;" :
  "" ) };
  width: 100%;
  margin-bottom: ${ props => props.appView === APP_VIEW_MOBILE ? "30px" :
  "0px" };
  margin-bottom: 15px;
  ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "margin-bottom: 35px;" : "" }
`;

const Bottom = styled.div`
  width: 100%;
  height: ${ props => ( props.appView === APP_VIEW_MOBILE ? "10%" : "20%" ) };
  height: ${ props => props.theme.appView === APP_VIEW_MOBILE ? "70px" : "25%" };
  display: flex;
  ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "flex-direction: column;" : "" };
  ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "align-items: center;" : "" };
  justify-content: ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "center;" : "space-around" };
  ${ props => props.theme.appView === APP_VIEW_MOBILE ?
  "padding-bottom: 20px;" : "" };
  padding: ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "20px 0 0 0" :
  "0 0 40px 0" };
`;

const BottomButton = styled.div`
  ${ props => props.theme.appView === APP_VIEW_DESKTOP ? "margin-top: 10px;" :
  "" }
`;

const CancelButtonContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 8px;
`;

const CancelButton = styled.p`
  font-size: 11px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #000000;
  opacity: 0.5;
`;
