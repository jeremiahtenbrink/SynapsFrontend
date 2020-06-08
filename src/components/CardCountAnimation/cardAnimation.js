import * as React from "react";
import styled from "styled-components";
import { genPercentAdd } from "antd/lib/upload/utils";

import { LeftCard } from "./leftCard.js";
import { RightCard } from "./rightCard.js";
import { MiddleCard } from "./middleCard.js";

function CardAnimation( { open, count } ){
  return ( <Container>
      <p>{ count }</p>
      <StyledLeft open={ open }/>
      <StyledMiddle/>
      <StyledRight open={ open }/>
    </Container>
  
  );
}

const StyledLeft = styled( LeftCard )`
    transition: all 1s;
    position: absolute;
    left: 30%;
    top: 50%;
    transform-origin: 77% 100%;
    transform: ${ props => props.open ? "translate(-50%, -50%)" :
  "translate(-50%, -50%) rotateZ(32deg)" };
`;
const StyledRight = styled( RightCard )`
    transition: all 1s;
    position: absolute;
    left: 70%;
    top: 50%;
    transform-origin: 22% 100%;
    transform: ${ props => props.open ? "translate(-50%, -50%)" :
  "translate(-50%, -50%) rotateZ(-32deg)" };


`;
const StyledMiddle = styled( MiddleCard )`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;

`;
const Container = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    p {
      color: white;
      font-weight: bold;
      font-family: "Fredoka One", "Source Sans Pro",serif;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    `;

export default CardAnimation;