import React, {useState} from 'react'
import styled from 'styled-components'
import {TitleText} from '../components/Text/TitleText.js'
import {useAppHooks} from './customHooks/useAppHooks.js';
import {BigFlashCard} from '../components/BigFlashCard.js';
import {ReactComponent as SvgBack} from  '../svgs/BackButton.svg';
import {ReactComponent as SvgNext} from '../svgs/NextButton.svg';

export default function QuizMode({deck}) {
    const {cardsState} = useAppHooks("QuizMode")
    const[notViewed, setNotViewed] = useState([]);
    const[Viewed, setViewed] = useState([]);

    useEffect(() => {
        let arrayii = cardsState.cards.filter(card => {
            return card.deck_id === deck.deck_id && Viewed.includes(card) && notViewed.includes(card) ? true : false;
        })  
        setViewed([...arrayii, Viewed])
    })
    useEffect(() => {
        let newArray = cardsState.cards.filter(card => {
            return card.deck_id === deck.deck_id && !notViewed.includes(card) ? true : false;
        })
        setNotViewed([...newArray, ...notViewed])
    })

    function back({}) {
            let lastCard = Viewed.pop();
            setNotViewed([...notViewed, lastCard])
            setViewed([...Viewed, lastCard])
    }
    function next({}) {
            let firstCard = notViewed.shift();
            setNotViewed([...notViewed, firstCard])
            setViewed([...Viewed, firstCard])
    }

    return (
        <Quizmode>
            <TitleText text = {deck.deck_name} color = {"#2A685B"}/>>
            <BigFlashCard flashCard = {notViewed[0]}> </BigFlashCard>
            <SvgBack onClick = {back}/>
            <SvgNext onClick = {next}/>
        </Quizmode>
    )
}

const Quizmode = styled.div `
    width = 100%;
    height = 100%;
    background-color: white;
`
const SvgBack = styled.div `

`