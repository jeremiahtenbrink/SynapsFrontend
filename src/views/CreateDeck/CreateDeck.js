import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { DeckName } from "../../components/CreateDeck/DeckName.js";
import { createCard, postDeck, updateDeck } from "../../actions";
import { useAppHooks } from "../../customHooks/useAppHooks.js";
import {
  APP_VIEW_DESKTOP, APP_VIEW_MOBILE
} from "../../utilities/constants.js";
import { onThemeValue } from "../../utilities/themeHelper";
import CardHeader from "./CardHeader";
import BottomButtons from "./BottomButtons";
import CreateCards from "./CreateCards";

/**
 * Create Deck View
 * @category Views
 * @component
 * @example return (<CreateDeck />);
 */
export const CreateDeck = props => {
  const {
    usersState, appView, dispatch, decksState, changePath, photosState,
  } = useAppHooks();
  
  const passedInDeckName = props.computedMatch.params.deck_name;
  
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
    return stateHook !== "" && typeof stateHook !== "undefined";
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
  
    return newDeck.deck_name !== stateDeckName && cardNum > 1;
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
  
  return ( <StyledCreateDeck data-testid={ "create-deck-container" }>
    <CardNameContainer>
      { appView === APP_VIEW_MOBILE && ( <CancelButtonContainer>
        <CancelButton onClick={ doneSubmit }>Cancel</CancelButton>
      </CancelButtonContainer> ) }
      <CardHeader cardNum={ cardNum } appView={ appView }
                  highlighted={ highlighted } submitForm={ submitForm }
                  doneSubmit={ doneSubmit }
                  passedInDeckName={ passedInDeckName }/>
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
    <CreateCards appView={ appView } highlighted={ highlighted }
                 cardNum={ cardNum } changeHandler={ changeHandler }
                 clickHandler={ clickHandler } newCard={ newCard }
                 setNewCard={ setNewCard } visible={ visible }
    />
    { appView === APP_VIEW_MOBILE &&
    <BottomButtons appView={ appView } doneSubmit={ doneSubmit }
                   submitForm={ submitForm }/> }
  </StyledCreateDeck> );
};

CreateDeck.propTypes = {};

const styles = onThemeValue( "appView" )`
mobile: ${ () => css`
max-width: 100%;
padding: 0 5%;
` };
desktop: ${ () => css`
width: 100%;
max-width: 1140px;
` }
`;

const StyledCreateDeck = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${ styles };
`;

const CardNameContainer = styled.div`
  height: 30%;
  ${ props => ( props.theme.appView === APP_VIEW_DESKTOP ? "height: 25%;" :
  "" ) };
  width: 100%;
  margin-bottom: ${ props => props.theme.appView === APP_VIEW_MOBILE ? "30px" :
  "0px" };
  ${ props => props.theme.appView === APP_VIEW_DESKTOP ?
  "margin-bottom: 35px;" : "" }
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
