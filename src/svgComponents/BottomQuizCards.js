import React from "react";
import styled from "styled-components";

/**
 *   BottomQuizCards
 *
 *  @component
 *
 */
const BottomQuizCards = ( props ) => {
  return ( <Container className={ "bottom-cards" }>
    <svg width="285" height="431" viewBox="0 0 285 431" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <g id="QuizCards">
        <g id="card3-q" filter="url(#filter0_f)">
          <rect id="Card3" x="12.1406" y="41.2207" width="260.717"
                height="384.558" rx="11" fill="#E9E0D0"/>
        </g>
        <g id="card2-q" filter="url(#filter1_df)">
          <rect id="Card2" x="4.34473" y="4.2207" width="276.311"
                height="407.558" rx="11" fill="#FFF5E2"/>
        </g>
      </g>
      <defs>
        <filter id="filter0_f" x="7.14062" y="36.2207" width="270.717"
                height="394.558" filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix"
                   result="shape"/>
          <feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur"/>
        </filter>
        <filter id="filter1_df" x="0.344727" y="0.220703" width="284.311"
                height="419.558" filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix"
                   result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow"
                   result="shape"/>
          <feGaussianBlur stdDeviation="2" result="effect2_foregroundBlur"/>
        </filter>
      </defs>
    </svg>
  </Container> );
};

const Container = styled.div`
position: absolute;
margin-top: 10px;
z-index: 100;
`;

BottomQuizCards.propTypes = {};

export default BottomQuizCards;