import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

/**
 *   FlashCards
 *
 *  @component
 *
 */
const TopCard = ( { appView, width, height, front_url, back_url, question, answer } ) => {
  
  const [ position, setPosition ] = useState( "question" );
  
  const flipCard = () => {
    if( position === "question" ){
      setPosition( "answer" );
    }else{
      setPosition( "question" );
    }
  };
  
  return ( <Container className={ "top-card-container" }>
    <TopCardDiv onClick={ flipCard } className={ "top-card-div" }
                position={ position }>
      <TopCardQuestion id={ "top-card-question" } position={ position }>
        <svg width="287" height="422" viewBox="0 0 287 422" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <g id="top-question">
            <rect id="Card1" x="0.936523" y="0.115234" width="285.802"
                  height="421.558" rx="11" fill="#FFFBF4"/>
            <text className={ "flash-card-text" } fill="black"
                  fontFamily="Source Sans Pro"
                  fontSize="21" fontWeight="bold" letterSpacing="0em">
              <tspan x="124.416" y="343.404">{ question }</tspan>
            </text>
          </g>
        </svg>
        { front_url &&
        <img src={ front_url } alt={ "flash card question image" }/> }
      </TopCardQuestion>
      <TopCardAnswer id={ "top-card-answer" } position={ position }>
        <svg width="287" height="422" viewBox="0 0 287 422" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <g id="top-answer">
            <rect id="Card1" x="0.936523" y="0.115234" width="285.802"
                  height="421.558" rx="11" fill="#FFFBF4"/>
            <text className={ "flash-card-text" } fill="black"
                  fontFamily="Source Sans Pro"
                  fontSize="21" fontWeight="bold" letterSpacing="0em">
              <tspan x="124.416" y="343.404">{ answer }</tspan>
            </text>
          </g>
        </svg>
        { back_url &&
        <img src={ back_url } alt={ "flash card answer image" }/> }
      </TopCardAnswer>
    </TopCardDiv>
  </Container> );
};

const TopCardDiv = styled.div`
transition: all 1s ease;
transform: ${ props => props.position === "question" ? "rotateY(0deg)" :
  "rotateY(180deg)" };

`;

const Show = keyframes`
0%{
opacity: 0;
}
100%{
opacity: 1;
}
`;

const Hide = keyframes`
0%{
opacity: 1;
}
50%{
opacity: 0;
}
100%{
opacity: 0;
}
`;

const TopCardQuestion = styled.div`
position: absolute;
transition: z-index 1s;
z-index: ${ props => props.position === "question" ? 300 : 200 };
text {
animation: ${ props => props.position === "question" ? Show : Hide } 1s ease forwards;
}
img {
border-radius: 20px;
position: absolute;
top: 10px;
left: 2.5%;
animation: ${ props => props.position === "question" ? Show : Hide } 1s ease forwards;
}

`;

const TopCardAnswer = styled.div`
position: absolute;
transform: rotateY(180deg);
transition: z-index 1s;
z-index: ${ props => props.position === "question" ? 200 : 300 };
text {
animation: ${ props => props.position === "question" ? Hide : Show } 1s ease forwards;
}

img {
position: absolute;
border-radius: 20px;
top: 10px;
left: 2.5%;
animation: ${ props => props.position === "question" ? Hide : Show } 1s ease forwards;
}
`;

const Container = styled.div`
perspective: 400px;
transform-style: preserve-3d;
position:absolute;
width: 100%;
z-index: 200;
svg {
overflow: visible;
}

.flash-card-text{
  transform-box: fill-box;
  transform: translate(-50%, -50%);
}


`;

TopCard.propTypes = {};

export default TopCard;